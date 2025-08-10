"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";

export default function NFCPayment() {
  const [amount, setAmount] = useState("");
  const [gameState, setGameState] = useState<"waiting" | "detecting" | "success" | "payment">("waiting");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedAmount = sessionStorage.getItem("paymentAmount");
    if (!storedAmount) {
      router.push("/");
      return;
    }
    setAmount(storedAmount);
  }, [router]);

  const startNFCDetection = () => {
    setGameState("detecting");
    setProgress(0);
    
    // Simulate NFC detection with a progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGameState("success");
          setTimeout(() => setGameState("payment"), 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handlePayment = async () => {
    const amountInPaise = parseFloat(amount) * 100;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "CashlessPay",
      description: "NFC Payment",
      image: "/favicon.ico",
      handler: function (response: any) {
        alert("✅ Payment successful\nPayment ID: " + response.razorpay_payment_id);
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
        method: "nfc",
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <h1 className="text-2xl font-bold">NFC Payment Experience</h1>
      
      <div className="text-center mb-4">
        <p className="text-lg text-gray-600">Amount to pay:</p>
        <p className="text-3xl font-bold text-green-600">₹{amount}</p>
      </div>

      {gameState === "waiting" && (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">📱</div>
          </div>
          <p className="text-lg">Tap your device to simulate NFC connection</p>
          <Button 
            onClick={startNFCDetection}
            className="w-full max-w-xs py-3 text-lg bg-blue-600 hover:bg-blue-700"
          >
            Tap to Connect NFC
          </Button>
        </div>
      )}

      {gameState === "detecting" && (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
            <div className="text-4xl">🔄</div>
          </div>
          <p className="text-lg">Detecting NFC device...</p>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{progress}% complete</p>
        </div>
      )}

      {gameState === "success" && (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">✅</div>
          </div>
          <p className="text-lg text-green-600 font-semibold">NFC Connection Successful!</p>
          <p className="text-sm text-gray-500">Redirecting to payment...</p>
        </div>
      )}

      {gameState === "payment" && (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">💳</div>
          </div>
          <p className="text-lg">Ready to complete payment</p>
          <Button 
            onClick={handlePayment}
            className="w-full max-w-xs py-3 text-lg bg-green-600 hover:bg-green-700"
          >
            Pay with Razorpay
          </Button>
        </div>
      )}
      
      <Button 
        onClick={() => router.push("/payment")}
        variant="outline"
        className="mt-4"
      >
        Back to Payment Methods
      </Button>
    </div>
  );
}
