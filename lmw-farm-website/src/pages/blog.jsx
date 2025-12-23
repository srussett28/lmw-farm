import { useState } from 'react';
import visionImage from '../assets/vision.jpg';
import chickensImage from '../assets/chickens.jpg';
import eggsImage from '../assets/eggs.jpg';



function BlogNewsletterSignup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://lmw-farm-backend-production.up.railway.app/newsletter/subscribe', {
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
    <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-800 text-center">
      <h3 className="text-3xl font-bold text-teal-800 mb-4">📬 Never Miss a Post</h3>
      <p className="text-gray-700 mb-6">
        Subscribe to get farm updates, chicken-keeping tips, and stories delivered to your inbox.
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
        <div className="flex gap-4">
          <input 
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none"
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition whitespace-nowrap disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Blog() {
  // Placeholder blog posts - we'll replace with real content
  const posts = [
    {
      id: 1,
      title: "Welcome to LMW Farm",
      date: "October 20, 2025",
      author: "LMW Farm Team",
      category: "Farm Updates",
      excerpt: "Join us as we begin our journey of sustainable farming, fresh eggs, and building a legacy for our daughters...",
      image: visionImage,
      featured: true
    },
    {
      id: 2,
      title: "Building Our Flock: Why We Chose 14 Heritage Breeds",
      date: "October 15, 2025",
      author: "LMW Farm Team",
      category: "Chickens",
      excerpt: "From Australorps to Olive Eggers, learn about the carefully selected breeds that make up our diverse flock...",
      image: chickensImage,
      featured: false
    },
    {
      id: 3,
      title: "What Makes Our Eggs Different",
      date: "October 10, 2025",
      author: "LMW Farm Team",
      category: "Products",
      excerpt: "Fresh, pasture-raised, and collected three times daily. Discover what sets LMW Farm eggs apart...",
      image: eggsImage,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      
      {/* Header Section - FULL WIDTH */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            📝 Farm Journal
          </h1>
          <p className="text-xl md:text-2xl">
            Stories from the farm, tips for backyard chicken keepers, and our journey building LMW Farm
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Categories */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 transition">
              All Posts
            </button>
            <button className="px-6 py-2 bg-white text-teal-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-teal-700">
              Farm Updates
            </button>
            <button className="px-6 py-2 bg-white text-teal-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-teal-700">
              Chickens
            </button>
            <button className="px-6 py-2 bg-white text-teal-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-teal-700">
              Products
            </button>
            <button className="px-6 py-2 bg-white text-teal-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-teal-700">
              Tips & Advice
            </button>
          </div>
        </div>


        {/* Featured Post */}
        {posts.filter(post => post.featured).map(post => (
          <div key={post.id} className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl border-2 border-blue-800">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                    <span className="px-4 py-1 bg-teal-100 text-teal-800 text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-teal-800 mb-4">{post.title}</h2>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">{post.author}</span> • {post.date}
                  </p>
                  <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
                  <button className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition">
                    Read Full Story →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Recent Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-800 mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {posts.filter(post => !post.featured).map(post => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-800 hover:shadow-xl transition">
                {post.image ? (
  <img 
    src={post.image} 
    alt={post.title} 
    className="w-full aspect-video object-cover object-center"
  />
) : (
  <div className="w-full aspect-video bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
    <span className="text-5xl">📝</span>
  </div>
)}
                <div className="p-6">
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold text-teal-800 mt-4 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.author} • {post.date}
                  </p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <button className="text-teal-700 font-semibold hover:text-teal-800 transition">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
<div className="max-w-4xl mx-auto mt-16">
  <BlogNewsletterSignup />
</div>

      </div>
    </div>
  );
}

export default Blog;