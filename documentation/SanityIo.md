Sanity.io - bu headless CMS ya'ni to'liq cms emas balki ma'lum bir qismi hisoblanadi. CMS - o'zi nima? CMS - bu “Content Management System” deb  yoyib yoziladi, ya’ni  kontentni boshqarish tizimi yoki saytni boshqarish tizimi.  Bu saytni tez yaratish , Bitrix (Saytni Boshqarish Tizimi) ishini soddalashtirish uchun hizmat qiladi.
Birinchi: Saytni boshqarish tizimi buyurtmachiga saytni mustaqil expluatatsiya qilishda, ya’ni bizning  mutaxassis  bilan emas, balki o’zingizning kompaniya xizmatchingiz (menedjer, kotib,  marketolog) bilan saytdagi ixtiyoriy  ma’lumotni va uning strukturasini  o’zgartirishingizga imkon beradi.
Uni loyihaga o'rnatish uchun dastlab saytdan kirib ro'yxatdan o'tiadi. https://www.sanity.io/ so'ng joriy papkada ya'ni loyiha ochilgan papkada uni o'rnatamiz quyidagi koddan
# Sanityni sozlash
```npm create sanity@latest -- --template clean --create-project "Sanity Project" --dataset production```
Uni ichidagi so'ralgan narsalarga kerak yoki keraksizligi bo'yicha  tanlanadi. Agar loyihani next da qilayotgan bo'lsangiz va un ichida qilishga sanity papkasini ruxsat bersangiz unda sanityga loyiha orqali kirish mumkin bo'ladi. Yozilgan route manzil orqali. 

    Keyin sanityda ochiladigan kontenga schema ya'ni qolib tayyorlanadi. Uni sanity papkasi ichidagi schemas papkasini ochib uni ichiga yoziladi. U Tip document - document turi deb atalib NoSQl da kolleksiya, realizatsiyon dadabaseda esa jadval deb ataladi. Ular JSON formatda _type ning xususiyati sifatida ko'rinadi. Bu xususiyat so'rov yuborishda ishlatiladi. misol, `*[_type == "pet"]`.
Yangi dokument turni xosil qilish uchun yangi papka ochib schemas uni ichida pet.ts faylini oching.
So'ng uni ichiga quyidagini yozing
```// schemas/pet.js
export default {
  name: 'pet',
  type: 'document',
  title: 'Pet',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    }
  ]
}
```
Yuqoridagi kodni taxlil qiladigan bo'lsak `export default` aniqlangan tipni uni chaqirilgan joylarga majud xolda ishlatilishni imkonini beradi.
`name:'pet'` - studiyaga JSON ning `"type": "pet"` qo'shilayotganini habar beradi. 
`type: 'document'` - studiyaga yangi hayvon 'pet' qo'shilishi mumkinligin habar beradi. 
`title: 'Pet'` -   foydalanuvchi interfeysini nomini aniqlaydi. 
`fields` - obyekti ichida bu shu tipni ichiga yozishga doir parametrlar hisoblanadi. Uni ichida bir obyektni ichda uchta kali so'zlarni ko'rishimiz mumin. U o'sha obyektni qanday tasvirlanishi ya'ni qanday turdagi content olishini belgilaydi. `type:` da ichiga [number, datetime, image, arrayи object] larni olishi mumkin. Bundan tashqari fildeset ham ichiga bir qancha content turlarini olishi mumkin. 

Tayyor bo'lgan schemani sanity faylidga schema.ts ichga schemaTypes massiviga import qilinadi. 
```// schemas/index.js
import pet from './pet'

export const schemaTypes = [pet]
```
Tayyor bo'lgan content kiritish qolipni kerakli routerda ko'rish mumkin.

# Kontentni saqlash va nashr qilish.
Sanity studioga o'tganda kerakli marshrut bo'ylab dastlab unga ro'yxatdan o'tiladi. So'ng kerakli joga o'tib yangi content ma'lumotni yozib uni nashr qilish mumkin. Uni olish uchun esa Vision bo'limiga o'tib *[_type == "pet"] so'rovini yuborsak bo'ldi.

# Kontentni o'zingizni saytingizga ulash.
Sanityni turli hildagi muhitlarga turlicha ulash mumkin quyida biz Nextjs da foydalanayoganimiz uchun uni ulashni ko'rib chiqamiz.
1. Dastlab `next-sanity` paketini o'rnatamiz va mijoz parametrlani sozlaymiz.
`npm i next-sanity` foydalangan holda next-sanity ni o'rnatamiz loyihaga. 
So'ng asosiy page.tsx da quyidagicha kodni joylaymiz. 
```
// pages/index.js
import { createClient } from "next-sanity";

export default function IndexPage({ pets }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>pets</h2>
        {pets.length > 0 && (
          <ul>
            {pets.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!pets.length > 0 && <p>No pets to show</p>}
        {pets.length > 0 && (
          <div>
            <pre>{JSON.stringify(pets, null, 2)}</pre>
          </div>
        )}
        {!pets.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const pets = [
    /* {
      _createdAt: "2022-03-08T09:28:00Z",
      _id: "1f69c53d-418a-452f-849a-e92466bb9c75",
      _rev: "xnBg0xhUDzo561jnWODd5e",
      _type: "pet",
      _updatedAt: "2022-03-08T09:28:00Z",
      name: "Capybara"
    } */
  ];

  return {
    props: {
      pets
    }
  };
}
```
So'ng mijozni qo'shamiz uni creatClient() orali charirib olamiz. 
```
const client = createClient();
```
createClient() - funksiyasi o'z ichiga quydagi konfiguratsiyalar o'z ichiga oladi. 
`projectId` - takrorlanmas id bo'lib loyiha uchun, barcha foydalanuvchilar o'z ichiga olib, ma'lumotlar va boshqa funksiyalrini oladi. Bu sir emas sababi u URL ni qismi hisoblanadi. Bu idni siz studio ichidafi sanity.json faylidan yoki sanity.io/manage sahifasidan topishingiz mumin. 
`dataset` - bu proyekt ichdagi ma'lumotlar to'plami yig'indisi. Sizda bir nechta ma'lumotlar to'plami bo'lishi mumkin (masalan: bosqichma-bosqich va ishlab chiqarish).
`apiVersion` - shunchaki siz hozirgi vaqtni kiritishinigiz kerak yangi ko'rinishdagi ma'lumotlar API sini olish uchun. [YYY-MM-DD]
`useCdn` - Agar uni 'true' qilsangiz mijoz kontentlarni sanity.io tarmoqidan keshga joylanganin oladi. Lekin bunda sanity.io katta miqdordagi trafik oqimini generatsiya qiladi, yangilnish to'xtovsiz ko'rinishi uchun shuning uchun 'false' qo'yiladi.

```
const client = createClient({
  projectId: "lqz08o01",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});
```
2. Kontentga so'rov yuborish
    Endi siz qattiq porgarmmalashga tayyorsiz shaxsiy ma'lumotlaringizni.
pets massivini quyidagi kod bilan almashtiring
```
const pets = await client.fetch(`*[_type == "pet"]`);
```
Здесь вы можете видеть, что мы используем метод вызываемого clientфайла fetch(). Мы передаем простую строку в качестве первого аргумента, и эта строка представляет собой запрос GROQ, который фильтрует ( []) все ( *) ваши документы до тех, которые имеют  petзначение _type. Если этот запрос работает, он вернет массив документов в виде объектов. Как тот, который вы только что удалили.
👉 Сохраните файл и посмотрите, что произойдет. Был ли жестко запрограммированный контент заменен контентом, который вы добавили в студию? Если да, то поздравляю – вы это сделали! Если вы добавите или измените контент в студии и опубликуете его, вы сможете обновить предварительный просмотр Next.js и увидеть, что он отражает ваши обновления.
Yuqoridagi funksiyada getStaticProps berilgan ekan lekin uni ishlash prinspini bilmaganim uchun hamda ishlamagani uchun uni o'rniga oddiy fynksiya yozib uni chaqirib qo'ydim bu haqida batafsilroq keyinroq tanishganimda to'ldirib qo'yaman. Inshaolloh
```
// pages/index.js
import { createClient } from "next-sanity";
import { GetStaticProps, InferGetStaticPropsType } from "next";


interface petsProps {
    // pets:Array<{
        _updatedAt: string,
        _createdAt: string,
        _rev: string,
        _type: string,
        name: string,
        _id: string,
    // }>

}

const client = createClient({
    projectId: "v734yjju",
    dataset: "production",
    apiVersion: "2024-02-02",
    useCdn: false
})
export const getStaticProps = async()=> {

    const pets:petsProps[] = await client.fetch(`*[_type == "pet"]`);
    
    return pets

}


export default async function IndexPage() {
    const pets= await getStaticProps()
    
    console.log(pets);
    
    return (

        <>
             <header>
                <h1>Sanity + Next.js</h1>
            </header>
            <main>
                <h2>pets</h2>

                {pets.length > 0 && (
                    <ul>
                        {pets.map((pet) => (
                            <li key={pet._id}>{pet?.name}</li>
                        ))}
                    </ul>
                )}
                {pets.length < 0 && <p>No pets to show</p>}
                {pets.length > 0 && (
                    <div>
                        <pre>{JSON.stringify(pets, null, 2)}</pre>
                    </div>
                )}
                {pets.length < 0 && (
                    <div>
                        <div>¯\_(ツ)_/¯</div>
                        <p>
                            Your data will show up here when you've configured everything
                            correctly
                        </p>
                    </div>
                )}
            </main> 
        </>
    );
}


```
# Davomi qanday. 
Tabriklaymiz siz hozirgacha ko'rsatilgan hamma yo'llardan o'tib oldingiz. Bu yergacha nimalar o'rgandingiz:
- Loyihani yasadingiz
- Sanity Studio ni buyruqlar paneli orqali sozladingiz
- Kod muxarriri orqali sxema yasadingiz
- Bir qancha kontentlarni studio orqali qo'shdingiz, Content Lakega joyldingiz. 
- Interfeysni uladingiz, va ma'lumotlari ko'rsatdingiz.

# Sxemalar
Sxemalar - tasvirlaydi maydondagi hujjat turini, qaysiki redaktorlarni Sanity Studio ishchi hududida hosil qilish uchun.
Yuqori darajasi schema ni ikki hil qiymatli obyekt qabul qiladi. `templates` va `types`
`templates` - sozlamalar massivini qabul qiladi boshlang'ich qiymatga ega bo'lgan yoki qayta chaqiriladigan funksiyalarni va uni qaytaradi
`types` - ko'rsatilgan sxema yoki funksiyalar massivini qabul qiladi va un iqaytaradi.
В обоих случаях функция обратного вызова вызывается с текущим значением в качестве первого аргумента и объектом контекста в качестве второго. Таким образом, вы можете получить доступ к определениям схем и шаблонам начальных значений, реализованным с помощью плагинов.
templates - bu muhim bo'lmagan qiymat hisoblanib uni berish ixtiyoriy.
Quyida biz types uchun qabul qilinadiga qiymatlarni ko'rib chiqamiz.
- type (majburiy) - sxemani tipini nomi har qanday bo'lishi mumkin. Ma'lumotlar yoshiz tipini nomi hisoblanadi. 
- name (majburiy) - maydon nomi. Bu ma'lumotlar yozish uchun kalit hisoblanadi. 
- title - ma'lumot kiritish uchun foydalanuvchiga yo'llanma. 
- hidden - true yoki false qaytaradigan statik yoki qayta chaqiriladigan funksiya qabul qiladi. Shu asosida ma'lumot kiritish maydonini yashiradi yoki ko'rsatadi. 
- readOnly - agar true qo'yilsa bu maydon o'zgartirilmaydigan bo'ladi kontent studiyasida. Bundan tashqari qaytaradigan funksiya ham qo'llashingizn mumkin.
- description - qisqa ma'lumot muharrir uchun bu maydonni qanday to'ldirilishi haqida. 
- deprecated - qatorni ekirgan qilib belgilaydi. Bu maydon faqat o'qish uchun faol degan kabi ko'rsatadi vizula habar eskirdi degan bilan. 

  `Array` - massivlar.
Sxema turi aray ichidagi bir qancha boshqa tiplar uchun.
Tartiblangan ma'lumotlar ro'yxati. `of` xususiyati qanday turdagi qiymatlar massivda bo'lishini belgilaydi. 
Properties - xarakteristika - xususiyatlari
type: array - array e'lon qilinihshi uchun ishlatiladi. 
name: - maydon nomi dataga yozish uchun. 
of: - qanday tiplar kitilishini ko'rsatadi massiv elamentlariga.
- title - ma'lumot kiritish uchun foydalanuvchiga yo'llanma. 
- hidden - true yoki false qaytaradigan statik yoki qayta chaqiriladigan funksiya qabul qiladi. Shu asosida ma'lumot kiritish maydonini yashiradi yoki ko'rsatadi. 
- readOnly - agar true qo'yilsa bu maydon o'zgartirilmaydigan bo'ladi kontent studiyasida. Bundan tashqari qaytaradigan funksiya ham qo'llashingizn mumkin.
- description - qisqa ma'lumot muharrir uchun bu maydonni qanday to'ldirilishi haqida. 
- deprecated - qatorni ekirgan qilib belgilaydi. Bu maydon faqat o'qish uchun faol degan kabi ko'rsatadi vizula habar eskirdi degan bilan. 
Option - Variantlar 
- sortable: true - Foydalanuvchiga massivdagi elementlarni qayta tartiblashiga ruxsat berilganligini nazorat qiladi. Standartlar rost.
- layout:[string]-Agar teglar oʻrnatilgan boʻlsa, massivni yagona, tokenlashtirilgan kiritish maydoni sifatida koʻrsatadi. Ushbu parametr faqat massivda satrlar bo'lsa ishlaydi.
Agar to'rga o'rnatilgan bo'lsa, u panjara shaklida ko'rsatiladi.
Agar massiv ro'yxat opsiyasidan foydalansa, u qiymatlarni katakchalarning vertikal ro'yxati sifatida ko'rsatadi. Belgilash katakchalarini gorizontal joylashtirish uchun panjara tartibidan foydalaning.
- list:[array] - Oldindan belgilangan qiymatlar ro'yxati uchun belgilash katakchalarini ko'rsatadi.
Primitivlar massivlari uchun quyidagi formatlar qo'llab-quvvatlanadi:
    [ {value: <value>, title: <title>}, { … } ]
    [ <value1>, <value2>, … ]
Ob'ektlar massivlari uchun format:
    [ {_type: <mandatory-object-type>, _key: <optional-key>, /* optionally any fields that exist in <object-type>*/}, { … } ]
Ob'ektlar ob'ekt turlarini oldindan ko'rish konfiguratsiyasi yordamida ko'rsatiladi.
- modal: [object] ob'ekt
Modal (massiv tarkibini tahrirlash uchun dialog) qanday ko'rsatilishini boshqaradi. Type va width xususiyatiga ega ob'ektni oladi.
turi dialog yoki popover bo'lishi mumkin, kenglik "avtomatik" yoki raqam bo'lishi mumkin.
Default is {type: 'dialog', width: 'auto'}.
 Validation - validatsiay tekshirish tasdiqlash. 

