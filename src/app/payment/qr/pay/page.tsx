"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";

export default function QRPaymentPage() {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const amountFromQR = searchParams.get("amount");
    if (amountFromQR) {
      setAmount(amountFromQR);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  const handlePayment = async () => {
    const amountInPaise = parseFloat(amount) * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "CashlessPay",
      description: "QR Code Payment",
      image: "/favicon.ico",
      handler: function (response: any) {
        alert("✅ Payment successful\nPayment ID: " + response.razorpay_payment_id);
        router.push("/");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        method: "qr",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  if (!amount) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <h1 className="text-2xl font-bold">Complete QR Payment</h1>
      
      <div className="text-center mb-4">
        <p className="text-lg text-gray-600">Amount to pay:</p>
        <p className="text-3xl font-bold text-green-600">₹{amount}</p>
      </div>

      <Button 
        onClick={handlePayment}
        className="w-full max-w-xs py-3 text-lg"
      >
        Pay with Razorpay
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        You scanned the QR code successfully!
      </p>
    </div>
  );
}