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
          content="f502dfa54f43cc8307a8df054046f5d1cb684780295281a180e158b60b5e9b15461e881b4b512ba5efd727eb9f804400a1a8a6ac6dcd0e707ad57aecfcea4afb"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
