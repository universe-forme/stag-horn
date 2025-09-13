'use client';
import { useState, useEffect } from 'react';
import ConditionalLayout from '../../components/ConditionalLayout';
import Image from "next/image";

const CartPage = () => {
    return (
        <ConditionalLayout>
            <CartContent />
        </ConditionalLayout>
    );
};

const CartContent = () => {
    const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1 });
    const [totalItems, setTotalItems] = useState(0);
    const [checkboxStates, setCheckboxStates] = useState({});

    useEffect(() => {
        const total = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
        setTotalItems(total);
    }, [quantities]);

    const changeQuantity = (itemId, change) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max(1, prevQuantities[itemId] + change)
        }));
    };

    const removeItem = (itemId) => {
        console.log(`Remove item ${itemId}`);
        // Add your remove item logic here
    };

    const toggleFavorite = (itemId) => {
        console.log(`Toggle favorite for item ${itemId}`);
        // Add your favorite toggle logic here
    };

    const proceedToCheckout = () => {
        console.log(`Proceed to checkout with ${totalItems} items`);
        // Add your checkout logic here
    };

    const toggleCheckbox = (id) => {
        setCheckboxStates(prevStates => ({
            ...prevStates,
            [id]: !prevStates[id]
        }));
    };

    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 py-8 lg:py-16">
                {/* Page Header */}
                <header className="text-center mb-8 lg:mb-16">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium text-black">
                        Cart
                    </h1>
                </header>

                {/* Cart Items Section */}
                <div className="space-y-8 lg:space-y-16 mb-8 lg:mb-16">
                    {/* Today Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 lg:gap-6">
                            <div className={`flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors ${checkboxStates[1] ? 'checkbox-checked' : ''}`}
                                id="checkbox-1" onClick={() => toggleCheckbox(1)}>
                                <div
                                    className="checkbox-unchecked w-full h-full bg-white border border-borders rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white opacity-0 transition-opacity" viewBox="0 0 16 16"
                                        fill="currentColor">
                                        <path
                                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-black">Today</h2>
                        </div>
                        {/* Cart Item 1 */}
                        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
                            <div className={`flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors ${checkboxStates[2] ? 'checkbox-checked' : ''}`}
                                id="checkbox-2" onClick={() => toggleCheckbox(2)}>
                                <div
                                    className="checkbox-unchecked w-full h-full bg-white border border-borders rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white opacity-0 transition-opacity" viewBox="0 0 16 16"
                                        fill="currentColor">
                                        <path
                                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 w-full bg-white rounded-3xl border border-borders p-4 lg:p-6">
                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                                    {/* Product Image */}
                                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-2xl border border-sub-texts-mute-lable flex-shrink-0">
                                        <Image src="/product.jpg" alt={"product"} className="rounded-2xl" width={150} height={150} />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                                            <h3 className="text-base lg:text-lg font-medium text-black lg:flex-1">
                                                Stainless Steel Dinner Spoon – Satin Finish
                                            </h3>
                                            <div className="text-xl lg:text-2xl font-bold text-main-primary-buttons">
                                                $5.99
                                            </div>
                                        </div>

                                        <p className="text-sm text-sub-texts-mute-lable leading-relaxed">
                                            Lorem ipsum turpis id proin et euismod imperdiet pellentesque risus id nibh sed mi
                                            amet libero nec commodo sit et nulla et proin erat facilisi nulla non eget nam cras
                                            tincidunt dolor amet laoreet proin habitant quam congue adipiscing quam neque id
                                            viverra elit tortor arcu magna duis nulla ut sit consectetur orci semper sed
                                        </p>

                                        <p className="text-xs">
                                            <span className="text-[#616161]">Category:</span>
                                            <span className="text-sub-texts-mute-lable"> Knife, Swords, Daggers</span>
                                        </p>

                                        <p className="text-xs text-sub-texts-mute-lable">
                                            Estimate delivery in 2-3 working days
                                        </p>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="w-7 h-7 bg-sections-background rounded-lg flex items-center justify-center bg-gray-200 transition-colors"
                                                    onClick={() => changeQuantity(1, -1)}>
                                                    <svg className="w-3 h-0.5 text-black" viewBox="0 0 12 2" fill="currentColor">
                                                        <path d="M0 .5h12v1H0z" />
                                                    </svg>
                                                </button>
                                                <span
                                                    className="text-sm font-semibold text-body-text-headings min-w-[20px] text-center"
                                                    id="quantity-1">{quantities[1]}</span>
                                                <button
                                                    className="w-7 h-7 bg-main-primary-buttons rounded-lg flex items-center justify-center hover:bg-opacity-80 transition-colors"
                                                    onClick={() => changeQuantity(1, 1)}>
                                                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                                                        <path d="M4.5 0h1v10h-1V0zM0 4.5h10v1H0v-1z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                                                    onClick={() => toggleFavorite(1)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path
                                                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                                                    onClick={() => removeItem(1)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path
                                                            d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Yesterday Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 lg:gap-6">
                            <div className={`flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors ${checkboxStates[3] ? 'checkbox-checked' : ''}`}
                                id="checkbox-3" onClick={() => toggleCheckbox(3)}>
                                <div
                                    className="checkbox-unchecked w-full h-full bg-white border border-borders rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white opacity-0 transition-opacity" viewBox="0 0 16 16"
                                        fill="currentColor">
                                        <path
                                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-black">Yesterday</h2>
                        </div>

                        {/* Cart Item 2 */}
                        <article className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
                            <div className={`flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors ${checkboxStates[4] ? 'checkbox-checked' : ''}`}
                                id="checkbox-4" onClick={() => toggleCheckbox(4)}>
                                <div
                                    className="checkbox-unchecked w-full h-full bg-white border border-borders rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white opacity-0 transition-opacity" viewBox="0 0 16 16"
                                        fill="currentColor">
                                        <path
                                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 w-full bg-white rounded-3xl border border-borders p-4 lg:p-6">
                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-2xl border border-sub-texts-mute-lable flex-shrink-0">
                                        <Image src="/product.jpg" alt={"product"} className="rounded-2xl" width={150} height={150} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                                            <h3 className="text-base lg:text-lg font-medium text-black lg:flex-1">
                                                Stainless Steel Dinner Spoon – Satin Finish
                                            </h3>
                                            <div className="text-xl lg:text-2xl font-bold text-main-primary-buttons">$5.99</div>
                                        </div>
                                        <p className="text-sm text-sub-texts-mute-lable leading-relaxed">
                                            Lorem ipsum turpis id proin et euismod imperdiet pellentesque risus id nibh sed mi
                                            amet libero nec commodo sit et nulla et proin erat facilisi nulla non eget nam cras
                                            tincidunt dolor amet laoreet proin habitant quam congue adipiscing quam neque id
                                            viverra elit tortor arcu magna duis nulla ut sit consectetur orci semper sed
                                        </p>
                                        <p className="text-xs">
                                            <span className="text-[#616161]">Category:</span>
                                            <span className="text-sub-texts-mute-lable"> Knife, Swords, Daggers</span>
                                        </p>
                                        <p className="text-xs text-sub-texts-mute-lable">
                                            Estimate delivery in 2-3 working days
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="w-7 h-7 bg-sections-background rounded-lg flex items-center justify-center bg-gray-200 transition-colors"
                                                    onClick={() => changeQuantity(2, -1)}>
                                                    <svg className="w-3 h-0.5 text-black" viewBox="0 0 12 2" fill="currentColor">
                                                        <path d="M0 .5h12v1H0z" />
                                                    </svg>
                                                </button>
                                                <span
                                                    className="text-sm font-semibold text-body-text-headings min-w-[20px] text-center"
                                                    id="quantity-2">{quantities[2]}</span>
                                                <button
                                                    className="w-7 h-7 bg-main-primary-buttons rounded-lg flex items-center justify-center hover:bg-opacity-80 transition-colors"
                                                    onClick={() => changeQuantity(2, 1)}>
                                                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                                                        <path d="M4.5 0h1v10h-1V0zM0 4.5h10v1H0v-1z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                                                    onClick={() => toggleFavorite(2)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path
                                                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                                                    onClick={() => removeItem(2)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path
                                                            d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Cart Item 3 */}
                        <article className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
                            <div className={`flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors ${checkboxStates[5] ? 'checkbox-checked' : ''}`}
                                id="checkbox-5" onClick={() => toggleCheckbox(5)}>
                                <div
                                    className="checkbox-unchecked w-full h-full bg-white border border-borders rounded flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white opacity-0 transition-opacity" viewBox="0 0 16 16"
                                        fill="currentColor">
                                        <path
                                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 w-full bg-white rounded-3xl border border-borders p-4 lg:p-6">
                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-2xl border border-sub-texts-mute-lable flex-shrink-0">
                                        <Image src="/product.jpg" alt={"product"} className="rounded-2xl" width={150} height={150} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                                            <h3 className="text-base lg:text-lg font-medium text-black lg:flex-1">
                                                Stainless Steel Dinner Spoon – Satin Finish
                                            </h3>
                                            <div className="text-xl lg:text-2xl font-bold text-main-primary-buttons">$5.99</div>
                                        </div>
                                        <p className="text-sm text-sub-texts-mute-lable leading-relaxed">
                                            Lorem ipsum turpis id proin et euismod imperdiet pellentesque risus id nibh sed mi
                                            amet libero nec commodo sit et nulla et proin erat facilisi nulla non eget nam cras
                                            tincidunt dolor amet laoreet proin habitant quam congue adipiscing quam neque id
                                            viverra elit tortor arcu magna duis nulla ut sit consectetur orci semper sed
                                        </p>
                                        <p className="text-xs">
                                            <span className="text-[#616161]">Category:</span>
                                            <span className="text-sub-texts-mute-lable"> Knife, Swords, Daggers</span>
                                        </p>
                                        <p className="text-xs text-sub-texts-mute-lable">
                                            Estimate delivery in 2-3 working days
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="w-7 h-7 bg-sections-background rounded-lg flex items-center justify-center bg-gray-200 transition-colors"
                                                    onClick={() => changeQuantity(3, -1)}>
                                                    <svg className="w-3 h-0.5 text-black" viewBox="0 0 12 2" fill="currentColor">
                                                        <path d="M0 .5h12v1H0z" />
                                                    </svg>
                                                </button>
                                                <span
                                                    className="text-sm font-semibold text-body-text-headings min-w-[20px] text-center"
                                                    id="quantity-3">{quantities[3]}</span>
                                                <button
                                                    className="w-7 h-7 bg-main-primary-buttons rounded-lg flex items-center justify-center hover:bg-opacity-80 transition-colors"
                                                    onClick={() => changeQuantity(3, 1)}>
                                                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                                                        <path d="M4.5 0h1v10h-1V0zM0 4.5h10v1H0v-1z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                                                    onClick={() => toggleFavorite(3)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path
                                                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                                                    onClick={() => removeItem(3)}>
                                                    <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path
                                                            d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>

                {/* Checkout Button */}
                <div className="flex justify-center lg:justify-end mb-8 lg:mb-16">
                    <button
                        className="inline-flex h-12 lg:h-13 items-center justify-center gap-2.5 px-6 lg:px-8 py-3 bg-main-primary-buttons rounded-xl hover:bg-opacity-90 transition-colors text-white font-normal text-lg"
                        onClick={proceedToCheckout}>
                        Proceed to Checkout (<span id="total-items">{totalItems}</span>)
                    </button>
                </div>

            </main>
            <style jsx>{`
                body {
                    font-family: 'Outfit', sans-serif;
                }

                .checkbox-checked .checkbox-unchecked {
                    background-color: rgba(242, 127, 12, 1) !important;
                    border-color: rgba(242, 127, 12, 1) !important;
                }

                .checkbox-checked .checkbox-unchecked svg {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
};

export default CartPage;
