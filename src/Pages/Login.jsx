import React, { useState, useEffect } from "react";
import Img from "../images/form_img1.jpg";
import { Col, Row } from "antd";
// import GoogleLoginBtn from "../components/GoogleLogin";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PostApi, GetApi } from "../constant/Api";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setSignUp] = useState(true);
  const handleClick = (isBtn) => {
    isBtn ? setIsLogin(!isLogin) : setSignUp(!isSignUp);
  };

  const clientId =
    "932737388320-ltbl50cuo9hgvag198hpnvdrqtc3a23r.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
      gapi.load("client:auth2", start);
    }
  });
  const handleLogin = () => {
    const userJson = {
      email: email,
      password: password,
    };

    PostApi("post_LoginUser/", JSON.stringify(userJson))
      .then((val) => {
        if (val.statusCode === 200) {
          setUserInfo(val.dtl);
          console.log("Logging in with:", val.dtl); // Log after setting userInfo
          secureLocalStorage.setItem("userInfo", JSON.stringify(val.dtl));
          // localStorage.setItem("userInfoTest", JSON.stringify(val.dtl));
          navigate("/#"); // Navigate without reloading
          window.location.reload();
        } else {
          alert("Нэвтрэхэд алдаа гарлаа та ахин оролдоно уу.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error); // Log the error for debugging
        // setUserInfo(null);
        alert("Нэвтрэхэд алдаа гарлаа та ахин оролдоно уу.");
      });
  };

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  // useEffect(() => {
  //   secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
  //   localStorage.setItem("userInfoTest", JSON.stringify(userInfo));
  // }, [userInfo]);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      // Check that userInfo is not empty
      secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
      console.log("User info saved to storage:", userInfo);
    }
  }, [userInfo]);

  // Function to update user information
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(); // Call login function on Enter key press
    }
  };

  return (
    // <div className="flex lg:mt-60 mt-32 lg:mx-72 mx-10 lg:mb-28 mb-5 justify-center items-center ">
    //   <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-96  shadow-lg ">
    //     <div className="hidden lg:block w-full h-fit content-center p-6">
    //       <img
    //         src={Img}
    //         alt="Your image"
    //         className="object-cover w-full h-fit"
    //       />
    //     </div>
    //     <div className="grid w-full h-full content-center p-6">
    //       <div className="flex justify-start mb-6">
    //         <div>
    //           <h2 className="text-lg font-bold ">Нэвтрэх</h2>
    //         </div>
    //       </div>
    //       {/* Buttons for login with Google and Facebook */}
    //       {/* <div className="flex w-full">
    //         <GoogleLoginBtn />
    //       </div>
    //       <button className="bg-blue-700 text-white rounded-lg px-4 py-2 mb-4 w-full">
    //         Log in with Facebook
    //       </button> */}
    //       {/* Separator */}
    //       {/* <div className="flex items-center mb-4">
    //         <hr className="flex-grow border-gray-300" />
    //         <span className="text-gray-400 mx-4">Or</span>
    //         <hr className="flex-grow border-gray-300" />
    //       </div> */}
    //       {/* Email input */}
    //       <input
    //         type="email"
    //         placeholder="Мэйл хаяг"
    //         className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       {/* Password input */}
    //       <div className="relative">
    //         <input
    //           type={showPassword ? "text" : "password"}
    //           placeholder="Нууц үг"
    //           className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full pr-10"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         {/* Toggle password visibility */}
    //         <button
    //           className="absolute top-0 right-0 mt-3 mr-4"
    //           onClick={() => setShowPassword(!showPassword)}
    //         >
    //           {showPassword ? (
    //             /* Show eye icon when password is visible */
    //             <FaRegEye />
    //           ) : (
    //             /* Show crossed eye icon when password is hidden */
    //             <FaRegEyeSlash />
    //           )}
    //         </button>
    //       </div>
    //       {/* Sign in button */}
    //       <button
    //         onClick={handleLogin}
    //         className="bg-green-500 text-white rounded-lg px-4 py-2 w-full"
    //       >
    //         Нэвтрэх
    //       </button>
    //       {/* Link to sign up */}
    //       <p className="flex flex-wrap account-rel-text">
    //         Бүртгэлгүй хэрэглэгч бол{" "}
    //         <Link to="/SignUp" className="text-blue-500 font-medium">
    //           Бүртгүүлэх
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen p-6 mt-20 md:p-12">
      <div className="grid md:grid-cols-2 shadow-lg min-h-screen w-full max-w-6xl">
        {/* Left image section */}
        <div className="hidden md:block relative">
          <img
            src={Img}
            alt="Sign up illustration"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Right form section */}
        <div className="grid w-full h-full content-center p-6">
          <div className="flex justify-start mb-6">
            <div>
              <h2 className="text-lg font-bold ">Нэвтрэх</h2>
            </div>
          </div>
          {/* Buttons for login with Google and Facebook */}
          {/* <div className="flex w-full">
             <GoogleLoginBtn />
           </div>
           <button className="bg-blue-700 text-white rounded-lg px-4 py-2 mb-4 w-full">
            Log in with Facebook
          </button> */}
          {/* Separator */}
          {/* <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 mx-4">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div> */}
          {/* Email input */}
          <input
            type="email"
            placeholder="Мэйл хаяг"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Нууц үг"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* Toggle password visibility */}
            <button
              className="absolute top-0 right-0 mt-3 mr-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                /* Show eye icon when password is visible */
                <FaRegEye />
              ) : (
                /* Show crossed eye icon when password is hidden */
                <FaRegEyeSlash />
              )}
            </button>
          </div>
          {/* Sign in button */}
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white rounded-lg px-4 py-2 w-full"
          >
            Нэвтрэх
          </button>
          {/* Link to sign up */}
          <p className="flex flex-wrap account-rel-text">
            Бүртгэлгүй хэрэглэгч бол{" "}
            <Link to="/SignUp" className="text-blue-500 font-medium">
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
