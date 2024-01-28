import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ThemeProvider } from '@/components/theme-provider';
import "~/styles/globals.css";
// import { ModeToggle } from '@/components/mode-toggle';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NUS Gym",
  description: "Real-time NUS Gym Occupancy",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
