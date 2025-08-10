"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function QRPage() {
  const [qrValue, setQrValue] = useState("");
  const [amount, setAmount] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const storedAmount = sessionStorage.getItem("paymentAmount");
    if (!storedAmount) {
      router.push("/");
      return;
    }
    setAmount(storedAmount);
    
    // Create QR code that includes the amount in the URL
    const baseUrl = window.location.origin;
    const qrUrl = `${baseUrl}/payment/qr/pay?amount=${storedAmount}`;
    setQrValue(qrUrl);
  }, [isClient, router]);

  if (!isClient || !amount) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Scan QR Code to Pay</h1>
      
      <div className="text-center mb-4">
        <p className="text-lg text-gray-600">Amount to pay:</p>
        <p className="text-3xl font-bold text-green-600">₹{amount}</p>
      </div>

      {qrValue && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
      )}

      <p className="text-sm text-gray-500 text-center max-w-xs">
        Scan this QR code with your phone to open the payment page with the amount pre-filled
      </p>
      
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