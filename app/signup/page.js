'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { signUp, setActive } = useSignUp();
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            toast.error('Please accept the terms and conditions');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        setIsLoading(true);

        try {
            const result = await signUp.create({
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.email,
                password: formData.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push('/');
                toast.success('Account created successfully!');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Logo and Welcome */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#D6AF66] to-[#C49F5A] items-center justify-center">
                <div className="text-center text-white px-8">
                    <div className="mb-8">
                        <Image
                            src="/logo.svg"
                            alt="Wazir Cutlery"
                            width={120}
                            height={120}
                            className="mx-auto"
                        />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
                    <p className="text-xl opacity-90">
                        Create your account and start your journey with Wazir Cutlery
                    </p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo Section (Mobile) */}
                    <div className="text-center mb-8 lg:hidden">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
                            <Image 
                                src="/logo.svg" 
                                alt="Stag Horn Cutlery" 
                                width={48} 
                                height={48}
                                className="w-12 h-12"
                            />
                        </div>
                        <h1 className="font-quattrocento text-3xl font-bold text-[#0E0E0E] mb-2">
                            Create Account
                        </h1>
                        <p className="text-[#2C2C2C] text-lg">
                            Join our premium cutlery community
                        </p>
                    </div>

                    {/* Signup Form */}
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6AF66] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-[#2C2C2C] placeholder-gray-400"
                                        placeholder="First name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6AF66] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-[#2C2C2C] placeholder-gray-400"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>

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
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6AF66] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-[#2C2C2C] placeholder-gray-400"
                                        placeholder="Enter your email"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6AF66] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-[#2C2C2C] placeholder-gray-400 pr-12"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#D6AF66] transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D6AF66] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm text-[#2C2C2C] placeholder-gray-400 pr-12"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#D6AF66] transition-colors duration-200"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="accept-terms"
                                        name="accept-terms"
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="h-4 w-4 text-[#D6AF66] focus:ring-[#D6AF66] border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="accept-terms" className="text-[#2C2C2C]">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-[#D6AF66] hover:underline">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-[#D6AF66] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !acceptTerms}
                                className="w-full bg-[#D6AF66] text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-[#C49F5A] focus:ring-2 focus:ring-[#D6AF66] focus:ring-offset-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Sign In Link */}
                            <div className="text-center mt-6">
                                <p className="text-sm text-[#2C2C2C]">
                                    Already have an account?{' '}
                                    <Link 
                                        href="/login" 
                                        className="font-medium text-[#D6AF66] hover:text-[#C49F5A] transition-colors duration-200"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-8">
                        <p className="text-sm text-[#2C2C2C] opacity-75">
                            By creating an account, you agree to our{' '}
                            <Link href="/terms" className="text-[#D6AF66] hover:underline">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-[#D6AF66] hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
