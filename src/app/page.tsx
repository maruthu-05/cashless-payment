"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // Store amount in sessionStorage to pass to payment methods
    sessionStorage.setItem("paymentAmount", amount);
    router.push("/payment");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to Cashless Payment</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <div className="text-center">
          <label htmlFor="amount" className="block text-lg font-medium mb-2">
            Enter Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-center text-xl font-semibold focus:border-blue-500 focus:outline-none"
            min="1"
            step="0.01"
          />
        </div>
        
        <Button 
          onClick={handleContinue}
          className="w-full py-3 text-lg"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Continue
        </Button>
      </div>
    </main>
  );
}
