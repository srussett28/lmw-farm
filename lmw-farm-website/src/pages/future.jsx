function FuturePlans() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our 5-Year Vision</h1>
            <p className="text-2xl font-serif italic text-teal-100">
              "See it in your mind, believe it in your heart, build it with your hands"
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area with Orange Background */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Vision Statement */}
          <section className="py-16">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-800">
              <h2 className="text-4xl font-bold mb-6 text-teal-800 text-center">🎯 Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We want to show mid-size farming can work in today's world by blending old school wisdom 
                and practice with modern tools and data. Our goal is to grow the farm to somewhere between 
                80-100 acres over the next 10 years, building a farm model that combines the hands-on care 
                approach with data-driven decision making.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My background helps with this vision; I have a master's degree in Business Analytics from 
                Duke University and spent years making data-driven decisions at major companies. I have seen 
                firsthand the impact technology, tools, and analytics can have on an operation when implemented 
                correctly. Now we aim to apply the same principles when thinking and executing farm operations. 
                Beyond running LMW Farm, it's our hope to help farmers seeking to integrate modern operations 
                to their farm without losing the heart of their craft.
              </p>
            </div>
          </section>

          {/* Separator Line */}
          <div className="py-2">
            <div className="border-t-2 border-teal-600 mx-8"></div>
          </div>

          {/* Current State */}
          <section className="py-16">
            <h2 className="text-4xl font-bold mb-8 text-center text-teal-800">📍 Where We Are Today</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-4xl mb-3 text-center">🏞️</div>
                <h3 className="text-2xl font-bold mb-3 text-teal-700 text-center">Property</h3>
                <p className="text-gray-700 text-center">42 acres in Mount Airy, NC with natural creeks, diverse terrain, and excellent pasture</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-4xl mb-3 text-center">🏗️</div>
                <h3 className="text-2xl font-bold mb-3 text-teal-700 text-center">Infrastructure</h3>
                <p className="text-gray-700 text-center">10,000+ sq ft egg production area with 4 coops plus dedicated breeding pens</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-4xl mb-3 text-center">🐔</div>
                <h3 className="text-2xl font-bold mb-3 text-teal-700 text-center">Current Flock</h3>
                <p className="text-gray-700 text-center">125 birds across multiple heritage and production breeds</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-4xl mb-3 text-center">🥚</div>
                <h3 className="text-2xl font-bold mb-3 text-teal-700 text-center">Production</h3>
                <p className="text-gray-700 text-center">Currently producing 2 dozen eggs daily, expected to scale significantly in coming months</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800">
              <h3 className="text-2xl font-bold mb-4 text-center text-orange-700">🌈 Our Heritage Breeds</h3>
              <div className="grid md:grid-cols-2 gap-3 text-gray-700 text-lg">
                <div>• <strong>Black Copper Marans:</strong> Dark chocolate brown eggs</div>
                <div>• <strong>Cream Legbar:</strong> Blue eggs, auto-sexing breed</div>
                <div>• <strong>Barred Plymouth Rock:</strong> Light brown eggs, hardy classic</div>
                <div>• <strong>Ameraucana:</strong> Blue/green eggs, customer favorite</div>
              </div>
            </div>
          </section>

          {/* Separator Line */}
          <div className="py-2">
            <div className="border-t-2 border-teal-600 mx-8"></div>
          </div>

          {/* 5-Year Roadmap */}
          <section className="py-16">
            <h2 className="text-4xl font-bold mb-12 text-center text-teal-800">🗺️ 5-Year Strategic Roadmap</h2>
            
            {/* Year 1 */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-800">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  1
                </div>
                <h3 className="text-3xl font-bold text-teal-800">Year 1 (2025-2026): Infrastructure & Professionalization</h3>
              </div>
              
              <p className="text-xl font-semibold mb-6 text-center text-gray-700 bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg">
                Mission: Get commercial operations out of our home, scale flock to full capacity, launch e-commerce platforms, and establish professional standards.
              </p>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-orange-700 mb-3 flex items-center">
                    <span className="mr-2">🐔</span> Chicken Operations
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Scale to 200 hens + 10-12 roosters</li>
                    <li>100 laying hens for table egg production</li>
                    <li>100 breeding hens across 4 heritage breeds for chick production</li>
                    <li>Increase production from 2 dozen/day to 12-14 dozen/day</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-teal-700 mb-3 flex items-center">
                    <span className="mr-2">🏗️</span> Critical Infrastructure Investment
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Build dedicated egg & hatchery facility</li>
                    <li>Professional egg washing, candling, and packaging setup</li>
                    <li>Install two incubators for chick production capability</li>
                    <li>Separate commercial operations from residential space for food safety compliance</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-blue-700 mb-3 flex items-center">
                    <span className="mr-2">💻</span> Digital Presence
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Launch professional e-commerce website (November 2025)</li>
                    <li>Online ordering for eggs, chicks, and farm products</li>
                    <li>Customer subscription management system</li>
                    <li>Educational content and farm blog</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-green-700 mb-3 flex items-center">
                    <span className="mr-2">📋</span> Regulatory Compliance
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Register with NCDA&CS for egg sales permit</li>
                    <li>Enroll in NPIP certification program for chick sales</li>
                    <li>Establish food safety protocols and documentation</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-purple-700 mb-3 flex items-center">
                    <span className="mr-2">📊</span> Year 1 Success Metrics
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Egg & hatchery building completed and operational by Q1 2026</li>
                    <li>Website launched with full e-commerce functionality</li>
                    <li>First successful chick hatch in Spring 2026</li>
                    <li>Consistent farmers market attendance with growing customer base</li>
                    <li>Positive cash flow achieved by Q4 2026</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Year 2 */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-800">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  2
                </div>
                <h3 className="text-3xl font-bold text-teal-800">Year 2 (2026-2027): Crop Diversification</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-green-700 mb-3 flex items-center">
                    <span className="mr-2">🌱</span> New Revenue Streams
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Clear 2 acres for greenhouses and crop production</li>
                    <li>Build greenhouse for fresh herbs and spices (basil, oregano, rosemary, sage, thyme, dill, cilantro, chives, garlic, parsley)</li>
                    <li>Prepare blueberry field with proper fencing and soil treatment</li>
                    <li>Plant 250 mature blueberry bushes</li>
                    <li>Establish 5-10 bee hives for honey production and pollination</li>
                    <li>Continue growing chicken operations with established revenue</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Year 3 */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-800">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  3
                </div>
                <h3 className="text-3xl font-bold text-teal-800">Year 3 (2027-2028): Highland Cattle Launch</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-blue-700 mb-3 flex items-center">
                    <span className="mr-2">🐄</span> Adding Livestock
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>All existing operations (chickens, herbs, blueberries, bees) hitting positive cash flow</li>
                    <li>Assess and upgrade 15-20 acre field for Highland cattle</li>
                    <li>Acquire 5 heifers + 1 bull from local breeder</li>
                    <li>Grow herd to 12 head through calving and selective purchases</li>
                    <li>First blueberry harvest (1,000+ lbs)</li>
                    <li>Expand bee operation to 10-15 hives</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Year 4 */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-800">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  4
                </div>
                <h3 className="text-3xl font-bold text-teal-800">Year 4 (2028-2029): Dairy Infrastructure & Optimization</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-purple-700 mb-3 flex items-center">
                    <span className="mr-2">🧈</span> Value-Added Products
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Construct 60×40 metal barn with hay storage, cattle shelter, and milking/dairy sections</li>
                    <li>Install milking equipment and dairy processing setup</li>
                    <li>Launch butter production (cultured, sea salt, herb varieties)</li>
                    <li>Begin specialty cheese production (fresh and aged varieties)</li>
                    <li>Calf sales operational</li>
                    <li>Comprehensive business assessment to optimize operations</li>
                    <li>Implement farm management software and IoT sensors for data-driven decisions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Year 5 */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-800">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4 shadow-lg">
                  5
                </div>
                <h3 className="text-3xl font-bold text-teal-800">Year 5 (2029-2030): Retail Expansion & Market Dominance</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-rose-50 to-rose-100 p-6 rounded-lg">
                  <h4 className="font-bold text-2xl text-rose-700 mb-3 flex items-center">
                    <span className="mr-2">🏪</span> Complete Product Portfolio
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 text-lg">
                    <li>Launch farm store/co-op for full product line</li>
                    <li>Install egg vending machines at high-traffic locations for 24/7 sales</li>
                    <li>Full product lineup: eggs, chicks, butter, cheese, blueberries, honey, herbs, calves</li>
                    <li>Highland cattle herd stable at 12-15 head with consistent calf sales</li>
                    <li>Multi-channel sales: farm store, vending machines, website, farmers markets, wholesale accounts</li>
                    <li>Establish ourselves as regional leader in artisanal farm products</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Separator Line */}
          <div className="py-2">
            <div className="border-t-2 border-teal-600 mx-8"></div>
          </div>

          {/* Beyond Year 5 */}
          <section className="py-16">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-800">
              <h2 className="text-4xl font-bold mb-6 text-center text-teal-800">🚀 Beyond Year 5: Long-Term Vision</h2>
              <p className="text-xl text-gray-700 mb-6 text-center">
                Once we've built this foundation, LMW Farm will be positioned for even more growth and impact:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg flex items-start">
                  <span className="text-teal-600 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700 text-lg"><strong>Expand to 80-100 acres</strong> as we've envisioned from the beginning</span>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg flex items-start">
                  <span className="text-teal-600 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700 text-lg"><strong>Add other livestock operations</strong> (potentially goats for dairy/fiber)</span>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg flex items-start">
                  <span className="text-teal-600 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700 text-lg"><strong>Develop agritourism offerings</strong> (workshops, farm tours, seasonal events)</span>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg flex items-start">
                  <span className="text-teal-600 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700 text-lg"><strong>Create educational programs</strong> for beginning farmers</span>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg flex items-start col-span-full">
                  <span className="text-teal-600 mr-3 text-2xl">✓</span>
                  <span className="text-gray-700 text-lg"><strong>Serve as a case study</strong> demonstrating how technology and traditional agriculture can work together</span>
                </div>
              </div>
            </div>
          </section>

          {/* Separator Line */}
          <div className="py-2">
            <div className="border-t-2 border-teal-600 mx-8"></div>
          </div>

          {/* What Makes This Work */}
          <section className="py-16">
            <h2 className="text-4xl font-bold mb-8 text-center text-teal-800">💪 What Makes This Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="font-bold text-xl text-blue-700 mb-3">Data-Driven Decisions</h3>
                <p className="text-gray-700">Applying analytics expertise to farming for better outcomes</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-xl text-blue-700 mb-3">Phased Growth</h3>
                <p className="text-gray-700">Each year builds on the last, keeping risk manageable</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">🌾</div>
                <h3 className="font-bold text-xl text-blue-700 mb-3">Diversification</h3>
                <p className="text-gray-700">Multiple revenue streams reduce risk and maximize profit</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="font-bold text-xl text-blue-700 mb-3">Heritage & Quality</h3>
                <p className="text-gray-700">Premium products command premium prices</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="font-bold text-xl text-blue-700 mb-3">Technology Integration</h3>
                <p className="text-gray-700">Modern tools make us more efficient without losing what makes farming special</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-800 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-bold text-xl text-blue-700 mb-3">Community Support</h3>
                <p className="text-gray-700">Strong relationships with Extension, local suppliers, and customer base</p>
              </div>
            </div>
          </section>

          {/* Separator Line */}
          <div className="py-2">
            <div className="border-t-2 border-teal-600 mx-8"></div>
          </div>

          {/* Final Thoughts */}
          <section className="py-16">
            <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white rounded-xl shadow-lg p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">Our Commitment</h2>
              <p className="text-xl leading-relaxed mb-6">
                LMW Farm represents the fusion of heritage agriculture and modern innovation. Named after 
                our children Lundyn, Marlow, and Winnie—this farm is our commitment to providing the highest 
                quality food for our family and community.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                From 8 chickens and a vision in early 2025, to 125 birds actively producing today, to a 
                diversified operation by 2030—LMW Farm is building a model for the next generation of 
                American agriculture.
              </p>
              <p className="text-2xl font-bold italic text-teal-100">
                "Together, we're building a future where agriculture is as innovative as it is meaningful."
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default FuturePlans;