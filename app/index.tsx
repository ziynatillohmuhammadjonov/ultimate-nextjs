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

