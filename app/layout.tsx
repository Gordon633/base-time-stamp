import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Base Time Stamp",
  description: "An onchain timestamp check-in recorder on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="6a229f81ab28df7fd2fc1627" />
        <meta
          name="talentapp:project_verification"
          content="44d7166b889457cfb2f84343db196797054cd756eabef21a2005677988780364d46f0ca89b1c583234f95382d1b61e9a2c5a8c65faace1b50170b78008a2d11e"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
