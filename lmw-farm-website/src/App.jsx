function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">LMW Farm</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to LMW Farm
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Fresh, local, sustainable farming in North Carolina.
          </p>
          <button className="bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition">
            Learn More
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 LMW Farm LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;