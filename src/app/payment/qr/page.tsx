"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function QRPage() {
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    setQrValue("https://cashless-payment-q6msv171a-maruthavanan-s-vs-projects.vercel.app/payment/upi");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-2xl font-bold">Scan to Pay via UPI</h1>

      {qrValue && (
        <QRCodeSVG value={qrValue} size={200} />
      )}

      <p className="text-sm text-gray-500">Scan this QR to open UPI Payment page</p>
    </div>
  );
}

