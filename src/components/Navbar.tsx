// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">CashlessPay</h1>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/payment/upi">UPI</Link>
        <Link href="/payment/qr">QR</Link>
        <Link href="/payment/nfc">NFC</Link>
      </div>
    </nav>
  );
}
