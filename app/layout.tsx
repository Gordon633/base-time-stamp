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
        <meta name="base:app_id" content="6a229fadab28df7fd2fc1628" />
        <meta
          name="talentapp:project_verification"
          content="e6020be58e1d56cfa86d6392508dd443cbdc816277943ad3c63f0667cf9b0fe25b85c0a6abdf6029a62fe67917a148e8ac866e7090af15acfbbf0a7ebeb63ecb"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
