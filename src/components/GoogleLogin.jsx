// import { GoogleLogin } from "react-google-login";
// import { useNavigate } from "react-router-dom";

// const clientId =
//   "932737388320-ltbl50cuo9hgvag198hpnvdrqtc3a23r.apps.googleusercontent.com";

// function GoogleLoginBtn() {
//   const navigate = useNavigate();
//   const onSuccess = (res) => {
//     // sessionStorage.setItem("globalVariable", JSON.stringify(res.profileObj));
//     localStorage.setItem("user", JSON.stringify(res.profileObj));
//     console.log("Login success! : ", res.profileObj);
//     navigate("/#");
//   };

//   const onFailure = (res) => {
//     console.log("Login Failed! : ", res);
//   };
//   return (
//     <div>
//       <button className="flex rounded-lg py-2 mb-4 w-full">
//         <GoogleLogin
//           fetchBasicProfile={false}
//           clientId={clientId}
//           buttonText="Google-ээр Нэвтрэх"
//           onSuccess={onSuccess}
//           onFailure={onFailure}
//           cookiePolicy={"single_host_origin"}
//           isSignedIn={true}
//         />
//       </button>
//     </div>
//   );
// }

// export default GoogleLoginBtn;
