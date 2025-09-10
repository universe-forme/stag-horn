'use client';
import { useState } from 'react';
import { useSubmitContactForm } from '../lib/hooks';
import { sendContactNotification } from '../lib/email-service';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        whatsappNumber: '',
        companyName: '',
        companyEmail: '',
        country: '',
        location: '',
        city: '',
        productQuantity: '',
        shipmentAddress: '',
        emergencyContact: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    
    const { submitContactForm, isLoading: isSubmittingHook } = useSubmitContactForm();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Convert productQuantity to number if provided
            const submissionData = {
                ...formData,
                productQuantity: formData.productQuantity ? parseInt(formData.productQuantity) : undefined
            };

            const result = await submitContactForm(submissionData);
            
            // Send email notification
            await sendContactNotification(result);
            
            setSubmitStatus('success');
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                whatsappNumber: '',
                companyName: '',
                companyEmail: '',
                country: '',
                location: '',
                city: '',
                productQuantity: '',
                shipmentAddress: '',
                emergencyContact: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="form-container">
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0E0E0E] mb-2">Thank You!</h2>
                    <p className="text-[#2C2C2C] mb-6">
                        Your order request has been submitted successfully. We'll get back to you soon!
                    </p>
                    <button
                        onClick={() => setSubmitStatus(null)}
                        className="bg-[#D6AF66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#C49F5A] transition-colors duration-200"
                    >
                        Submit Another Request
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Order Now</h2>

            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    There was an error submitting your form. Please try again.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            id="fullName" 
                            name="fullName" 
                            className="form-input" 
                            placeholder="Full Name" 
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="form-input" 
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            className="form-input" 
                            placeholder="+92 Phone Number" 
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="whatsappNumber" className="form-label">Whatsapp Number</label>
                        <input 
                            type="tel" 
                            id="whatsappNumber" 
                            name="whatsappNumber" 
                            className="form-input" 
                            placeholder="+92 Phone Number" 
                            value={formData.whatsappNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="companyName" className="form-label">Company Name (Optional)</label>
                        <input 
                            type="text" 
                            id="companyName" 
                            name="companyName" 
                            className="form-input" 
                            placeholder="Company Name (Optional)" 
                            value={formData.companyName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="companyEmail" className="form-label">Company Email (Optional)</label>
                        <input 
                            type="email" 
                            id="companyEmail" 
                            name="companyEmail" 
                            className="form-input" 
                            placeholder="Company Email (Optional)" 
                            value={formData.companyEmail}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
                            className="form-input" 
                            placeholder="Country" 
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location" 
                            className="form-input" 
                            placeholder="Location" 
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label">City</label>
                        <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            className="form-input" 
                            placeholder="City" 
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productQuantity" className="form-label">Product Quantity</label>
                        <input 
                            type="number" 
                            id="productQuantity" 
                            name="productQuantity" 
                            className="form-input" 
                            placeholder="Product Quantity" 
                            value={formData.productQuantity}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="shipmentAddress" className="form-label">Shipment Address</label>
                        <input 
                            type="text" 
                            id="shipmentAddress" 
                            name="shipmentAddress" 
                            className="form-input" 
                            placeholder="Enter full shipment address..." 
                            value={formData.shipmentAddress}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emergencyContact" className="form-label">Emergency Contact Number</label>
                        <input 
                            type="tel" 
                            id="emergencyContact" 
                            name="emergencyContact" 
                            className="form-input" 
                            placeholder="Enter emergency contact number" 
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        className="form-textarea" 
                        placeholder="Write Message..."
                        value={formData.message}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}
