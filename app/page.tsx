import IndexPage from ".";

interface petsProps {
  _updatedAt: string,
  _createdAt: string,
  _rev: string,
  _type: string,
  name: string,
  _id: string,
}
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <IndexPage />
    </main>
  );
}
