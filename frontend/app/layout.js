// app/layout.js
import "./globals.css";
import Providers from "./providers";

export const metadata = { title: "MEM Dashboard" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC] antialiased">
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
