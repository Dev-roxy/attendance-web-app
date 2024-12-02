import Image from "next/image";

export default function Home() {
  return (
   <>
    <main className="container max-w-80 mx-auto bg-slate-300 min-h-screen flex flex-col relative">
      <header className="bg-gray-900 h-10 rounded-b-[1rem] "></header>
      <main className="flex-grow  bg-red-200">

      </main>
      <footer className="h-10 w-80 bg-gray-900 rounded-t-[1rem] fixed bottom-0"></footer>
    </main>
   </>
  );
}
