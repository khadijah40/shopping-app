import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Coffee, Heart, Sparkles, Leaf, TrendingUp, Users } from "lucide-react";

export default function Lifestyle() {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://dev.to/api/articles?tag=fashion&per_page=6"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const data = await response.json();

      const transformedPosts = data.map((article) => ({
        id: article.id,
        title: article.title,
        category: article.tags || "Fashion",
        excerpt: article.description || article.title,
        image:
          article.cover_image ||
          article.social_image ||
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
        readTime: `${article.reading_time_minutes || 5} min read`,
        url: article.url,
        tag: "lifestyle",
      }));

      setBlogPosts(transformedPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setBlogPosts([
        {
          id: 1,
          title: "How to Style Basics Like a Pro",
          category: "Fashion Tips",
          excerpt:
            "Transform your wardrobe staples into endless outfit possibilities with these simple styling tricks.",
          image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
          readTime: "5 min read",
          tag: "styling",
        },
        {
          id: 2,
          title: "The Ultimate Capsule Wardrobe Guide",
          category: "Minimalism",
          excerpt:
            "Build a versatile wardrobe with just 30 pieces. Quality over quantity for a clutter-free closet.",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
          readTime: "8 min read",
          tag: "capsule",
        },
        {
          id: 3,
          title: "Fashion & Confidence: Dress for Yourself",
          category: "Self-Expression",
          excerpt:
            "Discover how wearing what you love can boost your confidence and transform your mindset.",
          image:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
          readTime: "6 min read",
          tag: "confidence",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Choices",
      description:
        "We believe in conscious fashion that respects our planet and future generations.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Self-Expression",
      description:
        "Fashion is personal. We celebrate individuality and encourage you to be yourself.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community First",
      description:
        "More than customers, you're part of a community that values quality and authenticity.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Timeless Quality",
      description:
        "We curate pieces that last beyond trends, giving you value that stands the test of time.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg">
            Loading lifestyle content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop"
            alt="Lifestyle"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-black mb-6 animate-fadeIn">
            More Than Fashion
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            It's a lifestyle. It's confidence. It's you.
          </p>
          <div
            className="flex gap-4 justify-center animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <Coffee className="w-6 h-6 text-yellow-400" />
            <Heart className="w-6 h-6 text-yellow-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fashion & Life Inspiration
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore style tips, confidence boosters, and stories that celebrate
            your unique journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => post.url && window.open(post.url, "_blank")}
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <button className="text-black font-medium hover:text-gray-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fashion with purpose. Style with values. Community with heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                style={{
                  animation: "fadeInUp 0.6s ease-out forwards",
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Life in Style
          </h2>
          <p className="text-gray-600 text-lg">Everyday moments, elevated.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1522069213448-443a614da9b6?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1494955464529-790512c65305?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=400&h=400&fit=crop",
          ].map((img, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl overflow-hidden group cursor-pointer border-4 border-white shadow-md hover:border-yellow-400 transition-all"
            >
              <img
                src={img}
                alt={`Lifestyle ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Express Yourself?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our curated collection and find pieces that speak to your
            unique style.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl"
          >
            Discover Our Collection
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
      `}</style>
    </div>
  );
}
