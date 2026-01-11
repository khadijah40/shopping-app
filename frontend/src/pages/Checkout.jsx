import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CreditCard, Truck, ShieldCheck, Building2, Smartphone } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod, bank, easypaisa, jazzcash

  const [bankInfo, setBankInfo] = useState({
    accountTitle: "",
    accountNumber: "",
    bankName: "",
    transactionProof: null,
  });

  const [mobileWalletInfo, setMobileWalletInfo] = useState({
    phoneNumber: "",
    transactionId: "",
    screenshot: null,
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    // Simulate order placement
    setTimeout(() => {
      alert("Order placed successfully! 🎉 You will receive a confirmation email shortly.");
      clearCart();
      navigate("/");
      setLoading(false);
    }, 1500);
  };

  const subtotal = getCartTotal();
  const shipping = 150; // PKR 150 shipping
  const tax = 0; // No tax for simplicity
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? "text-black" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-yellow-400 text-black" : "bg-gray-200"}`}>
                1
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Shipping</span>
            </div>
            <div className={`w-16 sm:w-24 h-1 mx-2 ${step >= 2 ? "bg-yellow-400" : "bg-gray-200"}`}></div>
            <div className={`flex items-center ${step >= 2 ? "text-black" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-yellow-400 text-black" : "bg-gray-200"}`}>
                2
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Payment</span>
            </div>
            <div className={`w-16 sm:w-24 h-1 mx-2 ${step >= 3 ? "bg-yellow-400" : "bg-gray-200"}`}></div>
            <div className={`flex items-center ${step >= 3 ? "text-black" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-yellow-400 text-black" : "bg-gray-200"}`}>
                3
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6" />
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complete Address *
                    </label>
                    <textarea
                      required
                      rows="3"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="House/Flat no, Street, Area"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <select
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        <option value="">Select City</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="75500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium mt-6"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Select Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="space-y-4 mb-6">
                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === "cod" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-yellow-400 bg-yellow-400" : "border-gray-300"}`}>
                        {paymentMethod === "cod" && <div className="w-2 h-2 bg-black rounded-full"></div>}
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod("bank")}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === "bank" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-bold text-gray-900">Bank Transfer</p>
                          <p className="text-sm text-gray-500">Direct bank account transfer</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank" ? "border-yellow-400 bg-yellow-400" : "border-gray-300"}`}>
                        {paymentMethod === "bank" && <div className="w-2 h-2 bg-black rounded-full"></div>}
                      </div>
                    </div>
                  </div>

                  {/* JazzCash */}
                  <div
                    onClick={() => setPaymentMethod("jazzcash")}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === "jazzcash" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="font-bold text-gray-900">JazzCash</p>
                          <p className="text-sm text-gray-500">Mobile wallet payment</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "jazzcash" ? "border-yellow-400 bg-yellow-400" : "border-gray-300"}`}>
                        {paymentMethod === "jazzcash" && <div className="w-2 h-2 bg-black rounded-full"></div>}
                      </div>
                    </div>
                  </div>

                  {/* Easypaisa */}
                  <div
                    onClick={() => setPaymentMethod("easypaisa")}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      paymentMethod === "easypaisa" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-bold text-gray-900">Easypaisa</p>
                          <p className="text-sm text-gray-500">Mobile wallet payment</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "easypaisa" ? "border-yellow-400 bg-yellow-400" : "border-gray-300"}`}>
                        {paymentMethod === "easypaisa" && <div className="w-2 h-2 bg-black rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery - No form needed */}
                {paymentMethod === "cod" && (
                  <div className="mt-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-green-800">
                        ✓ You will pay cash when your order is delivered to your doorstep.
                      </p>
                      <p className="text-sm text-green-800 mt-2">
                        Note: Please keep the exact amount ready for a smooth delivery experience.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium"
                      >
                        Continue to Review
                      </button>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {paymentMethod === "bank" && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-blue-900 mb-2">Our Bank Details:</p>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Bank Name:</strong> Meezan Bank</p>
                        <p><strong>Account Title:</strong> Fashion Store</p>
                        <p><strong>Account Number:</strong> 1234567890123</p>
                        <p><strong>IBAN:</strong> PK12MEZN0001234567890123</p>
                      </div>
                      <p className="text-xs text-blue-700 mt-3">
                        Please transfer the total amount and upload proof of payment below.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Account Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo.accountTitle}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountTitle: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Account holder name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Account Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo.accountNumber}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter your account number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Bank Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo.bankName}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g., HBL, MCB, UBL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Payment Proof (Screenshot/Receipt) *
                      </label>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setBankInfo({ ...bankInfo, transactionProof: e.target.files[0] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <p className="text-xs text-gray-500 mt-1">Upload screenshot of your bank transfer</p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50"
                      >
                        {loading ? "Verifying..." : "Continue to Review"}
                      </button>
                    </div>
                  </form>
                )}

                {/* JazzCash Form */}
                {paymentMethod === "jazzcash" && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-red-900 mb-2">JazzCash Payment Instructions:</p>
                      <div className="text-sm text-red-800 space-y-1">
                        <p>1. Open your JazzCash app</p>
                        <p>2. Send money to: <strong>03XX-XXXXXXX</strong></p>
                        <p>3. Amount: <strong>PKR {total.toFixed(2)}</strong></p>
                        <p>4. Note down the Transaction ID</p>
                        <p>5. Upload screenshot below</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your JazzCash Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobileWalletInfo.phoneNumber}
                        onChange={(e) => setMobileWalletInfo({ ...mobileWalletInfo, phoneNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={mobileWalletInfo.transactionId}
                        onChange={(e) => setMobileWalletInfo({ ...mobileWalletInfo, transactionId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter transaction ID"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Payment Screenshot *
                      </label>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setMobileWalletInfo({ ...mobileWalletInfo, screenshot: e.target.files[0] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <p className="text-xs text-gray-500 mt-1">Upload screenshot of successful payment</p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50"
                      >
                        {loading ? "Verifying..." : "Continue to Review"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Easypaisa Form */}
                {paymentMethod === "easypaisa" && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 mt-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-green-900 mb-2">Easypaisa Payment Instructions:</p>
                      <div className="text-sm text-green-800 space-y-1">
                        <p>1. Open your Easypaisa app</p>
                        <p>2. Send money to: <strong>03XX-XXXXXXX</strong></p>
                        <p>3. Amount: <strong>PKR {total.toFixed(2)}</strong></p>
                        <p>4. Note down the Transaction ID</p>
                        <p>5. Upload screenshot below</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Easypaisa Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobileWalletInfo.phoneNumber}
                        onChange={(e) => setMobileWalletInfo({ ...mobileWalletInfo, phoneNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={mobileWalletInfo.transactionId}
                        onChange={(e) => setMobileWalletInfo({ ...mobileWalletInfo, transactionId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter transaction ID"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Payment Screenshot *
                      </label>
                      <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setMobileWalletInfo({ ...mobileWalletInfo, screenshot: e.target.files[0] })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <p className="text-xs text-gray-500 mt-1">Upload screenshot of successful payment</p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition font-medium"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50"
                      >
                        {loading ? "Verifying..." : "Continue to Review"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>

                {/* Shipping Info Review */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <p className="font-medium">{shippingInfo.fullName}</p>
                    <p className="text-gray-600">{shippingInfo.address}</p>
                    <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.postalCode}</p>
                    <p className="text-gray-600">{shippingInfo.country}</p>
                    <p className="text-gray-600 mt-2">{shippingInfo.email}</p>
                    <p className="text-gray-600">{shippingInfo.phone}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-sm text-yellow-600 hover:text-yellow-700 mt-2">
                    Edit
                  </button>
                </div>

                {/* Payment Method Review */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Payment Method</h3>
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <p className="font-medium">
                      {paymentMethod === "cod" && "Cash on Delivery"}
                      {paymentMethod === "bank" && "Bank Transfer"}
                      {paymentMethod === "jazzcash" && "JazzCash"}
                      {paymentMethod === "easypaisa" && "Easypaisa"}
                    </p>
                    {paymentMethod === "bank" && (
                      <div className="text-gray-600 mt-2">
                        <p>From: {bankInfo.accountTitle}</p>
                        <p>Account: {bankInfo.accountNumber}</p>
                        <p>Bank: {bankInfo.bankName}</p>
                      </div>
                    )}
                    {(paymentMethod === "jazzcash" || paymentMethod === "easypaisa") && (
                      <div className="text-gray-600 mt-2">
                        <p>Phone: {mobileWalletInfo.phoneNumber}</p>
                        <p>Transaction ID: {mobileWalletInfo.transactionId}</p>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setStep(2)} className="text-sm text-yellow-600 hover:text-yellow-700 mt-2">
                    Edit
                  </button>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-md">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold">PKR {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-yellow-400 text-black py-3 rounded-md hover:bg-yellow-500 transition font-bold disabled:opacity-50"
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">PKR {shipping.toFixed(2)}</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">PKR {tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">PKR {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-4">
                <p className="text-xs text-gray-700">
                  <ShieldCheck className="w-4 h-4 inline mr-1" />
                  Secure checkout
                </p>
              </div>

              <div className="mt-4 space-y-2 text-xs text-gray-600">
                <p>✓ Free returns within 7 days</p>
                <p>✓ Delivery within 3-5 business days</p>
                <p>✓ Authentic products guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}