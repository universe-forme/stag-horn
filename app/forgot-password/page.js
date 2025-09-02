'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate password reset process
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            // Add your password reset logic here
            console.log('Password reset requested for:', email);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#F9F9F6] via-[#F5F5F0] to-[#E8E1D4] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
                            <Image 
                                src="/logo.svg" 
                                alt="Wazir Cutlery" 
                                width={48} 
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>
                        <h1 className="font-quattrocento text-3xl font-bold text-[#0E0E0E] mb-2">
                            Check Your Email
                        </h1>
                        <p className="text-[#2C2C2C] text-lg">
                            We&apos;ve sent you a password reset link
                        </p>
                    </div>

                    {/* Success Message */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-[#0E0E0E] mb-2">
                            Reset Link Sent!
                        </h2>
                        <p className="text-[#2C2C2C] mb-6">
                            We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your email and click the link to reset your password.
                        </p>
                        <div className="space-y-3">
                            <Link 
                                href="/login"
                                className="w-full bg-[#D6AF66] text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-[#C49F5A] transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-lg inline-block"
                            >
                                Back to Login
                            </Link>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setEmail('');
                                }}
                                className="w-full bg-gray-100 text-[#2C2C2C] py-3 px-4 rounded-lg font-medium text-lg hover:bg-gray-200 transition-all duration-200"
                            >
                                Send Another Link
                            </button>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-[#2C2C2C] opacity-75">
                            Didn&apos;t receive the email? Check your spam folder or{' '}
                            <button 
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setEmail('');
                                }}
                                className="text-[#D6AF66] hover:underline"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F9F9F6] via-[#F5F5F0] to-[#E8E1D4] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
                        <Image 
                            src="/logo.svg" 
                            alt="Wazir Cutlery" 
                            width={48} 
                            height={48}
                            className="w-12 h-12"
                        />
                    </div>
                    <h1 className="font-quattrocento text-3xl font-bold text-[#0E0E0E] mb-2">
                        Forgot Password?
                    </h1>
                    <p className="text-[#2C2C2C] text-lg">
                        No worries, we&apos;ll send you reset instructions
                    </p>
                </div>

                {/* Forgot Password Form */}
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6AF66] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-[#2C2C2C] placeholder-gray-400"
                                    placeholder="Enter your email address"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#D6AF66] text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-[#C49F5A] focus:ring-2 focus:ring-[#D6AF66] focus:ring-offset-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        {/* Back to Login */}
                        <div className="text-center">
                            <Link 
                                href="/login" 
                                className="text-[#D6AF66] hover:text-[#C49F5A] transition-colors duration-200 font-medium"
                            >
                                ← Back to login
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-8">
                    <p className="text-sm text-[#2C2C2C] opacity-75">
                        Remember your password?{' '}
                        <Link href="/login" className="text-[#D6AF66] hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
