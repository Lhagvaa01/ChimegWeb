import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import { motion } from "framer-motion";
import { Divide as Hamburger } from "hamburger-react";
import { MdLocalGroceryStore } from "react-icons/md";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import useBodyScrollLock from "./layout/useBodyScrollLock";
import "flag-icons/css/flag-icons.min.css";
import languages from "../data/languages.json";
import CategoryDtl from "./CategoryDtl";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
// import GoogleLogOutBtn from "../components/GoogleLogOut";
import { Avatar, Space } from "antd";
import secureLocalStorage from "react-secure-storage";
import { FaUser } from "react-icons/fa";
import CategoryDtlMobile from "./CategoryDtlMoble";
import hat from "../images/santasHat.png";

const Header = ({ dBgroup, dBDiscount }) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  // navigate("/");
  const menuClick = () => {
    setOpen(!isOpen);
  };

  const [isLocked, toggle] = useBodyScrollLock();
  const [idCode, setidCode] = useState("");
  useEffect(() => {
    // console.log(dBDiscount);
    setidCode(window.location.pathname.split("/")[1].toLowerCase());
  }, []);

  const [isOpenLan, setIsOpenLan] = useState(false);
  const [selLan, setSelLan] = useState(languages[0].flag);

  const lanClick = () => {
    setIsOpenLan(!isOpenLan);
  };
  const handleChangeLanguage = (language) => {
    setSelLan(language.flag);
    setIsOpenLan(!isOpenLan);
    // console.log("Selected language:", selLan);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // Function to clear search query
  const clearSearchQuery = () => {
    setSearchQuery("");
    navigate(`/`);
  };

  const [filteredGroup, setFilteredGroup] = useState([]);

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    // console.log(storedUserInfo ? JSON.parse(storedUserInfo) : {});
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const [cart, setCart] = useState(() => {
    const storedCart = secureLocalStorage.getItem("shopping-cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    const storedCart = secureLocalStorage.getItem("shopping-cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [secureLocalStorage.getItem("shopping-cart")]);

  useEffect(() => {
    const filtered = dBgroup.filter((item) => item.isHeader === true);
    setFilteredGroup(filtered);
  }, [dBgroup, secureLocalStorage.getItem("userInfo")]);

  return (
    <header className="fixed z-50 w-screen md:px-32 px-3 md:pt-5 md:bg-white bg-slate-100  top-0 md:h-38 lg:h-36 ">
      {/* desktop & tablet */}
      <div className="grid">
        <div className="hidden md:flex w-full h-full items-center justify-between ">
          <Link to={"/"} className="flex items-center gap-2 ">
            <img src={Logo} className="w-40  object-cover" alt="logo" />
            {/* <div className="absolute top-7 left-33 transform -translate-x-2 -translate-y-6 -rotate-45">
              <img
                src={hat} // Банткийн зургийн замыг энд оруулна
                alt="Бэлэгний бантик"
                className="w-10 h-10" // Зургийн хэмжээг өөрчлөх
              />
            </div> */}
          </Link>

          <div className="relative flex-auto overflow-hidden mx-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            {/* <input
              type="search"
              id="default-search"
              className="flex w-full  p-4 pl-10  text-sm text-black  rounded-lg bg-indigo-50 outline-teal-500 "
              placeholder="Search your products from here..."
              required
            /> */}

            <form onSubmit={handleSearchSubmit}>
              {" "}
              {/* Use form element for submitting on Enter key */}
              <input
                // type="search"
                id="default-search"
                className="flex w-full p-4 pl-10 text-sm text-black rounded-lg bg-indigo-50 outline-teal-500"
                placeholder="Хайх барааны нэрийг бичнэ үү"
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
            </form>
            <div className="absolute inset-y-0 right-3 flex items-center pl-3 ">
              <AiOutlineClose
                className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                onClick={clearSearchQuery}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-7 "
            >
              {/* <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <a href="/">Бүтээгдэхүүн</a>
              </li> */}
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <a href="/About">Бидний тухай</a>
              </li>
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <a href="/ProgrammInfo">Программ</a>
              </li>
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <a href="/Contact">Холбоо барих</a>
              </li>
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <a href="/Download">Татах</a>
              </li>

              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                {/* <button
                  onClick={lanClick}
                  className="flex items-center justify-between px-2 w-16 h-8 rounded-full border border-green-800 "
                >
                  <div className={`fi fis fi-${selLan} rounded-full`} />
                  <div>
                    {isOpenLan ? (
                      <AiOutlineUp size={17} className="fill-green-800" />
                    ) : (
                      <AiOutlineDown size={17} className="fill-green-800" />
                    )}
                  </div>
                </button> */}
                {/* {isOpenLan && (
                  <div className="absolute right-[230px] top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-36">
                    <ul
                      className="py-2 text-sm text-gray-600"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {languages.map((language) => (
                        <button onClick={() => handleChangeLanguage(language)}>
                          <li
                            key={language.id}
                            value={language.code}
                            className="flex h-10 w-36 px-5 items-center"
                          >
                            <div
                              className={`fi fis fi-${language.flag} rounded-full mr-3`}
                            ></div>
                            {language.label}
                          </li>

                          {languages[languages.length - 1] === language ? (
                            ""
                          ) : (
                            <div className="border-b border-gray-400 mx-8 " />
                          )}
                        </button>
                      ))}
                    </ul>
                  </div>
                )} */}
              </li>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <li>
                  {userInfo == null ? (
                    <button
                      data-variant="normal"
                      className="text-white bg-green-800 inline-flex items-center justify-center shrink-0 leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-accent-700 bg-accent text-light border border-transparent hover:bg-accent-hover px-3 py-0 h-9 text-sm font-semibold"
                    >
                      <a href="/LoginPage">Нэвтрэх</a>
                    </button>
                  ) : (
                    <a
                      href="/Profile"
                      className="flex gap-5 border rounded-md p-1 border-green-800"
                    >
                      {userInfo.TCImage != null ? (
                        <Avatar
                          src={<img src={userInfo.TCImage} alt="avatar" />}
                        />
                      ) : (
                        <FaUser size={25} color="green" />
                      )}
                      {userInfo.TCEmail}
                    </a>
                  )}
                  {/* <GoogleLogOutBtn /> */}
                </li>
              </div>
            </motion.ul>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm pt-6">
          <button
            onClick={menuClick}
            className="flex ml-10 h-8 shrink-0 justify-center items-center text-sm font-semibold text-heading focus:outline-0 xl:px-4 rounded border-border-200 bg-green-800 xl:min-w-150 xl:border xl:text-white"
          >
            <div>
              <Hamburger toggled={isOpen} size={20} />
            </div>
            <div>Ангилал</div>
          </button>
          {/* <a href="/ProductCat/1/0" className="hover:text-green-800">
            Кассын машин
          </a>
          <a href="/ProductCat/6/1" className="hover:text-green-800">
            Киоск машин
          </a>
          <a href="/ProductCat/3/0" className="hover:text-green-800">
            Талон хэвлэгч
          </a>
          <a href="/ProductCat/2/0" className="hover:text-green-800">
            Баар код уншигч
          </a>
          <a href="/ProductCat/5/0" className="hover:text-green-800">
            Цаас
          </a>
          <a href="/ProductCat/4/6" className="hover:text-green-800">
            Карт хэвлэгч
          </a> */}

          {filteredGroup.map((item) => (
            <a
              href={`/ProductCat/${item.catId}/0`}
              className="hover:text-green-800"
              key={item.catId}
            >
              {item.catName}
            </a>
          ))}
          {dBDiscount.length != 0 ? (
            <a
              href={`/ProductCat/disc/0`}
              className="text-red-600 font-bold hover:text-green-800"
              key="disc"
            >
              Хямдралтай бараа
            </a>
          ) : (
            <div></div>
          )}
          {/* <a href="http://202.131.237.185:3030/">Хуучин Сайт</a> */}
          {userInfo != null ? (
            userInfo.TCUserType == "Admin" ? (
              <a
                href={`/admin/order/`}
                className="text-green-800 font-bold hover:text-green-700"
                key="disc"
              >
                Сайт Захиалга
              </a>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* <div
        className={`fixed left-0 right-0 top-36 bottom-0 ${
          isOpen ? "backdrop-blur-sm" : "backdrop-blur-none"
        } duration-500`}
      > */}
      {isOpen && <CategoryDtl dBgroup={dBgroup} />}
      {/* </div> */}
      {/* mobile */}
      {idCode != "login" ? (
        <div className="flex items-center md:hidden w-full h-full justify-between py-3">
          {isLocked && (
            <div
              className={`fixed left-0 right-0 top-0 bottom-0 ${
                isLocked ? "backdrop-blur-sm" : "backdrop-blur-none"
              } duration-500`}
            ></div>
          )}
          <div
            className={`fixed h-screen bottom-0 top-0 left-0${
              isLocked ? " bg-white w-3/4" : "w-0"
            } duration-500`}
          >
            {isLocked ? (
              <div className="h-full mt-20 border-t border-gray-300">
                <CategoryDtlMobile dBgroup={dBgroup} />
              </div>
            ) : (
              ""
            )}
            {/* {isLocked ? (
              <div className="mt-3 ml-9 mr-6 grid">
                <CategoryDtlMobile dBgroup={dBgroup} />
              </div>
            ) : (
              ""
            )} */}
          </div>
          <button
            onClick={toggle}
            className="flex h-full items-center justify-center p-2  focus:text-accent focus:outline-0"
            tabindex="0"
          >
            <Hamburger toggled={isLocked} size={25} />
          </button>
          <Link to={"/"} className="relative flex items-center">
            <img src={Logo} className="w-36 object-cover" alt="logo" />
            {/* <div className="absolute top-0 left-0 transform -translate-x-3 -translate-y-6 -rotate-45">
              <img
                src={hat} // Банткийн зургийн замыг энд оруулна
                alt="Бэлэгний бантик"
                className="w-10 h-10" // Зургийн хэмжээг өөрчлөх
              />
            </div> */}
          </Link>

          <Link to={"/PayOut"}>
            <button
              className="product-cart relative flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0"
              tabindex="0"
            >
              <span className="sr-only">Cart</span>
              <MdLocalGroceryStore className="fill-green-800" size={32} />
              <span className="absolute bottom-6 right-0  mt-0.5 rounded-full bg-slate-100 py-1 px-1.5 text-10px font-semibold leading-none ">
                {cart.length}
              </span>
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
      {/* <div
        className={`fixed z-50 h-screen bottom-0 top-0 left-0 bg-slate-300  ${
          isLocked ? "w-3/4" : "w-0"
        } duration-500`}
      >
        <button
          onClick={toggle}
          className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-0"
          tabindex="0"
        >
          <span className="sr-only">Burger Menu</span>
          <Hamburger toggled={isLocked} size={25} />
        </button>
        <button onClick={toggle} className="justify-center">
          {isLocked ? "Unlock" : "Lock"}
        </button>
      </div> */}
    </header>
  );
};

export default Header;
