import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReq, getReq, putReq } from '../../api/axios'
import { setProducts } from '../../store/productSlice';
import { 
  FaTrashArrowUp, 
  FaArrowLeft, 
  FaCreditCard, 
  FaTruck, 
  FaRupeeSign,
  FaPlus,
  FaMinus,
  FaSpinner,
  FaGift,
  FaLock,
  FaHeart
} from 'react-icons/fa6';
import { decreaseQty, increaseQty, removeItem } from '../../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, product } = useSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const [updatingItem, setUpdatingItem] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const getAllProducts = async () => {
        try {
            const response = await getReq("/products")
            dispatch(setProducts(response?.products))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    const cartData = cart?.items?.map((cartItem) => {
        const productData = product?.product?.find((p) => p._id === cartItem.product)
        if (!productData) return null;
        return {
            ...productData,
            quantity: cartItem.quantity
        }
    }).filter(item => item !== null);

    const handleIncrease = async (productId, item) => {
        const newQty = item.quantity + 1;
        setUpdatingItem(productId);
        try {
            const response = await putReq("/cart/", {
                productId: productId, 
                quantity: newQty
            })
            if (response?.success || response?.data?.success) {
                dispatch(increaseQty(productId));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const handleDecrease = async (productId, item) => {
        if (item.quantity <= 1) return;
        const newQty = item.quantity - 1;
        setUpdatingItem(productId);
        try {
            const response = await putReq("/cart/", {
                productId: productId, 
                quantity: newQty
            })
            if (response?.success || response?.data?.success) {
                dispatch(decreaseQty(productId));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setUpdatingItem(null);
        }
    };

    const handleDelete = async (id) =>{
        setLoading(true);
        try {
            const response = await deleteReq(`/cart/remove/${id}`);
            if(response.success || response?.data?.success){
                dispatch(removeItem(id));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const subTotal = cartData?.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0) || 0;
    const shippingCharges = subTotal > 10000 ? 150 : 0;
    const tax = subTotal * 0.18;
    const discountAmount = (subTotal * discount) / 100;
    const totalAmount = subTotal + shippingCharges + tax - discountAmount;

    return (
        <div className='bg-gradient-to-br from-gray-50 to-white min-h-screen py-8'>
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Header */}
                <div className='mb-8'>
                    <Link to="/" className='inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors mb-4 group'>
                        <FaArrowLeft className='text-sm group-hover:-translate-x-1 transition-transform' />
                        <span>Continue Shopping</span>
                    </Link>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                        <div>
                            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3'>
                                <FaShoppingCart className='text-amber-500' />
                                Shopping Cart
                                {cartData?.length > 0 && (
                                    <span className='text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
                                        {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
                                    </span>
                                )}
                            </h1>
                            <p className='text-gray-500 mt-2'>Review and manage your items</p>
                        </div>
                    </div>
                </div>

                {cartData?.length > 0 ? (
                    <div className='flex flex-col lg:flex-row gap-8'>
                        
                        {/* Cart Items Section */}
                        <div className='lg:w-2/3'>
                            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
                                            <tr>
                                                <th className='w-[45%] text-left py-5 px-6 font-semibold text-gray-700'>Product</th>
                                                <th className='w-[25%] text-left py-5 px-6 font-semibold text-gray-700'>Quantity</th>
                                                <th className='w-[20%] text-left py-5 px-6 font-semibold text-gray-700'>Price</th>
                                                <th className='w-[10%] text-left py-5 px-6 font-semibold text-gray-700'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-gray-100'>
                                            {cartData.map((cp) => (
                                                <tr key={cp._id} className='hover:bg-gray-50 transition-all duration-300 group'>
                                                    <td className='py-5 px-6'>
                                                        <div className='flex items-center gap-4'>
                                                            <div className='relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300'>
                                                                <img 
                                                                    src={cp.images?.[0]?.url || '/placeholder-image.jpg'} 
                                                                    className='w-full h-full object-cover' 
                                                                    alt={cp.name} 
                                                                />
                                                                <button className='absolute top-2 right-2 bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50'>
                                                                    <FaHeart className='text-xs text-gray-400 hover:text-red-500' />
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <h3 className='font-semibold text-gray-800 hover:text-amber-600 transition-colors line-clamp-2'>
                                                                    {cp.name}
                                                                </h3>
                                                                <p className='text-sm text-gray-500 mt-1'>
                                                                    {cp.category?.name || 'General'}
                                                                </p>
                                                                <p className='text-xs text-gray-400 mt-2'>
                                                                    Unit Price: {cp.discountedPrice}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='py-5 px-6'>
                                                        <div className='flex items-center gap-3'>
                                                            <button 
                                                                className='w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group'
                                                                onClick={() => handleDecrease(cp._id, cp)}
                                                                disabled={cp.quantity <= 1 || updatingItem === cp._id}
                                                            >
                                                                {updatingItem === cp._id ? (
                                                                    <FaSpinner className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <FaMinus className="text-sm group-hover:scale-90 transition-transform" />
                                                                )}
                                                            </button>
                                                            <span className='font-semibold text-gray-800 min-w-[40px] text-center text-lg'>
                                                                {cp.quantity}
                                                            </span>
                                                            <button 
                                                                className='w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all disabled:opacity-50 flex items-center justify-center group'
                                                                onClick={() => handleIncrease(cp._id, cp)}
                                                                disabled={updatingItem === cp._id}
                                                            >
                                                                {updatingItem === cp._id ? (
                                                                    <FaSpinner className="w-4 h-4 animate-spin" />
                                                                ) : (
                                                                    <FaPlus className="text-sm group-hover:scale-90 transition-transform" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className='py-5 px-6'>
                                                        <div className='font-bold text-gray-800 text-lg'>
                                                            {cp.discountedPrice * cp.quantity}
                                                        </div>
                                                    </td>
                                                    <td className='py-5 px-6'>
                                                        <button 
                                                            onClick={() => handleDelete(cp._id)}
                                                            disabled={loading}
                                                            className='text-gray-400 hover:text-red-600 transition-all p-2 hover:bg-red-50 rounded-xl group'
                                                        >
                                                            <FaTrashArrowUp className='text-lg group-hover:scale-110 transition-transform' />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className='mt-6 bg-amber-50 rounded-xl p-4 border border-amber-100'>
                                <div className='flex items-center gap-3'>
                                    <FaTruck className='text-amber-600 text-xl' />
                                    <div className='flex-1'>
                                        <p className='text-sm font-semibold text-amber-800'>Free Delivery</p>
                                        <p className='text-xs text-amber-600'>
                                            {subTotal > 20000 ? '150' : 'Free'}
                                        </p>
                                    </div>
                                    {subTotal < 5000 && (
                                        <div className='w-32 bg-amber-200 rounded-full h-2'>
                                            <div 
                                                className='bg-amber-600 h-2 rounded-full transition-all duration-500'
                                                style={{ width: `${(subTotal / 5000) * 100}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className='lg:w-1/3'>
                            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4'>
                                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Order Summary</h2>
                                
                                <div className='space-y-3'>
                                    <div className='flex justify-between items-center text-gray-600'>
                                        <span>Subtotal</span>
                                        <span className='font-medium'>{subTotal.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className='flex justify-between items-center text-gray-600'>
                                        <div className='flex items-center gap-2'>
                                            <span>Shipping</span>
                                        </div>
                                        <span className='font-medium'>
                                            {shippingCharges.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className='flex justify-between items-center text-gray-600'>
                                        <span>Tax (18% GST)</span>
                                        <span className='font-medium'>{tax.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className='border-t border-gray-200 pt-4 mt-4'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-lg font-bold text-gray-800'>Total</span>
                                            <span className='text-2xl font-bold text-amber-600'>
                                                {totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button onClick={()=>navigate('/checkout')} className='w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl mt-4 hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-semibold flex items-center justify-center gap-2 shadow-md'>
                                        <FaCreditCard />
                                        Proceed to Checkout
                                    </button>
                                    
                                    <div className='flex items-center justify-center gap-3 text-xs text-gray-400 mt-4'>
                                        <div className='flex items-center gap-1'>
                                            <FaLock className='text-xs' />
                                            <span>Secure Checkout</span>
                                        </div>
                                        <div className='w-1 h-1 bg-gray-300 rounded-full'></div>
                                        <div className='flex items-center gap-1'>
                                            <FaShieldAlt className='text-xs' />
                                            <span>Buyer Protection</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className='mt-4 bg-white rounded-xl p-4 border border-gray-100 text-center'>
                                <div className='flex items-center justify-center gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <FaGift className='text-amber-500' />
                                        <span className='text-xs text-gray-600'>Free Returns</span>
                                    </div>
                                    <div className='w-px h-4 bg-gray-200'></div>
                                    <div className='flex items-center gap-2'>
                                        <FaShieldAlt className='text-amber-500' />
                                        <span className='text-xs text-gray-600'>2 Year Warranty</span>
                                    </div>
                                    <div className='w-px h-4 bg-gray-200'></div>
                                    <div className='flex items-center gap-2'>
                                        <FaTruck className='text-amber-500' />
                                        <span className='text-xs text-gray-600'>Fast Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center'>
                        <div className='max-w-md mx-auto'>
                            <div className='w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse'>
                                <FaShoppingCart className='text-5xl text-gray-400' />
                            </div>
                            <h2 className='text-3xl font-bold text-gray-800 mb-3'>Your cart is empty</h2>
                            <p className='text-gray-500 mb-8'>
                                Looks like you haven't added any items to your cart yet. 
                                Start exploring our amazing products!
                            </p>
                            <Link 
                                to="/" 
                                className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 font-semibold shadow-md'
                            >
                                <FaArrowLeft />
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default Cart