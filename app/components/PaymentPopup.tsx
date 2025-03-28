'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface PaymentPopupProps {
  amount: number;
  onClose: () => void;
}

export default function PaymentPopup({ amount, onClose }: PaymentPopupProps) {
  const [upiId] = useState('ethanmathias123@okhdfcbank');
  const [message] = useState('Jewellery Store Purchase');
  const [upilink] = useState(`upi://pay?pa=${upiId}&pn=JewelleryStore&am=${amount}&tn=${message}&cu=USD`);
  const [qrlink] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upilink)}&color=255-255-255&bgcolor=3-13-36`);

  const handlePayment = () => {
    window.open(upilink, "_self");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#030D24] rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Complete Your Payment</h2>
          <p className="text-gray-300">Scan the QR code with any UPI app to pay</p>
        </div>
        
        <div className="flex justify-center mb-6">
          <img src={qrlink} alt="Payment QR Code" className="w-64 h-64" />
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-300">
            <span className="font-semibold text-white">{upiId}</span> has requested a payment of{' '}
            <span className="font-semibold text-white">${amount.toFixed(2)}</span> for{' '}
            <span className="font-semibold text-white">{message}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={handlePayment}
            className="w-full bg-[#0A2A5A] hover:bg-[#133E7C] text-white"
          >
            Open in UPI App
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
} 