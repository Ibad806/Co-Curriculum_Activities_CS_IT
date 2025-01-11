import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/smec">
          <Route index element={<Smec />} />
          <Route path="generalgames" element={<Generalgames />} />
          <Route path="egames" element={<Egames />} />
          <Route path="geekgames" element={<Geekgames />} />
          <Route path=":category/:title" element={<Gamepage />} />
        </Route>
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessful />} />

        {/* userpanel */}
        {/*         
        <Route path="/userpanel">
          <Route index element={<UserPanel />} />
          <Route path="ticket" element={<Ticket />} />
        </Route> */}

        {/* User Panel Layout */}
        <Route path="/userpanel" element={<UserPanel />}>
          {/* Child Routes */}
          <Route path="home" element={<UserHome />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

