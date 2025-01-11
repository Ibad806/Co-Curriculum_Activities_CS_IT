// import React from "react";
// import UserSidebar from "../usercomponents/UserSidebar";
// import UserHeader from "../usercomponents/UserHeader";
// import UserHome from "../usercomponents/UserHome";

// const UserPanel = () => {
//   return (
//     <div className="flex flex-col h-screen">

//       <div className="flex-none">
//         <UserHeader />
//       </div>

//       <div className="flex flex-1">

//         <div className="flex-none">
//           <UserSidebar />
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           <UserHome />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPanel;

import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import UserHome from "../userpages/UserHome";

const UserPanel = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <UserHeader />

      {/* Sidebar and Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar />
        {/* <UserHome /> */}
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet /> {/* Dynamically renders child routes */}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
