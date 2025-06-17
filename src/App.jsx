import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "./nprogress";
import BackToCACButton from "./components/BacktoCAC";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Generalgames from "./pages/Generalgames";
import Egames from "./pages/Egames";
import Geekgames from "./pages/Geekgames";
import Smec from "./pages/Smec";
import ScrollToTop from "./components/ScrollToTop";
import Gamepage from "./pages/Gamepage";
import Payment from "./pages/Payment";
import PaymentSuccessful from "./pages/PaymentSuccessful";
import UserPanel from "./dashboard/userpanel/usercomponents/UserPanel";
import Ticket from "./dashboard/userpanel/userpages/Ticket";
import UserHome from "./dashboard/userpanel/userpages/UserHome";
import UserProfile from "./dashboard/userpanel/userpages/UserProfile";
import JudgesHome from "./dashboard/judgespanel/judgespages/JudgesHome";
import JudgesTournament from "./dashboard/judgespanel/judgespages/JudgesTournament";
import JudgesMatches from "./dashboard/judgespanel/judgespages/JudgesMatches";
import JudgesScoreboard from "./dashboard/judgespanel/judgespages/JudgesScoreboard";
import JudgesProfile from "./dashboard/judgespanel/judgespages/JudgesProfile";
import UserWinners from "./dashboard/userpanel/userpages/UserWinners";
import JudgesLayout from "./dashboard/judgespanel/judgescomponents/JudgesLayout";
import ApplyforPosts from "./dashboard/userpanel/userpages/ApplyForPosts";
import AdminLayout from "./dashboard/adminpanel/admincomponents/AdminLayout";
import AdminHome from "./dashboard/adminpanel/adminpages/AdminHome";
import LoginForm from "./pages/Auth/Login";
import RegisterForm from "./pages/Auth/Register";
import AddNewEvent from "./dashboard/adminpanel/admincomponents/AddNewEvent";
import ManageEvents from "./dashboard/adminpanel/admincomponents/ManageEvents";
import CreateSmecGame from "./dashboard/adminpanel/admincomponents/CreateSmecGame";
import ManageSmecGame from "./dashboard/adminpanel/admincomponents/ManageSmecGame";
import JudgesManagement from "./dashboard/adminpanel/admincomponents/JudgesManagement";
import PostApplications from "./dashboard/adminpanel/admincomponents/PostApplications";
import TicketManagement from "./dashboard/adminpanel/admincomponents/TicketManagement";
import Announcements from "./dashboard/adminpanel/admincomponents/Announcements";
import GameTicket from "./components/GameTicket";
import QawwaliDetails from "./pages/QawwaliDetails";
import DinnerDetails from "./pages/DinnerDetails";
import GalleryManagement from "./dashboard/adminpanel/admincomponents/GalleryManagement";
import AdminNews from "./dashboard/adminpanel/admincomponents/AdminNews";
import EventPage from "./pages/EventPage";
import AllNews from "./pages/AllNews";
import NewsDetail from "./pages/NewDetails";
import Cookies from "js-cookie";
import ManageCategory from "./dashboard/adminpanel/admincomponents/ManageCategory";
import CategoryDetailsPage from "./components/CategoryDetailsPage";

function App() {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const location = useLocation(); // Using location to detect route changes

  useEffect(() => {
    // Show loading bar on route change
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    // Detect location changes and trigger loading bar
    handleStart();
    handleStop();

    // Handle when the component is mounted or updated
    window.addEventListener("load", handleStop);

    return () => {
      window.removeEventListener("load", handleStop);
    };
  }, [location]); // useEffect depends on location to track path changes

  const [role, setRole] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")).role : null); // Get role from cookies
  console.log(role);


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/qawwali" element={<QawwaliDetails />} />
        <Route path="/events/dinner" element={<DinnerDetails />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/all-news" element={<AllNews />} />
        <Route path="/all-news/:id" element={<NewsDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
                  {/* <Route path="generalgame" element={<Generalgames />} />
          <Route path="egame" element={<Egames />} />
          <Route path="geekgame" element={<Geekgames />} /> */}
        <Route path="/smec">
          <Route index element={<Smec />} />
          <Route path=":category" element={<CategoryDetailsPage />} />
          <Route path=":category/:title" element={<Gamepage />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessful />} />
        {/* User Panel Layout */}
        { role == "user"  && (
          <Route path="/userpanel" element={<UserPanel />}>
            {/* Child Routes */}
            <Route path="home" element={<UserHome />} />
            <Route path="ticket" element={<Ticket />} />
            <Route path="gameticket" element={<GameTicket />} />
            <Route path="winners" element={<UserWinners />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="applyforposts" element={<ApplyforPosts />} />
          </Route>
        )}
        {/* Judges Panel Layout */}
        { role == "judge"  && (
          <Route path="/judgespanel" element={<JudgesLayout />}>
            {/* Child Routes */}
            <Route path="home" element={<JudgesHome />} />
            <Route path="tournaments" element={<JudgesTournament />} />
            <Route path="matches" element={<JudgesMatches />} />
            <Route path="scoreboard" element={<JudgesScoreboard />} />
            <Route path="profile" element={<JudgesProfile />} />
          </Route>
        )}
        {/* Admin Panel Layout */}
       {
        (
          <Route path="/adminpanel" element={<AdminLayout />}>
            {/* Child Routes */}
            <Route path="home" element={<AdminHome />} />
            <Route path="addnewevent" element={<AddNewEvent />} />
            <Route path="manageevents" element={<ManageEvents />} />
            <Route path="creategame" element={<CreateSmecGame />} />
            <Route path="managegame" element={<ManageSmecGame />} />
            <Route path="managecategory" element={<ManageCategory />} />
            <Route path="judgesmanagement" element={<JudgesManagement />} />
            <Route path="postapplication" element={<PostApplications />} />
            <Route path="ticketmanagement" element={<TicketManagement />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="gallerymanagement" element={<GalleryManagement />} />
            <Route path="news" element={<AdminNews />} />
          </Route>
         ) }
        
      </Routes>
      <BackToCACButton />
    </>
  );
}

export default App;
