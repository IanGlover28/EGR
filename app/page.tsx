'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Mail, ShoppingCart, Star, CheckCircle, Menu, X, ArrowLeft, Phone, User, Package, MessageSquare } from 'lucide-react';
import {motion, Variants} from "framer-motion"
import Image from 'next/image';
// Logo Component
const EvergreenLogo = () => (
  <svg width="200" height="60" viewBox="0 0 200 60" className="w-full h-full">
    <defs>
      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* Leaf Icon */}
    <path d="M 25 15 Q 25 5 35 10 Q 45 5 45 15 Q 45 30 35 40 Q 25 30 25 15" fill="url(#leafGradient)" />
    <path d="M 35 10 Q 35 20 35 40" stroke="#047857" strokeWidth="2" fill="none" />
    <path d="M 35 20 Q 40 22 42 25" stroke="#047857" strokeWidth="1.5" fill="none" />
    <path d="M 35 25 Q 30 27 28 30" stroke="#047857" strokeWidth="1.5" fill="none" />
    {/* Text */}
    <text x="55" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#1f2937">
      Evergreen
    </text>
    <text x="55" y="45" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="600" fill="#10b981">
      Remedy Ghana
    </text>
  </svg>
);

const EvergreenRemedyWebsite = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    quantity: 1,
    packageType: '',
    price: 0,
    note: ''
  });

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const packages = [
    { id: 1, quantity: 1, price: 599, label: 'Starter Pack', popular: false },
    { id: 2, quantity: 2, price: 1099, label: 'Family Pack', popular: true, save: 99 },
    { id: 3, quantity: 3, price: 1599, label: 'Value Pack', popular: false, save: 198 }
  ];

  const handleOrderNow = (pkg: {label: string, quantity: number, price: number}) => {
    setFormData({
      ...formData,
      quantity: pkg.quantity,
      packageType: pkg.label,
      price: pkg.price
    });
    setShowCheckout(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const handleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};



const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Prevent double submissions
  if (isSubmitting) return;

  // Basic client-side validation
  if (!formData.name.trim()) {
    alert('Please enter your full name.');
    return;
  }
  if (!formData.phone.trim()) {
    alert('Please enter your phone number.');
    return;
  }
  if (!formData.location.trim()) {
    alert('Please select your delivery location.');
    return;
  }
  if (!formData.packageType) {
    alert('Please select a package.');
    return;
  }

  setIsSubmitting(true);

  try {
    // Ensure numeric fields are numbers
    const payload = {
      ...formData,
      quantity: Number(formData.quantity) || 1,
      price: Number(formData.price) || 0,
    };

    const res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Prefer server-provided error message, fallback to generic
      const message = (result && (result.error || result.message)) || 'Failed to submit order. Please try again later.';
      throw new Error(message);
    }

    // Success: show popup and reset form
    setShowSuccessPopup(true);
    setFormData({
      name: '',
      phone: '',
      location: '',
      quantity: 1,
      packageType: '',
      price: 0,
      note: '',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Order submission failed:', err);
    alert(
      err?.message ||
        'There was an error sending your order. Please try again later or contact us at supplegenix@gmail.com'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setShowCheckout(false);
  };

  const testimonials = [
    {
      name: 'Mrs. Abena K.',
      location: 'Kumasi',
      text: 'My 9-year-old son used to forget almost everything. After 3 weeks with Forever Arctic Sea, his teacher called to say he\'s more attentive and remembers better!',
      rating: 5,
      image: '👩🏾'
    },
    {
      name: 'Mr. Kwame T.',
      location: 'Accra',
      text: 'My daughter now explains topics to her friends! Her confidence has grown tremendously, and she actually loves studying now.',
      rating: 5,
      image: '👨🏾'
    },
    {
      name: 'Grace A.',
      location: 'Takoradi',
      text: 'I was surprised when my son\'s teacher told me he\'s now one of the most focused kids in class. Forever Arctic Sea really works!',
      rating: 5,
      image: '👩🏾‍🦱'
    },
    {
      name: 'Josephine M.',
      location: 'Tamale',
      text: 'My daughter is now more focused during homework time. She remembers things better and learns faster. Thank you!',
      rating: 5,
      image: '👩🏾'
    },
    {
      name: 'Ama K.',
      location: 'Accra',
      text: 'My son\'s grades jumped from average to top 5 in his class! Forever Arctic Sea really works wonders. I recommend it to every parent.',
      rating: 4,
      image: '👩🏾‍🦱'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your order has been created successfully. Evergreen Remedy will get back to you shortly to confirm your order.
            </p>
            <button
              onClick={closeSuccessPopup}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Checkout Page */}
      {showCheckout ? (
        <div className="min-h-screen bg-gray-50">
          {/* Checkout Header */}
          <header className="bg-white shadow-md sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-48">
                  <EvergreenLogo />
                </div>
              </div>
            </div>
          </header>

          {/* Checkout Form */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Order Summary */}
              <div className="bg-green-600 text-white p-8">
                <h1 className="text-3xl font-bold mb-4">Complete Your Order</h1>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-100 mb-2">You&apos;re ordering:</p>
                    <p className="text-2xl font-bold">{formData.packageType}</p>
                    <p className="text-lg">{formData.quantity} bottle(s) of Forever Arctic Sea</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 mb-2">Total:</p>
                    <p className="text-4xl font-bold">GH₵{formData.price}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitOrder} className="p-8 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <User className="w-5 h-5 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-black font-semibold mb-2">
                    <Phone className="w-5 h-5 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., 0244123456"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-black font-semibold mb-2">
                    <MapPin className="w-5 h-5 inline mr-2" />
                    Delivery Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select your location</option>
                    <option value="Accra">Accra</option>
                    <option value="Kumasi">Kumasi</option>
                    <option value="Tamale">Tamale</option>
                    <option value="Takoradi">Takoradi</option>
                    <option value="Cape Coast">Cape Coast</option>
                    <option value="Tema">Tema</option>
                    <option value="Sunyani">Sunyani</option>
                    <option value="Koforidua">Koforidua</option>
                    <option value="Ho">Ho</option>
                    <option value="Other">Other (Nationwide Delivery Available)</option>
                  </select>
                </div>

                {/* Additional Note */}
                <div>
                  <label className="block text-black font-semibold mb-2">
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    Additional Note (Optional)
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Any special delivery instructions or questions?"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      'Submit Order'
                    )}
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    🔒 Your information is secure and will only be used to process your order
                  </p>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Secure Order</h3>
                <p className="text-gray-600 text-sm">Your data is protected</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-gray-600 text-sm">Nationwide shipping</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Phone className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-gray-600 text-sm">We&apos;ll contact you soon</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Main Website Content */
        <div>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="w-48">
              <EvergreenLogo />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#product" className="text-gray-700 hover:text-green-600 font-medium transition">Product</a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 font-medium transition">Benefits</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium transition">Reviews</a>
              <a href="#pricing" className="text-gray-700 hover:text-green-600 font-medium transition">Pricing</a>
            </nav>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

         {/* Mobile Fullscreen Sidebar Menu */}
{mobileMenuOpen && (
  <div
  className={`fixed top-[64px] right-0 w-full h-[calc(100vh-64px)] bg-white z-50 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-500 ease-in-out ${
    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
  {/* Close Button (Top Right)
  <button
    onClick={() => setMobileMenuOpen(false)}
    className="absolute top-6 right-6 p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
  >
    <X size={28} />
  </button> */}

  {/* Navigation Links */}
  <a
    href="#product"
    onClick={() => setMobileMenuOpen(false)}
    className="text-2xl font-semibold text-green-600 hover:text-green-800 transition"
  >
    Product
  </a>
  <a
    href="#benefits"
    onClick={() => setMobileMenuOpen(false)}
    className="text-2xl font-semibold text-green-600 hover:text-green-800 transition"
  >
    Benefits
  </a>
  <a
    href="#testimonials"
    onClick={() => setMobileMenuOpen(false)}
    className="text-2xl font-semibold text-green-600 hover:text-green-800 transition"
  >
    Reviews
  </a>
  <a
    href="#pricing"
    onClick={() => setMobileMenuOpen(false)}
    className="text-2xl font-semibold text-green-600 hover:text-green-800 transition"
  >
    Pricing
  </a>
</div>
)}

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-color-white text-black py-20">
       <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
          <motion.div variants={fadeUp}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug sm:leading-tight md:leading-tight">
          Give your child the edge to think sharper, learn faster & shine brighter!
        </h1>
            <div className="flex gap-4">
              <a
            href="#pricing"
            className="bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-green-700 transition shadow-lg text-center"
          >
            Order Now
          </a>
          <a
            href="https://www.tiktok.com/@evergreenremedyghana"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-800 transition shadow-lg text-center"
          >
            TikTok Page
          </a>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 shadow-2xl">
<Image
  src="/product.png"
  alt="Forever Arctic Sea"
  width={500}
  height={500}
  className="w-full h-full object-contain rounded-xl"
/>            </div>
          </motion.div>
        </div>
      </motion.section> 
      </section>

    {/* Countdown Timer */}
<section className="bg-red-600 text-white py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
      {/* Title and Icon */}
      <div className="flex items-center gap-2">
        <Clock className="w-6 h-6 animate-pulse" />
        <span className="font-bold text-lg">Limited Time Offer Ends In:</span>
      </div>

      {/* Countdown Boxes */}
      <div className="flex gap-4">
        {[
          { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
          { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
          { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-center min-w-16 shadow-md hover:scale-105 transition-transform duration-200"
          >
            <div className="text-2xl">{item.value}</div>
            <div className="text-xs">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Product Section */}
     <motion.section
      id="product"
      className="py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Forever Arctic Sea
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium Kids Brain Booster - Unlock Your Child&apos;s Full Potential
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-64 h-96 mx-auto">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/thumbnail.png"
              >
                <source src="/ad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Give Your Child the Smart Advantage
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Forever Arctic Sea is enriched with high-quality Omega-3, DHA and EPA
              from fish oil and calamari — the essential nutrients that fuel brain
              development, enhance memory and boost concentration in growing children.
            </p>

            {/* Benefits */}
            <motion.div
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {[
                {
                  title: "DHA (Docosahexaenoic Acid)",
                  text: "Builds brain cells and improves memory recall",
                },
                {
                  title: "EPA (Eicosapentaenoic Acid)",
                  text: "Enhances focus, calmness and learning speed",
                },
                {
                  title: "Omega-3 Fatty Acids",
                  text: "Helps the brain communicate faster and clearer",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 120 },
                    },
                  }}
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900">{item.title}</strong>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>

      {/* Benefits Section */}
    <section id="benefits" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why Parents Choose Forever Arctic Sea
      </motion.h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: "🎯",
          title: "Better Focus",
          desc: "Children stay more attentive in class, helping them grasp lessons with fewer distractions and improved mental clarity."
        },
        {
          icon: "🧠",
          title: "Sharper Memory",
          desc: "Supports brain health to help kids remember schoolwork, retain what they learn, and perform better during exams."
        },
        {
          icon: "📚",
          title: "Faster Learning",
          desc: "Boosts cognitive speed so students understand new concepts quicker and build confidence in their studies."
        },
        {
          icon: "⭐",
          title: "Better Grades",
          desc: "Improved focus, memory, and learning combine to enhance academic results, making parents proud and kids motivated."
        }
      ].map((benefit, idx) => (
        <motion.div
          key={idx}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-5xl mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
          >
            {benefit.icon}
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
             Quotes
            </h2>
            <p className="text-xl text-gray-600">Reviews from Parents who have tried our Products</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&apos;{testimonial.text}&apos;</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600">Invest in your child&apos;s future today</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition ${
                  pkg.popular ? 'ring-4 ring-green-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-green-500 text-white text-center py-2 font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.label}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">GH₵{pkg.price}</span>
                    <span className="text-gray-500 ml-2">/ {pkg.quantity} bottle{pkg.quantity > 1 ? 's' : ''}</span>
                  </div>
                  {pkg.save && (
                    <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block mb-4 font-semibold text-sm">
                      Save GH₵{pkg.save}!
                    </div>
                  )}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-gray-500 ">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{pkg.quantity} bottle{pkg.quantity > 1 ? 's' : ''} of Forever Arctic Sea</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-500">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Free nationwide delivery</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-500">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>30-day supply per bottle</span>
                    </li>
                  </ul>
                  <a
                    onClick={() => handleOrderNow(pkg)}
                    className={`block w-full text-center py-4 rounded-lg font-bold text-lg transition cursor-pointer ${
                      pkg.popular 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Contact & Locations */}
<section className="py-20 bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <div className="space-y-4">
          <a
            href="mailto:supplegenix@gmail.com"
            className="flex items-center gap-3 hover:text-green-400 transition"
          >
            <Mail className="w-6 h-6" />
            <span className="text-lg">supplegenix@gmail.com</span>
          </a>

          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 flex-shrink-0" />
            <div>
              <div className="font-bold mb-2">Our Offices:</div>
              <div className="text-gray-300">
                📍 Accra<br />
                📍 Kumasi<br />
                📍 Tamale<br />
                <span className="text-green-400 font-semibold">
                  We deliver nationwide!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Socials Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex items-center gap-4">
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@evergreenremedyghana?_t=ZM-90WhVxvGppY&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black p-3 rounded-full hover:scale-110 transition-transform"
          >
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4v-2.22c0-2.37 1.4-3.68 3.55-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.45v1.96h2.59l-.41 2.9h-2.18v7.03c4.78-.75 8.44-4.91 8.44-9.93z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/233501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.6 13.3c-.3-.2-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1.1-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.8-.7-1.4-1.5-1.6-1.8-.2-.3 0-.4.1-.6.1-.1.3-.4.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s1 2.4 1.1 2.6c.1.2 2 3.1 4.8 4.4.7.3 1.3.6 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.1-1.3-.1-.1-.3-.2-.5-.3zM12.1 2C6.5 2 2 6.4 2 12c0 2 .5 3.8 1.4 5.3L2 22l4.9-1.3c1.5.8 3.2 1.2 5 1.2 5.6 0 10.1-4.4 10.1-10S17.7 2 12.1 2z" />
            </svg>
          </a>
        </div>

        <p className="text-gray-400 mt-6">
          Watch testimonials, product demos and educational content about child
          brain health!
        </p>
      </div>
    </div>

    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
      <p>© 2025 Evergreen Remedy Ghana. All rights reserved.</p>
    </div>
  </div>
</section>

      {/* Floating CTA Button */}
      {!showCheckout && (
        <a
          href="#pricing"
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition transform hover:scale-110 z-40"
        >
          <ShoppingCart className="w-6 h-6" />
        </a>
      )}
      </div>
      )}
    </div>
  );
};

export default EvergreenRemedyWebsite;