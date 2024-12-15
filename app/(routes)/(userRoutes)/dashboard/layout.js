import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/footer.js";

export const metadata = {
  title: "Dashboard - AMS",
  description:
    "View your attendance records, manage your classes, and track your students' attendance with ease. Our dashboard is designed to help you stay organized and efficient in your teaching.",
};

export default function DashboardLayout({ children }) {
  return (
        <main className="container before:bg-[#F9F3F3] before:z-[-1] before:content-[' ']  before:h-full before:w-full before:absolute  max-phone:w-screen w-[640px] select-none mx-auto  min-h-screen flex flex-col relative ">
          <Navbar user={"Rohit"} />
          <div className="flex-grow  bg-[#F9F3F3] *:mx-auto *:w-[93.75%]">
            {children}
          </div>
          <Footer />
        </main>
      
  );
}
