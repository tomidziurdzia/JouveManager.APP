import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { getSession } from "./actions/auth";
import Providers from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "Jouve Manager",
  description: "Jouve Manager",
  icons: {
    icon: "/Jota.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased font-primary"
        )}
      >
        <Providers session={session}>
          {children}
          <Toaster richColors position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
