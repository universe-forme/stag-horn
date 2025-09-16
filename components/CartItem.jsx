'use client';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, toggleItemSelection } = useCart();
  const { product, quantity, selected } = item;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleToggleSelection = () => {
    toggleItemSelection(item.id);
  };

  const subtotal = product.price * quantity;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
      {/* Checkbox */}
      <div
        className={`flex items-center justify-center w-7 h-7 rounded cursor-pointer transition-colors border ${selected ? 'bg-main-primary-buttons border-main-primary-buttons' : 'bg-[#f9f9f6] border-borders'}`}
        onClick={handleToggleSelection}
      >
        <svg className={`w-4 h-4 text-white transition-opacity ${selected ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
      </div>

      {/* Product Card */}
      <div className="flex-1 w-full bg-white rounded-3xl border border-borders p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Product Image */}
          <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-2xl border border-sub-texts-mute-lable flex-shrink-0">
            <Image 
              src={product.main_image}
              alt={product.name} 
              className="rounded-2xl object-cover w-full h-full" 
              width={150} 
              height={150} 
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
              <h3 className="text-base lg:text-lg font-medium text-black lg:flex-1">
                {product.name}
              </h3>
              <div className="text-xl lg:text-2xl font-bold text-main-primary-buttons">
                ${product.price.toFixed(2)}
              </div>
            </div>

            <p className="text-sm text-sub-texts-mute-lable leading-relaxed">
              {product.short_description || (product.description ? `${product.description.substring(0, 120)}...` : '')}
            </p>

            <p className="text-xs">
              <span className="text-[#616161]">Category:</span>
              <span className="text-sub-texts-mute-lable"> {product.category?.name || 'N/A'}</span>
            </p>

            <p className="text-xs text-sub-texts-mute-lable">
              {product.estimated_delivery || 'Estimate delivery in 2-3 working days'}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <button
                  className="w-7 h-7 bg-sections-background rounded-lg flex items-center justify-center bg-gray-200 transition-colors hover:bg-gray-300"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <svg className="w-3 h-0.5 text-black" viewBox="0 0 12 2" fill="currentColor">
                    <path d="M0 .5h12v1H0z" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-body-text-headings min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  className="w-7 h-7 bg-main-primary-buttons rounded-lg flex items-center justify-center hover:bg-opacity-80 transition-colors"
                  onClick={() => handleQuantityChange(1)}
                >
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M4.5 0h1v10h-1V0zM0 4.5h10v1H0v-1z" />
                  </svg>
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-lg font-semibold text-black">
                Subtotal: ${subtotal.toFixed(2)}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                  onClick={handleRemove}
                  title="Remove item"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
