import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import ProductCards from "./components/ProductCards.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Fashion from "./pages/Fashion.jsx";
import Favorites from "./pages/Favorites.jsx";
import Lifestyle from "./pages/Lifestyle";
import Checkout from "./pages/Checkout.jsx";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer.jsx";
import AIButton from "./components/AIButton";

function App() {
  return (
    <CartProvider>
      <Header />
      <div className="pt-[50px]">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroBanner />
                <ProductCards />
              </>
            }
          />
          <Route path="/ProductCards" element={<ProductCards />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      <Footer />
      <AIButton />
    </CartProvider>
  );
}

export default App;
