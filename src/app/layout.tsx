import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./provider";
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KEE Youth UK Referral Form",
  description: "Sample referral form proof of concept",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </ThemeRegistry>
    </html>
  );
}
