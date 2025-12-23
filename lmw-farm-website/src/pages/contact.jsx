import { useState } from 'react';
import FarmMap from '../components/FarmMap';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: 'Fresh Eggs',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    // Combine interested in and message
    const fullMessage = `Interested in: ${formData.interestedIn}\n\n${formData.message || 'No additional message provided.'}`;
    
    try {
      const response = await fetch('https://lmw-farm-backend-production.up.railway.app/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: fullMessage
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interestedIn: 'Fresh Eggs', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.detail || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Connection error. Please try again or email us directly.');
    }
  };

  return (
    <>
      {status === 'success' && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mb-4">
          <p className="text-green-800 font-semibold">✅ Message sent! We'll get back to you within 24 hours.</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-800 font-semibold">❌ {errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Your Name *</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email Address *</label>
          <input 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <input 
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">I'm Interested In *</label>
          <select 
            value={formData.interestedIn}
            onChange={(e) => setFormData({...formData, interestedIn: e.target.value})}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
          >
            <option>Fresh Eggs</option>
            <option>Baby Chicks</option>
            <option>Subscription Service</option>
            <option>Farm Visit</option>
            <option>General Question</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Message (Optional)</label>
          <textarea 
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
            placeholder="Tell us more about your inquiry..."
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : '📤 Send Message'}
        </button>
      </form>
    </>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      
      {/* Header Section - FULL WIDTH */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            📞 Get in Touch
          </h1>
          <p className="text-xl md:text-2xl">
            We'd love to hear from you! Questions about eggs, chicks, or farm visits? Reach out!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Main Content - Two Columns */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Left Column - Contact Form */}
<div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-800">
  <h2 className="text-3xl font-bold mb-6 text-teal-800">Send Us a Message</h2>
  
  <ContactForm />
</div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            
            {/* Email */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-teal-800">Email Us</h3>
                  <p className="text-lg text-gray-700">info@lmw-farm.com</p>
                  <p className="text-sm text-gray-600">Response within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h3 className="text-xl font-bold text-teal-800">Call or Text</h3>
                  <p className="text-lg text-gray-700">(336)-488-3742</p>
                  <p className="text-sm text-gray-600">9 AM - 6 PM Daily</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
              <div className="flex items-center gap-4">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="text-xl font-bold text-teal-800">Farm Location</h3>
                  <p className="text-lg text-gray-700">Mount Airy, NC</p>
                  <p className="text-sm text-gray-600">Visits by appointment only</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
              <div className="flex items-center gap-4">
                <div className="text-4xl">⏰</div>
                <div>
                  <h3 className="text-xl font-bold text-teal-800">Farm Hours</h3>
                  <p className="text-lg text-gray-700">Dawn to Dusk</p>
                  <p className="text-sm text-gray-600">7 days a week</p>
                </div>
              </div>
            </div>

          </div>
        </div>

     {/* Separator Line */}
<div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
  <div className="container mx-auto px-4">
    <div className="border-t-2 border-teal-600 mx-8"></div>
  </div>
</div>

  {/* Farmers Market Schedule 2026 */}
<div className="max-w-6xl mx-auto mb-12">
  <h2 className="text-4xl font-bold text-center mb-8 text-teal-800">🌾 2026 Farmers Market Schedule</h2>
  <p className="text-center text-lg mb-8 text-gray-700">Find us at these local markets starting Spring 2026!</p>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Mount Airy Farmers Market</h3>
      <p className="text-lg mb-2"><strong>When:</strong> Fridays, 9:00 AM - 12:00 PM</p>
      <p className="text-lg mb-2"><strong>Where:</strong> 232 W. Independence Blvd., Mount Airy, NC</p>
      <p className="text-lg mb-2"><strong>Season:</strong> April - September</p>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Dobson Farmers Market</h3>
      <p className="text-lg mb-2"><strong>When:</strong> Fridays, 3:00 PM - 6:00 PM</p>
      <p className="text-lg mb-2"><strong>Where:</strong> 903 East Atkins Street, Dobson, NC</p>
      <p className="text-lg mb-2"><strong>Season:</strong> May - September</p>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
      <h3 className="text-2xl font-bold text-green-700 mb-4">King Farmers Market</h3>
      <p className="text-lg mb-2"><strong>When:</strong> Wednesdays, 11 AM - 1 PM</p>
      <p className="text-lg mb-2"><strong>Where:</strong> 105 Moore Road, King, NC</p>
      <p className="text-lg mb-2"><strong>Season:</strong> April - October</p>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Elkin Farmers Market</h3>
      <p className="text-lg mb-2"><strong>When:</strong> Saturdays, 9 AM - 12 PM</p>
      <p className="text-lg mb-2"><strong>Where:</strong> 226 North Bridge St., Elkin, NC</p>
      <p className="text-lg mb-2"><strong>Season:</strong> April - October</p>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
      <h3 className="text-2xl font-bold text-green-700 mb-4">Pilot Mountain Market</h3>
      <p className="text-lg mb-2"><strong>When:</strong> Saturdays, 3 PM - 6 PM</p>
      <p className="text-lg mb-2"><strong>Where:</strong> 300 South Key St., Pilot Mountain, NC</p>
      <p className="text-lg mb-2"><strong>Season:</strong> April - October</p>
    </div>
  </div>
</div>

{/* Separator Line */}
<div className="bg-gradient-to-r from-orange-50 to-orange-100 py-2">
  <div className="container mx-auto px-4">
    <div className="border-t-2 border-teal-600 mx-8"></div>
  </div>
</div>

        {/* Interactive Map */}
<div className="max-w-6xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-8 text-teal-800">📍 Our Service Area</h2>
  
  <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-800">
    <p className="text-center text-gray-600 text-lg mb-6">
      Find us throughout Surry County at farmers markets and pickup locations
    </p>
    
    <FarmMap />
    
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div>
        <h4 className="font-bold text-lg text-teal-800 mb-3">📍 Active Locations:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Mount Airy Farmers Market</strong><br/>232 W. Independence Blvd. (Fridays AM)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>Dobson Farmers Market</strong><br/>903 East Atkins Street (Fridays PM)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span><strong>LMW Farm</strong><br/>Mount Airy, NC (By Appointment)</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg text-orange-700 mb-3">🚀 Coming Soon:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">○</span>
            <span><strong>Mayberry Mall</strong><br/>388 Frederick Street, Mount Airy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">○</span>
            <span><strong>Mount Airy Library</strong><br/>145 Rockford Street, Mount Airy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">○</span>
            <span><strong>Pilot Mountain Library</strong><br/>319 W. Main Street, Pilot Mountain</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">○</span>
            <span><strong>Surry Community College</strong><br/>612 E. Main Street, Pilot Mountain</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default Contact;