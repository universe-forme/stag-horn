'use client';
import Image from 'next/image';
import React from "react";
import ConditionalLayout from "../../components/ConditionalLayout";
import ContactForm from "../../components/ContactForm";

const ContactPage = () => {
    return (
        <ConditionalLayout>
            <ContactContent />
        </ConditionalLayout>
    );
};

const ContactContent = () => {
    return (
        <div className="diagonal-bg min-h-screen relative overflow-hidden">
            {/* Background Overlay Image */}
            <div className="absolute top-0 left-0 w-1/3 h-2/3 hidden lg:block z-0 pointer-events-none">
                <Image
                    src="/Rectangle.png"
                    alt="Background Overlay"
                    fill
                    style={{ objectFit: 'contain' }}
                    className="opacity-100"
                />
            </div>
            <div className="max-w-7xl mx-auto relative z-10 py-16 px-4">
                <div className="text-center mt-24 mb-12">
                    <h2 className="mb-8">Contact Us</h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <section className="py-8">
                        <div className="container mx-auto px-4">
                            <ContactForm />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
