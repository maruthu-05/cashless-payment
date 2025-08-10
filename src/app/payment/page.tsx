"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaymentMethodPage() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedAmount = sessionStorage.getItem("paymentAmount");
    if (!storedAmount) {
      router.push("/");
      return;
    }
    setAmount(storedAmount);
  }, [router]);

  const handlePaymentMethod = (method: string) => {
    // Store the payment method for the specific payment page
    sessionStorage.setItem("paymentMethod", method);
    router.push(`/payment/${method}`);
  };

  if (!amount) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-center">Choose Payment Method</h1>
      
      <div className="text-center mb-4">
        <p className="text-lg text-gray-600">Amount to pay:</p>
        <p className="text-3xl font-bold text-green-600">₹{amount}</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button 
          onClick={() => handlePaymentMethod("upi")}
          className="w-full py-4 text-lg"
        >
          Pay with UPI
        </Button>
        <Button 
          onClick={() => handlePaymentMethod("qr")}
          className="w-full py-4 text-lg"
        >
          Pay with QR Code
        </Button>
        <Button 
          onClick={() => handlePaymentMethod("nfc")}
          className="w-full py-4 text-lg"
        >
          Pay with NFC
        </Button>
      </div>
      
      <Button 
        onClick={() => router.push("/")}
        variant="outline"
        className="mt-4"
      >
        Back to Amount Entry
      </Button>
    </main>
  );
}