import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../services/api';

function Products() {
  const [animalProducts, setAnimalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const animalRes = await getProductsByCategory('animal');
      // Filter to only show Spring 2026 products (eggs and chicks)
      const spring2026Products = animalRes.data.filter(product => 
        product.subcategory === 'eggs' || product.subcategory === 'chicks'
      );
      setAnimalProducts(spring2026Products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const groupBySubcategory = (products) => {
    const grouped = {};
    products.forEach(product => {
      const subcat = product.subcategory || 'Other';
      if (!grouped[subcat]) grouped[subcat] = [];
      grouped[subcat].push(product);
    });
    return grouped;
  };

  const groupChicksByBreed = (chicks) => {
    // Only show key breeds to reduce clutter
    const keyBreeds = ['Black Copper Marans', 'Cream Legbar', 'Olive Eggers', 'Americanas'];
    const breeds = {};
    
    chicks.forEach(chick => {
      const breedMatch = chick.product_name.match(/^(.*?)\s+(Chick|Pullet|Hen|Rooster)/);
      const breed = breedMatch ? breedMatch[1] : chick.product_name;
      
      // Only include key breeds
      if (keyBreeds.includes(breed)) {
        if (!breeds[breed]) breeds[breed] = [];
        breeds[breed].push(chick);
      }
    });
    return breeds;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-3xl">Loading products...</div>
      </div>
    );
  }

  const animalGrouped = groupBySubcategory(animalProducts);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">🚜 Product Preview - Coming Soon!</h2>
          <p className="text-xl mb-2">Online ordering launches Spring 2026</p>
          <p className="text-lg opacity-90">Browse our products below. Contact us to place orders in the meantime!</p>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            Our Products
          </h1>
          <p className="text-xl md:text-2xl">
            Heritage breed chickens and farm-fresh eggs
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Animal Products */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-teal-700">🐔 Animal Products</h2>
          
          {Object.entries(animalGrouped).map(([subcategory, products]) => (
            <div key={subcategory} className="mb-12">
              <h3 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-teal-500 pb-2">
                {subcategory}
              </h3>

              {subcategory === 'chicks' ? (
                Object.entries(groupChicksByBreed(products)).map(([breed, breedChicks]) => (
                  <div key={breed} className="mb-8">
                    <h4 className="text-2xl font-bold mb-4 text-teal-600">{breed}</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {breedChicks.map((product) => (
                        <div key={product.product_id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition border-2 border-blue-800">
                          <h5 className="text-xl font-bold mb-2">{product.product_name}</h5>
                          <p className="text-gray-600 mb-4">{product.description}</p>
                          <p className="text-2xl font-bold text-teal-600">${parseFloat(product.unit_price).toFixed(2)}</p>
                          <p className="text-sm text-gray-500 mt-2">Available Spring 2026</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.product_id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition border-2 border-blue-800">
                      <h4 className="text-xl font-bold mb-2">{product.product_name}</h4>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <p className="text-2xl font-bold text-teal-600">${parseFloat(product.unit_price).toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-2">Available Spring 2026</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-xl p-8 text-center shadow-lg border-2 border-blue-800">
          <h3 className="text-3xl font-bold mb-4">Interested in ordering now?</h3>
          <p className="text-xl mb-6">Contact us directly to place orders or ask questions!</p>
          <a 
            href="/contact" 
            className="inline-block bg-teal-700 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-teal-800 transition shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Products;