import { Inter } from "next/font/google";
import "./globals.css";
import { FileProvider } from "./context/csvContex";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WattCheck",
  description: "WattCheck: Unveil Insights from Your Power Data",
};

export default function RootLayout({ children }) {
  return (
    <FileProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </FileProvider>
  );
}
