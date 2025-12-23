import { useState } from 'react';

function Animals() {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [activeTab, setActiveTab] = useState('layers');

  // Complete breed data from your Streamlit app
  const breedData = {
    layers: {
      "Australorps": {
        count: 12,
        eggColor: "Brown",
        temperament: "Docile",
        image: "/src/assets/australorp.jpg",
        description: "Known as one of the world's best laying breeds, Australorps are calm, friendly birds that consistently produce large brown eggs. They're excellent foragers and handle confinement well.",
        whyChosen: "We chose Australorps for their incredible laying ability and gentle nature around our daughters. They're perfect for families and produce beautiful, consistent brown eggs.",
        specialNotes: "Excellent layers, can lay 250+ eggs per year"
      },
      "Rhode Island Reds": {
        count: 10,
        eggColor: "Brown",
        temperament: "Hardy",
        image: "/src/assets/reds.jpg",
        description: "Classic American breed known for excellent egg production and hardiness. These reliable birds are excellent foragers and consistently productive layers.",
        whyChosen: "These are the backbone of our brown egg production. Reliable, hardy, and consistently productive - exactly what a farm needs.",
        specialNotes: "Great foragers, consistent production"
      },
      "Golden Comets": {
        count: 8,
        eggColor: "Brown",
        temperament: "Friendly",
        image: "/src/assets/comet.jpg",
        description: "A hybrid breed developed for commercial egg production. Known for their exceptional laying ability and friendly disposition.",
        whyChosen: "These girls are egg-laying machines! They start laying early and produce consistently throughout the year.",
        specialNotes: "Early layers, high production"
      },
      "Olive Eggers": {
        count: 6,
        eggColor: "Olive Green",
        temperament: "Calm",
        image: "/src/assets/eggers.jpg",
        description: "A hybrid breed created by crossing dark brown egg layers with blue egg layers, resulting in beautiful olive-colored eggs. Calm, productive layers.",
        whyChosen: "The olive green eggs are incredible for our rainbow dozens. Customers are always amazed by the unique color.",
        specialNotes: "Unique olive green eggs, great for rainbow dozens"
      },
      "Starlight Green Eggers": {
        count: 5,
        eggColor: "Green",
        temperament: "Friendly",
        image: "/src/assets/starlight.jpg",
        description: "A newer breed development that consistently lays green eggs. Friendly, productive birds that add beautiful color variety to egg collections.",
        whyChosen: "Another green egg variety that helps us create those stunning rainbow dozen collections that customers love.",
        specialNotes: "Rare green eggs, consistent layers"
      },
      "Jersey Giants": {
        count: 4,
        eggColor: "Brown",
        temperament: "Gentle",
        image: "/src/assets/jerseys.jpg",
        description: "America's largest chicken breed! These gentle giants are calm, friendly birds that lay large brown eggs. Despite their size, they're excellent foragers.",
        whyChosen: "The kids love these gentle giants! They're incredibly calm and their extra-large eggs are perfect for baking.",
        specialNotes: "Largest chicken breed, extra-large eggs"
      },
      "Sapphire Gems": {
        count: 7,
        eggColor: "Brown",
        temperament: "Active",
        image: "/src/assets/gems.jpg",
        description: "A newer breed with beautiful blue-gray feathering. Active foragers that lay consistently and handle free-range life very well.",
        whyChosen: "Their beautiful blue-gray coloring caught our eye, and they're excellent free-range birds that fit perfectly with our farming style.",
        specialNotes: "Beautiful blue-gray feathers, excellent foragers"
      },
      "Cinnamon Queens": {
        count: 9,
        eggColor: "Brown",
        temperament: "Calm",
        image: "/src/assets/queens.jpg",
        description: "A hybrid breed known for exceptional egg production and beautiful reddish-brown feathering. Calm, productive birds that adapt well to various conditions.",
        whyChosen: "Their cinnamon-colored feathers are gorgeous, and they're incredibly productive layers that handle our climate well.",
        specialNotes: "Beautiful cinnamon coloring, high production"
      },
      "Barred Rocks": {
        count: 8,
        eggColor: "Brown",
        temperament: "Friendly",
        image: "/src/assets/barredrock.jpg",
        description: "Classic American breed known for their distinctive black and white striped feathers. Hardy, cold-resistant birds that are great for free-ranging.",
        whyChosen: "These girls are tough as nails and handle our North Carolina weather beautifully. The kids love their distinctive 'barred' pattern.",
        specialNotes: "Cold hardy, great for beginners"
      },
      "Buff Orpington": {
        count: 6,
        eggColor: "Brown",
        temperament: "Docile",
        image: "/src/assets/BO.jpg",
        description: "Known for their beautiful golden buff color and incredibly gentle nature. These fluffy birds are excellent mothers and consistent layers.",
        whyChosen: "The most gentle, cuddly chickens you'll ever meet! The girls love holding these sweet birds, and they're great with children.",
        specialNotes: "Extremely gentle, great with kids"
      },
      "Midnight Majestics": {
        count: 5,
        eggColor: "Brown",
        temperament: "Calm",
        image: "/src/assets/majesty.jpg",
        description: "A newer breed with striking dark plumage and excellent laying ability. Calm birds that adapt well to free-range environments.",
        whyChosen: "Their dramatic dark feathers make them stand out in the flock, and they're reliable layers with great temperaments.",
        specialNotes: "Striking dark plumage, reliable layers"
      },
      "Black Sex Link": {
        count: 7,
        eggColor: "Brown",
        temperament: "Active",
        image: "/src/assets/bsl.jpg",
        description: "A hybrid breed created by crossing specific breeds to create sex-linked chicks that can be sexed at hatching. Known for excellent egg production and hardiness.",
        whyChosen: "These girls are incredibly productive layers and the sex-linking trait made them easier to manage as chicks. They're reliable brown egg producers.",
        specialNotes: "Sex-linked breed, excellent production"
      },
      "Zombies (Legbar/Ayam Mix)": {
        count: 4,
        eggColor: "Blue/Green",
        temperament: "Unique",
        image: "/src/assets/zombie.jpg",
        description: "Our own designer mix combining Cream Legbar genetics with Ayam Cemani. These unique birds produce colorful eggs with interesting genetic combinations.",
        whyChosen: "This is our experimental breeding project turned production layer. We're working on developing our own unique line with interesting egg colors and patterns.",
        specialNotes: "Our custom breeding project, unique genetics"
      },
      "Barnyard Mixes": {
        count: 12,
        eggColor: "Mixed",
        temperament: "Varied",
        image: "/src/assets/barnyard.jpg",
        description: "Various mixed breed chickens that combine the best traits of multiple breeds. Each bird is unique with its own personality and egg characteristics.",
        whyChosen: "These girls represent the best of all worlds - hybrid vigor, unique appearances, and surprise egg colors. They're our 'wild cards.'",
        specialNotes: "Hybrid vigor, unique combinations"
      },
      "Prairie Bluebells": {
        count: 8,
        eggColor: "Brown",
        temperament: "Friendly",
        image: "/src/assets/bluebell.jpg",
        description: "A Czech breed developed for backyard egg production. Known for their beautiful coloring, docile temperament, and excellent laying ability in various climates.",
        whyChosen: "These beautiful birds caught our eye with their unique appearance and reputation as consistent layers. They're friendly, hardy, and adapt well to our free-range setup.",
        specialNotes: "Beautiful coloring, excellent cold tolerance"
      }
    },
    breeders: {
      "Black Copper Marans": {
        count: 9,
        eggColor: "Dark Brown/Chocolate",
        temperament: "Calm",
        image: "/src/assets/marans.jpg",
        description: "French breed famous for laying the darkest brown eggs of any chicken breed. The eggs are so dark they're often called 'chocolate eggs.'",
        whyChosen: "The chocolate-colored eggs are absolutely stunning and add incredible visual appeal to our rainbow dozens. Customers are blown away by how dark they are.",
        specialNotes: "Darkest brown eggs in the world"
      },
      "Americanas": {
        count: 12,
        eggColor: "Blue/Green",
        temperament: "Gentle",
        image: "/src/assets/jimbo.jpg",
        description: "Often called 'Easter Eggers,' these friendly birds lay eggs in various shades of blue and green. Each hen's eggs are a slightly different shade.",
        whyChosen: "The variety of blue and green shades makes every collection exciting. Perfect for our breeding program to maintain colorful egg genetics.",
        specialNotes: "Easter eggers, variety of blue/green shades"
      },
      "Barred Rock/Rustic Rock": {
        count: 14,
        eggColor: "Brown",
        temperament: "Friendly",
        image: "/src/assets/barredrock.jpg",
        description: "Classic American breed selected for breeding purposes. These birds carry excellent genetics for hardiness, productivity, and temperament.",
        whyChosen: "We're using these for our breeding program because of their proven genetics, hardiness, and excellent maternal instincts.",
        specialNotes: "Selected breeding stock, excellent mothers"
      },
      "Cream Legbars": {
        count: 21,
        eggColor: "Blue",
        temperament: "Active",
        image: "/src/assets/legbar.jpg",
        description: "A rare auto-sexing breed that lays beautiful blue eggs. Active foragers with a distinctive crest, they're excellent free-range birds.",
        whyChosen: "The blue eggs are stunning, and being auto-sexing makes breeding much easier. These are key to our blue egg genetics.",
        specialNotes: "Auto-sexing breed, rare blue eggs"
      }
    },
    bees: {
      "Honeybees": {
        count: "Coming 2026",
        product: "Raw Local Honey",
        temperament: "Busy",
        image: "/src/assets/hive.jpg",
        description: "Our honeybee colonies work tirelessly to pollinate our farm and produce delicious raw honey. Each hive contains thousands of workers supporting the farm ecosystem.",
        whyChosen: "Bees are essential for pollinating our gardens and crops. Plus, the raw honey they produce is a wonderful farm product. We're learning beekeeping to support both our farm's health and offer another local product.",
        specialNotes: "Pollinators for the farm, raw honey production"
      }
    },
    cattle: {
      "Scottish Highland Cattle": {
        count: "Coming 2026",
        product: "Breeding Stock",
        temperament: "Docile",
        image: "/src/assets/cow.jpg",
        description: "Scottish Highlands are an ancient breed known for their long horns, shaggy coats, and gentle temperament. Hardy and low-maintenance, they thrive on pasture and are excellent mothers.",
        whyChosen: "We're adding Scottish Highlands to diversify the farm and utilize our pastureland. Their gentle nature makes them safe around our daughters, and their hardiness fits our sustainable farming approach. Plus, they're absolutely beautiful!",
        specialNotes: "Heritage breed, excellent foragers, very photogenic"
      }
    },
    guardians: {
      "Norman - LGD": {
        count: 1,
        breed: "Livestock Guardian Dog",
        temperament: "Protective & Gentle",
        image: "/src/assets/norman.jpg",
        description: "Norman is our Livestock Guardian Dog who watches over the flock 24/7. He's trained to protect our chickens from predators while being gentle with the birds and our family.",
        whyChosen: "Predator protection is essential for free-range chickens. Norman takes his job seriously, patrolling the property and keeping our flock safe. He's both a working dog and a beloved family member.",
        specialNotes: "NOT FOR SALE - Essential farm security and family member"
      },
      "Leroy - CGD": {
        count: 1,
        breed: "Couch Guardian Dog",
        temperament: "Professional Napper",
        image: "/src/assets/leroy.jpg",
        description: "Leroy is our Couch Guardian Dog, specializing in keeping the sofa warm, testing all nap spots for comfort, and providing emotional support. His elite training includes advanced treat catching and selective hearing.",
        whyChosen: "Every farm needs balance. While Norman guards the chickens, Leroy guards the couch with equal dedication. He's the farm's morale officer and professional cuddle consultant.",
        specialNotes: "NOT FOR SALE - Critical couch security operations"
      }
    }
  };

  // Calculate totals
  const totalLayers = Object.values(breedData.layers).reduce((sum, breed) => sum + breed.count, 0);
  const totalBreeders = Object.values(breedData.breeders).reduce((sum, breed) => sum + breed.count, 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              🐔 Our Chickens & Breeds
            </h1>
            <p className="text-2xl md:text-3xl font-serif italic">
              Meet the feathered family behind your fresh eggs
            </p>
          </div>
        </div>
      </section>

      {/* Current Flock Summary */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-8 mb-8 border-2 border-teal-600 shadow-xl">
              <h2 className="text-4xl font-bold text-center text-teal-800 mb-6">
                Our Current Flock - {totalLayers + totalBreeders} Chickens
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border-2 border-blue-800 shadow-lg">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">🥚 Egg Layers</h3>
                  <p className="text-5xl font-bold text-green-700 my-4">{totalLayers}</p>
                  <p className="text-gray-700 text-lg">14 breeds producing fresh eggs daily</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center border-2 border-blue-800 shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-800 mb-2">🐣 Specialty Breeders</h3>
                  <p className="text-5xl font-bold text-orange-700 my-4">{totalBreeders}</p>
                  <p className="text-gray-700 text-lg">4 breeds for breeding & specialty eggs</p>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto">
              <button
                onClick={() => {
                  setActiveTab('layers');
                  setSelectedBreed(null);
                }}
                className={`px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  activeTab === 'layers'
                    ? 'bg-green-600 text-white border-4 border-green-800'
                    : 'bg-white text-green-700 border-2 border-blue-800 hover:bg-green-50'
                }`}
              >
                🥚 Egg Layers
                <div className="text-xs font-normal">{Object.keys(breedData.layers).length} breeds</div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('breeders');
                  setSelectedBreed(null);
                }}
                className={`px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  activeTab === 'breeders'
                    ? 'bg-orange-600 text-white border-4 border-orange-800'
                    : 'bg-white text-orange-700 border-2 border-blue-800 hover:bg-orange-50'
                }`}
              >
                🐣 Breeders
                <div className="text-xs font-normal">{Object.keys(breedData.breeders).length} breeds</div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('bees');
                  setSelectedBreed(null);
                }}
                className={`px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  activeTab === 'bees'
                    ? 'bg-yellow-500 text-white border-4 border-yellow-700'
                    : 'bg-white text-yellow-700 border-2 border-blue-800 hover:bg-yellow-50'
                }`}
              >
                🐝 Bees
                <div className="text-xs font-normal">Coming 2026</div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('cattle');
                  setSelectedBreed(null);
                }}
                className={`px-6 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  activeTab === 'cattle'
                    ? 'bg-amber-700 text-white border-4 border-amber-900'
                    : 'bg-white text-amber-700 border-2 border-blue-800 hover:bg-amber-50'
                }`}
              >
                🐄 Cattle
                <div className="text-xs font-normal">Coming 2026</div>
              </button>

            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'layers' && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-4 text-green-800">Our Production Layers</h3>
                  <p className="text-center text-gray-700 mb-6 text-lg">These girls are our egg-laying superstars, providing fresh eggs daily.</p>
                </div>
              )}
              {activeTab === 'breeders' && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-4 text-orange-800">Our Breeding & Specialty Birds</h3>
                  <p className="text-center text-gray-700 mb-6 text-lg">These special birds help us develop new lines and provide unique egg colors.</p>
                </div>
              )}
              {activeTab === 'bees' && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-4 text-yellow-700">🐝 Our Honeybees</h3>
                  <p className="text-center text-gray-700 mb-6 text-lg">Essential pollinators and producers of raw local honey.</p>
                </div>
              )}
              {activeTab === 'cattle' && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-4 text-amber-800">🐄 Scottish Highland Cattle</h3>
                  <p className="text-center text-gray-700 mb-6 text-lg">Coming in 2026 - Beautiful heritage breed cattle for sustainable grazing.</p>
                </div>
              )}
              {activeTab === 'guardians' && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-4 text-purple-800">🐕 Meet Our Farm Guardians</h3>
                  <p className="text-center text-gray-700 mb-6 text-lg">Norman protects the flock, Leroy protects the couch. Both are NOT FOR SALE!</p>
                </div>
              )}
            </div>

            {/* Breed Selection Grid */}
            <p className="text-center text-gray-600 mb-4 text-lg">👆 Click on any {activeTab === 'guardians' ? 'guardian' : activeTab === 'bees' ? 'hive' : activeTab === 'cattle' ? 'animal' : 'breed'} to learn more!</p>
            <div className={`grid gap-4 mb-8 ${
              activeTab === 'guardians' || activeTab === 'bees' || activeTab === 'cattle' 
                ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' 
                : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
            }`}>
              {Object.keys(breedData[activeTab]).map((breedName) => (
                <button
                  key={breedName}
                  onClick={() => setSelectedBreed(selectedBreed === breedName ? null : breedName)}
                  className={`p-6 rounded-xl text-center font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    selectedBreed === breedName
                      ? activeTab === 'layers' 
                        ? 'bg-green-600 text-white border-4 border-green-800'
                        : 'bg-orange-600 text-white border-4 border-orange-800'
                      : 'bg-white text-gray-800 border-2 border-blue-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-4xl mb-2">
  {activeTab === 'bees' ? '🐝' : activeTab === 'cattle' ? '🐄' : '🐔'}
</div>
                  <div className="text-sm leading-tight">{breedName}</div>
                </button>
              ))}
            </div>

            {/* Selected Breed Detail Display */}
            {selectedBreed && breedData[activeTab][selectedBreed] && (
              <div className={`rounded-xl p-8 mb-8 border-4 shadow-2xl ${
                activeTab === 'layers' 
                  ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-600'
                  : activeTab === 'breeders'
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-600'
                  : activeTab === 'bees'
                  ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-600'
                  : activeTab === 'cattle'
                  ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-700'
                  : 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-600'
              }`}>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Breed Image */}
                  <div>
                    <img 
                      src={breedData[activeTab][selectedBreed].image} 
                      alt={selectedBreed}
                      className="w-full h-96 object-cover rounded-xl shadow-xl border-4 border-white"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-xl border-4 border-white hidden items-center justify-center"
                    >
                      <div className="text-center">
                        <div className="text-8xl mb-4">
                          {activeTab === 'bees' ? '🐝' : activeTab === 'cattle' ? '🐄' : activeTab === 'guardians' ? '🐕' : '🐔'}
                        </div>
                        <div className="text-2xl text-gray-700 font-bold">{selectedBreed}</div>
                        <div className="text-lg text-gray-600">Photo coming soon!</div>
                      </div>
                    </div>
                  </div>

                  {/* Breed Details */}
                  <div>
                    <h3 className="text-4xl font-bold text-teal-800 mb-6">
                      {activeTab === 'bees' ? '🐝' : activeTab === 'cattle' ? '🐄' : activeTab === 'guardians' ? '🐕' : '🐔'} {selectedBreed}
                    </h3>
                    
                    {/* Key Stats - Different for each category */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-800 shadow-md">
                        <div className="text-sm text-gray-600 mb-1">
                          {activeTab === 'guardians' ? 'Status' : activeTab === 'bees' ? 'Hives' : 'Count'}
                        </div>
                        <div className="text-2xl font-bold text-teal-700">{breedData[activeTab][selectedBreed].count}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-800 shadow-md">
                        <div className="text-sm text-gray-600 mb-1">
                          {activeTab === 'guardians' ? 'Breed' : activeTab === 'bees' || activeTab === 'cattle' ? 'Product' : 'Egg Color'}
                        </div>
                        <div className="text-base font-bold text-teal-700">
                          {breedData[activeTab][selectedBreed].eggColor || breedData[activeTab][selectedBreed].product || breedData[activeTab][selectedBreed].breed}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-800 shadow-md">
                        <div className="text-sm text-gray-600 mb-1">Temperament</div>
                        <div className="text-base font-bold text-teal-700">{breedData[activeTab][selectedBreed].temperament}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-xl p-5 mb-4 border-2 border-blue-800 shadow-md">
                      <h4 className="font-bold text-teal-800 mb-3 text-xl">
                        📖 About {activeTab === 'guardians' ? selectedBreed.split(' - ')[0] : activeTab === 'bees' ? 'Our Bees' : 'This Breed'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{breedData[activeTab][selectedBreed].description}</p>
                    </div>

                    {/* Why We Chose Them */}
                    <div className="bg-white rounded-xl p-5 mb-4 border-2 border-blue-800 shadow-md">
                      <h4 className="font-bold text-teal-800 mb-3 text-xl">💚 Why {activeTab === 'guardians' ? "They're Part of the Family" : "We Chose Them"}</h4>
                      <p className="text-gray-700 leading-relaxed italic">{breedData[activeTab][selectedBreed].whyChosen}</p>
                    </div>

                    {/* Special Notes */}
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-4 shadow-md">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">⭐ Special Notes</h4>
                      <p className="text-gray-900 font-semibold">{breedData[activeTab][selectedBreed].specialNotes}</p>
                    </div>

                    {/* NOT FOR SALE banner for guardians */}
                    {activeTab === 'guardians' && (
                      <div className="mt-4 bg-red-100 border-4 border-red-600 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-red-800">🚫 NOT FOR SALE 🚫</p>
                        <p className="text-red-700 font-semibold">Family members only!</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedBreed(null)}
                  className={`mt-6 w-full px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-lg ${
                    activeTab === 'layers'
                      ? 'bg-green-600 hover:bg-green-700'
                      : activeTab === 'breeders'
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : activeTab === 'bees'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : activeTab === 'cattle'
                      ? 'bg-amber-700 hover:bg-amber-800'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  ✕ Close Details
                </button>
              </div>
            )}

            {/* Farm Operations Metrics */}
            <div className="mt-12 bg-white rounded-xl p-8 border-2 border-blue-800 shadow-xl">
              <h2 className="text-3xl font-bold text-center mb-8 text-teal-800">🐔 Our Growing Operation</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🐔</div>
                  <div className="text-3xl font-bold text-teal-700">107</div>
                  <div className="text-sm text-gray-600">Current Chickens</div>
                  <div className="text-xs text-green-600 mt-1">Various stages</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-3xl font-bold text-teal-700">100+</div>
                  <div className="text-sm text-gray-600">2025 Goal</div>
                  <div className="text-xs text-green-600 mt-1">Egg layers</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">🏞️</div>
                  <div className="text-3xl font-bold text-teal-700">10+ sq ft</div>
                  <div className="text-sm text-gray-600">Space per Bird</div>
                  <div className="text-xs text-green-600 mt-1">On Pasture</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">⏰</div>
                  <div className="text-3xl font-bold text-teal-700">3x daily</div>
                  <div className="text-sm text-gray-600">Collection Times</div>
                  <div className="text-xs text-green-600 mt-1">Maximum freshness</div>
                </div>
              </div>
            </div>

            {/* Farm Philosophy */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-blue-800 shadow-lg">
                <div className="text-4xl text-center mb-4">🌿</div>
                <h3 className="text-xl font-bold text-center mb-3 text-green-700">Free-Range Life</h3>
                <p className="text-gray-700 text-center">10+ square feet per bird with natural grazing from sunrise to sunset. Supplemental feed only as needed.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-800 shadow-lg">
                <div className="text-4xl text-center mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-center mb-3 text-blue-700">Health & Safety</h3>
                <p className="text-gray-700 text-center">Daily health checks, clean coops, fresh water, and predator protection from Norman, Leroy and the Come At Me Bros.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-blue-800 shadow-lg">
                <div className="text-4xl text-center mb-4">⭐</div>
                <h3 className="text-xl font-bold text-center mb-3 text-orange-700">Quality Control</h3>
                <p className="text-gray-700 text-center">3x daily collection, individual candling and cleaning to NC state standards for Grade AA quality.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Animals;