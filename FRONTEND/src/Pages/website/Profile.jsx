import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import LeafletMap from '../../Components/website/Map/LeafletMap';
// import { RiCameraLine, RiMailLine, RiPhoneLine, RiMapPinLine, RiCalendarLine, RiEditLine, RiCloseLine } from 'react-icons/ri';

const Profile = () => {
  const { currentAuth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null); // Clear previous errors
        },
        (error) => {
          setError(error.message);
          setLocation(null); // Clear previous location
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);
  useEffect(() => {
    getLocation();
  }, [])
  console.log(location);
  console.log(error);
  // const [profile, setProfile] = useState({
  //   name: "Sarah Johnson",
  //   email: "sarah.j@example.com",
  //   phone: "+1 234 567 8900",
  //   location: "San Francisco, CA",
  //   birthday: "1990-04-15",
  //   bio: "Product designer passionate about creating intuitive user experiences."
  // });

  return (
    <div className="w-full max-w-7xl mx-auto p-6 font-primary bg-secondary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3 border border-gray-300 bg-body rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={currentAuth?.avatar}
                alt="Profile"
                className="w-24 h-24 border border-gray-300  rounded-full object-cover"
              />
              <button className="absolute bottom-2 border-green-500 right-2 bg-green-500 rounded-full">
                <span className='block w-3 h-3'></span>
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-heading text-2xl">{currentAuth?.fullName}</h1>
              <p className="font-description text-gray-600">{currentAuth?.role}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 font-inter"
            >
              {/* {isEditing ? <RiCloseLine className="w-4 h-4" /> : <RiEditLine className="w-4 h-4" />} */}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {!isEditing ? (
          <BentoGrid
            currentAuth={currentAuth}
          />
        ) : (
          <EditForm
            currentAuth={currentAuth}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;


const EditForm = React.memo(({ currentAuth }) => (
  <div className="md:col-span-3 bg-body rounded-xl p-6 shadow-sm">
    {/* <form onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }} className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-inter text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          // value={profile.name}
          // onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded-lg bg-secondary"
        />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          // value={profile.email}
          // onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 border rounded-lg bg-secondary"
        />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium mb-2">Phone</label>
        <input
          type="tel"
          // value={profile.phone}
          // onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="w-full p-2 border rounded-lg bg-secondary"
        />
      </div>
      <div>
        <label className="block font-inter text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          // value={profile.location}
          // onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          className="w-full p-2 border rounded-lg bg-secondary"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block font-inter text-sm font-medium mb-2">Bio</label>
        <textarea
          // value={profile.bio}
          // onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full p-2 border rounded-lg bg-secondary font-description"
          rows="3"
        />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="bg-dark text-white px-6 py-2 rounded-lg font-inter">
          Save Changes
        </button>
      </div>
    </form>
  </div>
));

const BentoGrid = React.memo(({ currentAuth }) => (
  <>
    <div className="bg-body rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {/* <RiMailLine className="w-5 h-5 text-dark" /> */}
        <div>
          <h3 className="font-inter font-semibold">Email</h3>
          <p className="font-description text-gray-600">{currentAuth?.email}</p>
        </div>
      </div>
    </div>

    <div className="bg-body rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {/* <RiPhoneLine className="w-5 h-5 text-dark" /> */}
        <div>
          <h3 className="font-inter font-semibold">Phone</h3>
          <p className="font-description text-gray-600">{currentAuth?.phoneNumber}</p>
        </div>
      </div>
    </div>

    <div className="bg-body rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {/* <RiMapPinLine className="w-5 h-5 text-dark" /> */}
        <div>
          <h3 className="font-inter font-semibold">Location</h3>
          <p className="font-description text-gray-600">{currentAuth?.address}</p>
        </div>
      </div>
    </div>
    <div className="bg-body col-span-3 h-auto rounded-xl p-6 shadow-sm">
      {/* <div> */}
      <LeafletMap latitude={21.595556343794556} longitude={71.21788871314041} /> San Francisco
      {/* </div> */}
    </div>
  </>
));