const Newsletter = () => {
    return (
        <div className="newsletter-container newsletter-outfit-font">
            {/* Left Content */}
            <div className="newsletter-left-content">
                <h2 className="newsletter-heading">Ready to Get Our New Stuff Update?</h2>
            </div>

            {/* Right Content - Email Input */}
            <div className="newsletter-right-content">
                <p className="newsletter-content-text">Be the first to discover newly forged swords, knives, axes, and more — crafted with precision, strength, and legacy for true warriors and collectors.</p>
                <div className="newsletter-input-container">
                    <input
                        type="email"
                        placeholder="Enter Your Email..."
                        className="newsletter-email-input newsletter-outfit-font"
                        required
                    />
                    <button className="newsletter-submit-btn newsletter-outfit-font">
                        <span className="newsletter-btn-text">Buy Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
