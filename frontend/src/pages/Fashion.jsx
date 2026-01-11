import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Loader } from "lucide-react";

export default function Fashion() {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products/category/women's clothing"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Transform API data to match our component structure
        const transformedProducts = data.map((product, index) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          description: product.description,
          collection: getRandomCollection(),
          caption: product.description.substring(0, 50) + "...",
          products: [
            { name: product.title, price: product.price },
            {
              name: "Matching Accessories",
              price: (product.price * 0.3).toFixed(2),
            },
            {
              name: "Complementary Item",
              price: (product.price * 0.5).toFixed(2),
            },
            {
              name: "Premium Addition",
              price: (product.price * 0.8).toFixed(2),
            },
          ],
        }));

        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to assign random collections
  const getRandomCollection = () => {
    const collections = ["winter26", "minimal", "abaya", "casual"];
    return collections[Math.floor(Math.random() * collections.length)];
  };

  const [trendingCollections, setTrendingCollections] = useState([]);
  const [styleGuides, setStyleGuides] = useState([]);

  // Fetch collection images from API
  useEffect(() => {
    const fetchCollectionImages = async () => {
      try {
        // Fetch shirts for collections
        const response = await fetch(
          "https://fakestoreapi.com/products/category/men's clothing"
        );
        const data = await response.json();

        // Take first 4 products for collections
        const collections = data.slice(0, 4).map((item, index) => {
          const collectionTypes = [
            {
              id: "winter26",
              title: "Winter '26",
              subtitle: "Modest & Cozy",
              description: "Elegant layering with full coverage",
              tag: "TRENDING",
            },
            {
              id: "minimal",
              title: "Modest Minimal",
              subtitle: "Elegance in Simplicity",
              description: "Clean lines and refined modesty",
              tag: "ESSENTIAL",
            },
            {
              id: "abaya",
              title: "Abaya Collection",
              subtitle: "Timeless Grace",
              description: "Traditional elegance, modern style",
              tag: "ELEGANT",
            },
            {
              id: "casual",
              title: "Casual Comfort",
              subtitle: "Relaxed & Covered",
              description: "Hoodies, sweaters, everyday ease",
              tag: "COZY",
            },
          ];

          return {
            ...collectionTypes[index],
            image: item.image,
          };
        });

        setTrendingCollections(collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
        // Fallback to default images
        setTrendingCollections([
          {
            id: "winter26",
            title: "Winter '26",
            subtitle: "Modest & Cozy",
            description: "Elegant layering with full coverage",
            image:
              "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&h=800&fit=crop",
            tag: "TRENDING",
          },
          {
            id: "minimal",
            title: "Modest Minimal",
            subtitle: "Elegance in Simplicity",
            description: "Clean lines and refined modesty",
            image:
              "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=800&fit=crop",
            tag: "ESSENTIAL",
          },
          {
            id: "abaya",
            title: "Abaya Collection",
            subtitle: "Timeless Grace",
            description: "Traditional elegance, modern style",
            image:
              "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&h=800&fit=crop",
            tag: "ELEGANT",
          },
          {
            id: "casual",
            title: "Casual Comfort",
            subtitle: "Relaxed & Covered",
            description: "Hoodies, sweaters, everyday ease",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop",
            tag: "COZY",
          },
        ]);
      }
    };

    const fetchStyleGuides = async () => {
      try {
        // Fetch different products for style guides
        const response = await fetch(
          "https://fakestoreapi.com/products/category/women's clothing"
        );
        const data = await response.json();

        // Take 3 products for style guides
        const guides = data.slice(5, 8).map((item, index) => {
          const guideTitles = [
            {
              title: "Styling Your Abaya",
              tip: "Elevate your abaya with statement belts, layered jewelry, and coordinated hijabs. Open abayas work great over casual outfits.",
            },
            {
              title: "Modest Hoodie Styling",
              tip: "Choose oversized hoodies that cover the hips. Pair with wide-leg pants or maxi skirts. Layer with long cardigans for extra coverage.",
            },
            {
              title: "Sweater Layering Guide",
              tip: "Start with a long-sleeve base layer, add a fitted turtleneck sweater, then layer with a long cardigan or open abaya for dimension.",
            },
          ];

          return {
            ...guideTitles[index],
            image: item.image,
          };
        });

        setStyleGuides(guides);
      } catch (error) {
        console.error("Error fetching style guides:", error);
        // Fallback to default images
        setStyleGuides([
          {
            title: "Styling Your Abaya",
            tip: "Elevate your abaya with statement belts, layered jewelry, and coordinated hijabs. Open abayas work great over casual outfits.",
            image:
              "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=400&fit=crop",
          },
          {
            title: "Modest Hoodie Styling",
            tip: "Choose oversized hoodies that cover the hips. Pair with wide-leg pants or maxi skirts. Layer with long cardigans for extra coverage.",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop",
          },
          {
            title: "Sweater Layering Guide",
            tip: "Start with a long-sleeve base layer, add a fitted turtleneck sweater, then layer with a long cardigan or open abaya for dimension.",
            image:
              "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=400&fit=crop",
          },
        ]);
      }
    };

    fetchCollectionImages();
    fetchStyleGuides();
  }, []);

  const filteredLooks =
    selectedCollection === "all"
      ? products
      : products.filter((look) => look.collection === selectedCollection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1600&h=1000&fit=crop"
            alt="Modest Fashion Hero"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-4 animate-fadeIn">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm tracking-wider">
              MODEST & ELEGANT
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-black mb-6 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            Modest Fashion
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            From elegant abayas to cozy sweaters & hoodies
          </p>
        </div>
      </section>

      {/* Trending Collections */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Modest Collections
          </h2>
          <p className="text-gray-600 text-lg">
            Elegant styles that honor modesty and beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingCollections.map((collection, index) => (
            <div
              key={collection.id}
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              onClick={() => setSelectedCollection(collection.id)}
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                  {collection.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-xs text-yellow-400 font-semibold mb-1">
                  {collection.subtitle}
                </p>
                <h3 className="text-xl font-black mb-1">{collection.title}</h3>
                <p className="text-sm text-gray-200 mb-3">
                  {collection.description}
                </p>
                <button className="flex items-center gap-2 text-white text-sm font-medium hover:text-yellow-400 transition-colors">
                  Explore <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Collection Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCollection("all")}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              selectedCollection === "all"
                ? "bg-black text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Looks
          </button>
          {trendingCollections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCollection === collection.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {collection.title}
            </button>
          ))}
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-12 h-12 animate-spin text-black" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">
              Error loading products: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Product Cards */}
      {!loading && !error && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLooks.map((look, index) => (
              <div
                key={look.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group"
                style={{
                  animation: "fadeInUp 0.6s ease-out forwards",
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="relative h-96 overflow-hidden bg-gray-100">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1 line-clamp-2">
                      {look.title}
                    </h3>
                    <p className="text-sm text-gray-200 italic line-clamp-2">
                      {look.caption}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-yellow-400">✦</span> Complete the Look
                  </h4>
                  <div className="space-y-2 mb-4">
                    {look.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-gray-700 line-clamp-1">
                          {product.name}
                        </span>
                        <span className="font-bold text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Shop This Look
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredLooks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No products found in this collection.
              </p>
              <button
                onClick={() => setSelectedCollection("all")}
                className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                View All Products
              </button>
            </div>
          )}
        </section>
      )}

      {/* Style Guides */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Modest Styling Tips
            </h2>
            <p className="text-gray-600 text-lg">
              Expert advice for abayas, sweaters & hoodies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styleGuides.map((guide, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                style={{
                  animation: "fadeInUp 0.6s ease-out forwards",
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{guide.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Build Your Modest Wardrobe
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discover abayas, sweaters, hoodies & more - all with elegant, full
            coverage
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl"
          >
            Shop All Products
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}
