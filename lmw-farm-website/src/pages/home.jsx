import { useState } from 'react';
import lmwlogo from '/src/assets/lmw-logo.jpg';
import eggs from '/src/assets/eggs.jpg'; 
import chicks from "/src/assets/chicks.jpg";

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://lmw-farm-backend-production.up.railway.app/newsletter/subscribe',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: firstName })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
        setFirstName('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center border-4 border-orange-500 rounded-2xl p-8 bg-white shadow-xl">
      <h2 className="text-5xl font-bold text-orange-600 mb-4">🚀 COMING SOON!</h2>
      <p className="text-2xl text-orange-700 font-semibold mb-4">
        We're launching Spring 2026 with fresh farm eggs and baby chicks!
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Currently building our flock and preparing for launch. Be the first to know when fresh eggs and baby chicks become available!
      </p>
      
      {status === 'success' && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mb-4">
          <p className="text-green-800 font-semibold">{message}</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-800 font-semibold">{message}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="First Name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:border-teal-600 focus:outline-none"
        />
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:border-teal-600 focus:outline-none"
        />
        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-teal-700 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-teal-800 transition shadow-lg disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Join the Launch List'}
        </button>
      </form>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
<section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto text-center">
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-bold mb-3">
        Welcome to LMW Farm
      </h1>
      
      {/* Veteran Owned Badge */}
<p className="text-2xl md:text-3xl font-bold text-blue-200 mb-8">
  Proudly Veteran Owned & Operated Since 2025
</p>
      
  
      {/* Logo and Tagline Side by Side */}
      <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
        {/* Logo */}
        <div className="text-center">
          <img 
            src={lmwlogo} 
            alt="LMW Farm Logo" 
            className="w-[26rem] h-[26rem] rounded-lg shadow-2xl mx-auto"
          />
        </div>
        
        {/* Content */}
        <div className="text-center md:text-left max-w-xl">
          <p className="text-3xl md:text-4xl font-serif italic mb-6 leading-tight">
            Fresh Farm Eggs & Premium Baby Chicks
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="/about" className="bg-white text-teal-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg">
              Our Story
            </a>
            <a href="/contact" className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition shadow-lg">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Coming Soon Alert */}
{/* Coming Soon Alert */}
<section className="py-8 bg-gradient-to-r from-orange-50 to-orange-100">
  <div className="container mx-auto px-4">
    <NewsletterSignup />
  </div>
</section>

   

      {/* Separator Line */}
<div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
  <div className="container mx-auto px-4">
    <div className="border-t-2 border-teal-600 mx-8"></div>
  </div>
</div>

      {/* Fresh From Our Farm */}
<section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-teal-800">🏡 Fresh From Our Farm</h2>
    
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      
      {/* Fresh Farm Eggs with Photo */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-800">
        <img 
          src={eggs}  
          alt="Fresh Farm Eggs" 
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h3 className="text-3xl font-semibold text-center text-green-800 mb-4">🥚 Fresh Farm Eggs</h3>
          <ul className="space-y-2 text-lg">
            <li><strong>Grade AA Quality</strong> - Candled and inspected daily</li>
            <li><strong>Rainbow Dozens</strong> - Blue, brown, green, white eggs</li>
            <li><strong>Free-Range Happy</strong> - 10+ sq ft per bird on pasture</li>
            <li><strong>14 Heritage Breeds</strong> - Unique variety and flavors</li>
            <li><strong>Collected Fresh</strong> - Never more than 3 days old</li>
          </ul>
        </div>
      </div>

      {/* Premium Baby Chicks with Photo */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-800">
        <img 
          src={chicks}
          alt="Premium Baby Chicks" 
          className="w-full h-80 object-cover object-cover"
        />
        <div className="p-6">
          <h3 className="text-3xl font-semibold text-center text-orange-700 mb-4">🐣 Premium Baby Chicks</h3>
          <ul className="space-y-2 text-lg">
            <li><strong>4 Select Breeds</strong> - Carefully selected varieties</li>
            <li><strong>Healthy & Hardy</strong> - Raised on pasture from day one</li>
            <li><strong>Spring Availability</strong> - Perfect timing for backyard flocks</li>
            <li><strong>Heritage Varieties</strong> - Unique colors and egg types</li>
            <li><strong>Expert Support</strong> - We help you succeed</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>
      
      {/* Separator Line */}
<div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
  <div className="container mx-auto px-4">
    <div className="border-t-2 border-teal-600 mx-8"></div>
  </div>
</div>

{/* Why LMW Farm Section */}
<section className="py-12 bg-gradient-to-r from-orange-50 to-orange-100">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-10 text-teal-800">🌟 The LMW Difference</h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      
      {/* Sustainable */}
      <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="text-5xl mb-4">🌱</div>
        <h3 className="text-2xl font-bold mb-3 text-green-700">Sustainable</h3>
        <p className="text-gray-700">
          Regenerative farming practices that improve the land for future generations while producing the healthiest food.
        </p>
      </div>

      {/* Community-Focused */}
      <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="text-5xl mb-4">🏡</div>
        <h3 className="text-2xl font-bold mb-3 text-blue-700">Community-Focused</h3>
        <p className="text-gray-700">
          Building relationships through local food. Know your farmer, see where your food comes from, support your neighbors.
        </p>
      </div>

      {/* Humane Practices */}
      <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="text-5xl mb-4">🐔</div>
        <h3 className="text-2xl font-bold mb-3 text-orange-700">Humane Practices</h3>
        <p className="text-gray-700">
          Our birds have space to roam, forage naturally, and live as chickens should. Happy chickens lay better eggs.
        </p>
      </div>
      </div>
  </div>
</section>

      {/* Separator Line */}
<div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
  <div className="container mx-auto px-4">
    <div className="border-t-2 border-teal-600 mx-8"></div>
  </div>
</div>

      {/* Progress Metrics */}
<section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-teal-800">📊 Our Progress to Launch</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="text-4xl mb-2">🐔</div>
              <div className="text-3xl font-bold text-teal-800 mb-2">130</div>
              <div className="text-sm font-semibold text-gray-700">Current Chickens</div>
              <div className="text-xs text-green-600 mt-1">Growing daily</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-green-800 mb-2">150+</div>
              <div className="text-sm font-semibold text-gray-700">Launch Goal</div>
              <div className="text-xs text-green-600 mt-1">Egg layers</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="text-4xl mb-2">📅</div>
              <div className="text-2xl font-bold text-blue-800 mb-2">Spring 2026</div>
              <div className="text-sm font-semibold text-gray-700">Target Launch</div>
              <div className="text-xs text-blue-600 mt-1">3-6 months</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="text-4xl mb-2">📍</div>
              <div className="text-2xl font-bold text-purple-800 mb-2">Surry County</div>
              <div className="text-sm font-semibold text-gray-700">Service Area</div>
              <div className="text-xs text-purple-600 mt-1">NC Triad</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;