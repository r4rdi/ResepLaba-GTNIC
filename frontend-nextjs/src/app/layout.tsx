import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { WarungProvider } from "@/lib/warung-store";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "ResepLaba | Kasir warung",
  description:
    "Kasir pintar warung: jual racikan dan eceran, stok FEFO terjaga, laba aman.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ToastProvider>
          <WarungProvider>
            {children}
            <ToastViewport />
          </WarungProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
