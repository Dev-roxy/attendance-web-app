import Image from 'next/image';
import Dashboard from './components/server/dashboard';

export default function Home() {
  const user = 'Rohit';
  return (
    <>
      <main className="container max-phone:w-full w-[620px] select-none mx-auto  min-h-screen flex flex-col relative ">
        <header className="bg-[#3F0071] h-[56px] rounded-b-[1rem] absolute w-full max-w-screen-laptop top-0 flex justify-start items-center box-border px-4 py-2">
          <div className="logo h-10 aspect-square bg-white rounded-full  "></div>
          <div className="user text-[12px] ml-2 text-white">Hi {user}</div>
        </header>
        <main className="flex-grow  bg-[#F9F3F3] *:mx-auto *:w-[93.75%]">
          <Dashboard user={'Rohit'} />
        </main>
        <footer className="h-[56px] max-tablet:w-screen w-full max-w-screen-laptop  bg-[#3F0071] rounded-t-[1rem] fixed bottom-0"></footer>
      </main>
    </>
  );
}
