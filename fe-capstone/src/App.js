import { Routes, Route } from "react-router-dom";
import Header from './components/header'
import Footer from './components/footer'

// Pages
import HomePage from './HomePage';
// import BookingPage from './pages/BookingPage';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/booking" element={<BookingPage />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;