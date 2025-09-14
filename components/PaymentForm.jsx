'use client';
import { useState } from 'react';

const PaymentForm = ({ onPaymentSuccess }) => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });
    const [cardErrors, setCardErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setCardErrors({});
    };

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        
        // Format card number with spaces
        if (name === 'cardNumber') {
            const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formatted.length <= 19) { // 16 digits + 3 spaces
                setCardData(prev => ({ ...prev, [name]: formatted }));
            }
        }
        // Format expiry date
        else if (name === 'expiryDate') {
            const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
            if (formatted.length <= 5) {
                setCardData(prev => ({ ...prev, [name]: formatted }));
            }
        }
        // Format CVV
        else if (name === 'cvv') {
            const formatted = value.replace(/\D/g, '');
            if (formatted.length <= 4) {
                setCardData(prev => ({ ...prev, [name]: formatted }));
            }
        }
        else {
            setCardData(prev => ({ ...prev, [name]: value }));
        }
        
        // Clear error when user starts typing
        if (cardErrors[name]) {
            setCardErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateCardData = () => {
        const errors = {};
        
        if (!cardData.cardNumber.replace(/\s/g, '')) {
            errors.cardNumber = 'Card number is required';
        } else if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
            errors.cardNumber = 'Card number must be 16 digits';
        }
        
        if (!cardData.expiryDate) {
            errors.expiryDate = 'Expiry date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
            errors.expiryDate = 'Invalid expiry date format (MM/YY)';
        }
        
        if (!cardData.cvv) {
            errors.cvv = 'CVV is required';
        } else if (cardData.cvv.length < 3) {
            errors.cvv = 'CVV must be at least 3 digits';
        }
        
        if (!cardData.cardName.trim()) {
            errors.cardName = 'Cardholder name is required';
        }
        
        setCardErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (paymentMethod === 'card' && !validateCardData()) {
            return;
        }
        
        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
            onPaymentSuccess(paymentMethod, cardData);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="bg-white rounded-3xl border border-borders p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-semibold text-black mb-6">Payment Method</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => handlePaymentMethodChange('cod')}
                            className="w-4 h-4 text-main-primary-buttons"
                        />
                        <label htmlFor="cod" className="text-lg font-medium text-gray-900">
                            Cash on Delivery (COD)
                        </label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            id="card"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => handlePaymentMethodChange('card')}
                            className="w-4 h-4 text-main-primary-buttons"
                        />
                        <label htmlFor="card" className="text-lg font-medium text-gray-900">
                            Credit/Debit Card
                        </label>
                    </div>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                        <h4 className="text-lg font-medium text-gray-900">Card Information</h4>
                        
                        <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                                Cardholder Name *
                            </label>
                            <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={cardData.cardName}
                                onChange={handleCardInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-main-primary-buttons ${
                                    cardErrors.cardName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter cardholder name"
                            />
                            {cardErrors.cardName && <p className="text-red-500 text-sm mt-1">{cardErrors.cardName}</p>}
                        </div>

                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number *
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardData.cardNumber}
                                onChange={handleCardInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-main-primary-buttons ${
                                    cardErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="1234 5678 9012 3456"
                            />
                            {cardErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{cardErrors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiry Date *
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={cardData.expiryDate}
                                    onChange={handleCardInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-main-primary-buttons ${
                                        cardErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="MM/YY"
                                />
                                {cardErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{cardErrors.expiryDate}</p>}
                            </div>

                            <div>
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV *
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={cardData.cvv}
                                    onChange={handleCardInputChange}
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-main-primary-buttons ${
                                        cardErrors.cvv ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="123"
                                />
                                {cardErrors.cvv && <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>}
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                            🔒 This is a demo payment form. No real payments will be processed.
                        </p>
                    </div>
                )}

                {/* Payment Info */}
                {paymentMethod === 'cod' && (
                    <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="text-lg font-medium text-blue-900 mb-2">Cash on Delivery</h4>
                        <p className="text-blue-700">
                            You can pay with cash when your order is delivered. Please have the exact amount ready.
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full inline-flex h-12 lg:h-13 items-center justify-center gap-2.5 px-6 lg:px-8 py-3 bg-main-primary-buttons rounded-xl hover:bg-opacity-90 transition-colors text-white font-normal text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing Payment...
                        </>
                    ) : (
                        `Complete Order${paymentMethod === 'cod' ? ' (COD)' : ''}`
                    )}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
