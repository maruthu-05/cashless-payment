"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";

export default function UPIPayment() {
  const [amount, setAmount] = useState("");
  const [isFromQR, setIsFromQR] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if amount is passed via URL (from QR scan)
      const urlParams = new URLSearchParams(window.location.search);
      const amountFromURL = urlParams.get('amount');
      
      if (amountFromURL) {
        setAmount(amountFromURL);
        setIsFromQR(true);
      } else {
        // Check sessionStorage for normal flow
        const storedAmount = sessionStorage.getItem("paymentAmount");
        if (!storedAmount) {
          router.push("/");
          return;
        }
        setAmount(storedAmount);
        setIsFromQR(false);
      }
    }
  }, [router]);

  const handlePayment = async () => {
    const amountInPaise = parseFloat(amount) * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "CashlessPay",
      description: "UPI Payment",
      image: "/favicon.ico",
      handler: function (response: any) {
        alert("✅ Payment successful\nPayment ID: " + response.razorpay_payment_id);
        // Clear session storage after successful payment
        sessionStorage.removeItem("paymentAmount");
        sessionStorage.removeItem("paymentMethod");
        router.push("/");
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
      
      <h1 className="text-2xl font-bold">Pay via UPI</h1>
      
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
      
      <Button 
        onClick={() => router.push(isFromQR ? "/" : "/payment")}
        variant="outline"
        className="mt-4"
      >
        {isFromQR ? "Back to Home" : "Back to Payment Methods"}
      </Button>
    </div>
  );
}
