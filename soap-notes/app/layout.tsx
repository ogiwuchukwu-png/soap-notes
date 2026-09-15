import type { Metadata } from "next";
import { Lora, Karla } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soap Notes — Lather in luxury. Keep the questions.",
  description:
    "Handcrafted soap wrapped in questions worth sitting with. Shop the Founding Set and the S.O.A.P. Series.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
