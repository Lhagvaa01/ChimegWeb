import React, { useState, useEffect } from "react";
import Img from "../images/form_img1.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PostApi } from "../constant/Api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const SignUp = () => {
  const navigate = useNavigate();
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [pPassword, setPPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  useEffect(() => {
    secureLocalStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const handleLogin = () => {
    const data = {
      TCUserName: lName,
      TCEmail: email,
      TCPhoneNumber: phone,
      TCPassword: password,
    };

    const userDJson = JSON.stringify(data);
    PostApi("post_CreateUser/", userDJson)
      .then((val) => {
        if (val.statusCode === "200") {
          setUserInfo(val.dtl);
          // console.log("Logging in with:", val.dtl); // Log after setting userInfo
          secureLocalStorage.setItem("userInfo", JSON.stringify(val.dtl));
          // localStorage.setItem("userInfoTest", JSON.stringify(val.dtl));
          navigate("/#"); // Navigate without reloading
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Login error:", error); // Log the error for debugging
        // setUserInfo(null);
        alert("Бүртгүүлхэд алдаа гарлаа та ахин оролдоно уу.");
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "lName":
        setLName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "pPassword":
        setPPassword(value);
        break;
      default:
        break;
    }
  };

  return (
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
        <div className="flex flex-col justify-center p-6">
          <h2 className="text-lg font-bold mb-6">Бүртгүүлэх</h2>
          <input
            type="text"
            placeholder="Хэрэглэгчийн нэр"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            value={lName}
            name="lName"
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Мэйл хаяг"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            value={email}
            name="email"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Утасны дугаар"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            value={phone}
            name="phone"
            onChange={handleInputChange}
          />
          {/* Password input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Нууц үг"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full pr-10"
              value={password}
              name="password"
              onChange={handleInputChange}
            />
            <button
              className="absolute top-0 right-0 mt-3 mr-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {/* Confirm Password input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Нууц үг давтах"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full pr-10"
              value={pPassword}
              name="pPassword"
              onChange={handleInputChange}
            />
            <button
              className="absolute top-0 right-0 mt-3 mr-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {/* Sign Up button */}
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white rounded-lg px-4 py-2 w-full"
          >
            Бүртгүүлэх
          </button>
          <p className="mt-4 text-center">
            Бүртгэлтэй хэрэглэгч бол{" "}
            <Link to="/sign_in" className="text-blue-500 font-medium">
              Нэвтрэх
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
