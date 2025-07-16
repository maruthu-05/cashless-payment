// src/lib/razorpay.ts
export const RAZORPAY_KEY_ID = "rzp_test_WsTrb67YgfBncN"; // replace with your test key

export function mockPayment(amount: number) {
  // Simulate a payment delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "success", amount });
    }, 1500);
  });
}
