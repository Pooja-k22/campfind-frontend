import HomePage from "./users/pages/HomePage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ExplorePage from "./users/pages/ExplorePage";
import Footer from "./components/Footer";
import CampSpotDetail from "./users/pages/CampSpotDetail";
import About from "./users/pages/About";
import UserProfile from "./users/pages/UserProfile";


import CampApprovals from "./Admin/pages/CampApprovals";
import UserHostList from "./Admin/pages/UserHostList";
import AdminSettings from "./Admin/pages/AdminSettings";

import Register from "./pages/Register";
import Login from "./pages/Login";
import SpotAdding from "./users/pages/SpotAdding";
import ReservationList from "./users/pages/ReservationList";
import PropertyList from "./users/pages/PropertyList";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import Wishlist from "./users/pages/Wishlist";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import Pagenotefound from "./pages/Pagenotefound";
import Paymenterror from "./users/pages/Paymenterror";
import Paymentsuccess from "./users/pages/Paymentsuccess";
import Hostdashboard from "./users/pages/Hostdashboard";

function App() {

  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(true);
    }, 2000);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={isloading ? <HomePage /> : <Preloader />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campspot-details/:id" element={<CampSpotDetail />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/spot-adding" element={<SpotAdding />} />
        <Route path="/reserve" element={<ReservationList />} />
        <Route path="/property" element={<PropertyList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/host-dashboard" element={<Hostdashboard />} />

         <Route path="/payment-error" element={<Paymenterror />} />
          <Route path="/payment-success" element={<Paymentsuccess />} />

        <Route path="/admin-dashboard" element={isloading ? <AdminDashboard /> : <Preloader />} />
        <Route path="/camp-approve" element={<CampApprovals />} />
        <Route path="/userhostlist" element={<UserHostList />} />
        <Route path="/adminsettings" element={<AdminSettings />} />
        <Route path="*" element={<Pagenotefound/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
