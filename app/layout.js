import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AMS - Attendance Management System",
  description: "Effortlessly track student attendance with our app designed specifically for college teachers. Streamline roll calls, monitor attendance records, and improve class management—all in one intuitive platform. Boost productivity and ensure accuracy in attendance tracking today!",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
        >
        {children}
      </body>
    </html>
  );
}
