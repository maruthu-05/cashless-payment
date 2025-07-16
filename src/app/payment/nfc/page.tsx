"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";

export default function QRPayment() {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    const amountInPaise = parseInt(amount) * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "CashlessPay",
      description: "QR Code Payment",
      image: "/favicon.ico",
      handler: function (response: any) {
        alert("✅ Payment successful\nPayment ID: " + response.razorpay_payment_id);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className="text-2xl font-bold">Pay via NFC(Test)</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="border px-4 py-2 rounded text-center"
      />
      <Button onClick={handlePayment}>Pay with Razorpay</Button>
    </div>
  );
}
