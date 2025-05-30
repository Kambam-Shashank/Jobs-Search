import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useState } from 'react';
import "./index.css";

const ProfileCard = () => {

    const [profileDetails, setProfileDetails] = useState({})

  useEffect(() => {
    const getProfile = async () => {
      const apiUrl = "https://apis.ccbp.in/profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
};
      setProfileDetails(formattedData)
    };
    getProfile();
  }, []);

  return (
    <div className="profile-card">
      <div><img className="avatar" src={profileDetails.profileImageUrl}/></div>
      <h2 className="name">{profileDetails.name}</h2>
      <p className="title">{profileDetails.shortBio}</p>
    </div>
  );
};

export default ProfileCard;
