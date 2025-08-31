'use client';
import Image from 'next/image';
import React from "react";
import ConditionalLayout from "../../components/ConditionalLayout";

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
                            <div className="form-container">
                                <h3 className="font-poppins mb-12 font-semibold text-center text-xl lg:text-2xl ">Order Now</h3>
                                <form>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="fullName" className="form-label">Full Name</label>
                                            <input type="text" id="fullName" name="fullName" className="form-input" placeholder="Full Name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" id="email" name="email" className="form-input" placeholder="Email" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                            <input type="tel" id="phoneNumber" name="phoneNumber" className="form-input" placeholder="+92  Phone Number" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="whatsappNumber" className="form-label">Whatsapp Number</label>
                                            <input type="tel" id="whatsappNumber" name="whatsappNumber" className="form-input" placeholder="+92  Phone Number" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="companyName" className="form-label">Company Name (Optional)</label>
                                            <input type="text" id="companyName" name="companyName" className="form-input" placeholder="Company Name (Optional)" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="companyEmail" className="form-label">Company Email (Optional)</label>
                                            <input type="email" id="companyEmail" name="companyEmail" className="form-input" placeholder="Company Email (Optional)" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <input type="text" id="country" name="country" className="form-input" placeholder="Country" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input type="text" id="location" name="location" className="form-input" placeholder="Location" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" id="city" name="city" className="form-input" placeholder="City" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
                                            <input type="number" id="productQuantity" name="productQuantity" className="form-input" placeholder="Product Quantity" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="shipmentAddress" className="form-label">Shipment Address</label>
                                            <input type="text" id="shipmentAddress" name="shipmentAddress" className="form-input" placeholder="Enter full shipment address..." />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emergencyContact" className="form-label">Emergency Contact Number</label>
                                            <input type="tel" id="emergencyContact" name="emergencyContact" className="form-input" placeholder="Enter emergency contact number" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea id="message" name="message" className="form-textarea" placeholder="Write Message..."></textarea>
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="submit-button">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
