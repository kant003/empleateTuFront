import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import Navbar from "./components/Navbar";
import OffertList from "./pages/OfferList";
import OffertForm from "./pages/OfferForm";
import OfferDetail from "./pages/OfferDetail";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import CategoryManager from "./pages/CategoryManager";


function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col  h-screen ">
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex grow justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/offers" element={<OffertList />} />
              <Route path="/offers/:id" element={<OfferDetail />} />
              <Route path="/offers/new" element={<OffertForm />} />
              <Route path="/offers/edit/:id" element={<OffertForm />} />
              <Route path="/categories" element={<CategoryManager />} />
            </Routes>
          </div>
          <Footer />
        </div>
      
      </BrowserRouter>
    </>
  );
}

export default App;
