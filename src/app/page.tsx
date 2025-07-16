"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to Cashless Payment</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={() => router.push("/payment/upi")}>Pay with UPI</Button>
        <Button onClick={() => router.push("/payment/qr")}>Pay with QR</Button>
        <Button onClick={() => router.push("/payment/nfc")}>Pay with NFC</Button>
      </div>
    </main>
  );
}
