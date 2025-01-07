// import React, { useEffect, useState } from "react";

// const NetworkStatus = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const handleOnline = () => {
//       setIsOnline(true);
//       setVisible(true);
//     };
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (isOnline) {
//       timer = setTimeout(() => {
//         setVisible(false);
//       }, 3000);
//     } else {
//       setVisible(true);
//     }
//     return () => clearTimeout(timer);
//   }, [isOnline]);

//   if (!visible) return null;

//   return <CheckNetwork isOnline={isOnline} />;
// };

// export default React.memo(NetworkStatus);

// export const CheckNetwork = ({ isOnline }) => {
//   return (
//     <div
//       className={`NETWORK_STATUS text-center text-white ${isOnline ? "bg-green-500" : "bg-red-500"
//         }`}
//     >
//       {isOnline ? "Now You Online" : "You are Offline"}
//     </div>
//   );
// };
