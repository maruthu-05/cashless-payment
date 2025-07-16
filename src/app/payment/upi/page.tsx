"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";

export default function UpiPayment() {
  const [amount, setAmount] = useState("100"); // default ₹100
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handlePayment = () => {
    const amountInPaise = parseInt(amount) * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: amountInPaise,
      currency: "INR",
      name: "CashlessPay",
      description: "UPI Payment",
      image: "/favicon.ico",
      handler: function (response: { razorpay_payment_id: string }) {
        alert("✅ Payment successful\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        method: "upi",
      },
      theme: {
        color: "#0f172a",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    if (isScriptLoaded) {
      handlePayment(); // auto-trigger Razorpay
    }
  }, [isScriptLoaded]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => alert("❌ Failed to load Razorpay SDK")}
      />

      <h1 className="text-2xl font-bold">Pay via UPI (Auto)</h1>
      <p className="text-sm text-gray-500">Razorpay will open automatically</p>
    </div>
  );
}
