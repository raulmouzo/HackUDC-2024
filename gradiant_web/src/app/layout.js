import "./globals.css";
import { FileProvider } from "./context/csvContex";

export const metadata = {
  title: "WattCheck",
  description: "WattCheck: Unveil Insights from Your Power Data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FileProvider>{children}</FileProvider>
      </body>
    </html>
  );
}
