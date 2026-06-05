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
        <meta name="base:app_id" content="[填写 base.dev Verify token]" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
