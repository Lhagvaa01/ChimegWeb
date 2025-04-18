import React, { useState, useEffect } from "react";
import { BsFacebook } from "react-icons/bs";
import footerJs from "../data/footer.json";
import { MobileFooter } from "../data/MoblieFooter";
import { MdPhone, MdMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";

const Footer = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("1");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    // console.log(e.key === "1");
    if (e.key === "1") {
      navigate(`/About`);
      window.scrollTo(0, 0);
    } else if (e.key === "2") {
      navigate(`/ProgrammInfo`);
      window.scrollTo(0, 0);
    }
    setCurrent(e.key);
  };
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [idCode, setidCode] = useState("");
  useEffect(() => {
    setidCode(window.location.pathname.split("/")[1].toLowerCase());
  }, []);
  return (
    <footer className="w-full bg-slate-100">
      <div className="hidden md:grid mx-auto w-full max-w-7xl px-8">
        <div className="mx-auto grid w-full grid-cols-3 gap-8 py-12 md:grid-cols-3 lg:grid-cols-4">
          {footerJs.map(({ title, links }, key) => (
            <div key={key} className="w-full">
              <p className="mb-4 font-bold uppercase opacity-50">{title}</p>
              <ul className="space-y-1">
                {links.map((link, key) => (
                  <p key={key} className="font-normal">
                    {link[0] === "Бидний тухай" ||
                    link[0] === "Программ" ||
                    link[1] === "partner" ? (
                      <a
                        href={"/" + link[1]}
                        className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                      >
                        {link[0]}
                      </a>
                    ) : title === "ХОЛБОО БАРИХ" ? (
                      link[0] === "7766-9002" ? (
                        <div className="flex items-center justify-start">
                          <MdPhone className="fill-green-800 scale-125" />
                          <span className="inline-block py-1 px-2 pb-2">
                            {link[0]}
                          </span>
                        </div>
                      ) : link[0] === "sales@chimeg.mn" ? (
                        <div className="flex items-center justify-start">
                          <MdMail className="fill-green-800 scale-125" />
                          <span className="inline-block py-1 px-2 pb-2">
                            {link[0]}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-block py-1 pr-2">
                          {link[0]}
                        </span>
                      )
                    ) : (
                      <span className="inline-block py-1 pr-2">{link[0]}</span>
                    )}
                  </p>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-green-800 py-4 md:flex-row md:justify-between">
          <div className="flex w-full md:justify-between mr-5">
            <p className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
              &copy; {currentYear}{" "}
              <a href="http://202.131.237.185:3030/">Chimeg.mn</a>. Бүх эрх
              хуулиар хамгаалагдсан.
            </p>
            <p className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
              POWERED BY Chimeg.mn
            </p>
          </div>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <a
              href="https://www.facebook.com/profile.php?id=61567163662419"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <BsFacebook />
            </a>
          </div>
        </div>
      </div>
      {idCode !== "login" ? (
        <div className="md:hidden mb-10 w-full">
          <Menu
            onClick={onClick}
            style={{ width: "100%" }}
            mode="inline"
            items={MobileFooter}
          />
          <div className="flex w-full flex-col items-center justify-center border-t border-green-800 py-4 md:flex-row md:justify-between">
            <div className="flex w-full md:justify-between justify-center mr-5">
              <p className="mb-4 text-center text-xs font-normal text-blue-gray-900 md:mb-0">
                &copy; {currentYear}{" "}
                <a href="http://202.131.237.185:3030/">Chimeg.mn</a>. Бүх эрх
                хуулиар хамгаалагдсан.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </footer>
  );
};

export default Footer;
