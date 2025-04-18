import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    // console.log(response);
    // Handle the response from Facebook login
    // You can send the response data to your backend for further processing
  };

  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
};

export default FacebookLoginButton;
