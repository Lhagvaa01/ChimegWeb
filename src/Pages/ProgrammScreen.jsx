import React, { useState, useEffect } from "react";
import { GetApi } from "../constant/Api";
import { errorToast } from "../constant/ReacrToast";
import Aravt from "../images/Aravt.jpg";
import Smart from "../images/SmartLogic.jpg";
import Dayan from "../images/Dayansoft.png";
import Masu from "../images/Masu.jpg";
import TailwindButton from "../components/customButton";

const ProgrammScreen = () => {
  let url = "http://202.131.237.185:3030/program-info/";

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    GetApi(`program-info/`)
      .then((val) => {
        setPrograms(val || []);
      })
      .catch((error) => {
        errorToast("Error fetching partners:" + error);
      });
  }, []);

  return (
    <div className="md:mt-40  mt-24 md:mx-0 mx-8 h-full">
      <div className="flex font-bold md:text-4xl text-lg justify-center">
        Хамтрагч программ хангамжууд
      </div>
      <div className="flex justify-center">
        <div className="w-1/5 md:mt-10 my-4 border-b border-green-800"></div>
      </div>
      <div className="md:mx-44 md:mt-10 md:mb-32">
        <ul className="grid md:grid-cols-2 gap-4">
          {programs.map((program) => (
            <li className="bg-white shadow-lg border rounded-3xl border-transparent">
              <div className="p-5 ">
                <img
                  alt=""
                  loading="lazy"
                  className="h-full max-h-[340px] w-full md:h-[550px] border rounded-lg shadow-lg"
                  decoding="async"
                  data-nimg="1"
                  src={`http://202.131.237.185:3030${program.image}`}
                />
                <div className="font-semibold text-lg pt-5 px-5">
                  {program.name}
                </div>
                <div className="pt-3 px-5">{program.description}</div>
                <div className="flex px-5">
                  <div className="font-semibold mr-1">Холбоо барих:</div>
                  <div>{program.contact}</div>
                </div>
                <div className="pt-5 pl-5">
                  <a href={program.website_url} target="_blank">
                    {/* <Button className="bg-green-800 hover:scale-110 ">
                  Site-аар зочлох
                </Button> */}
                    <TailwindButton
                      color="green" // Material Tailwind Prop for Button Color
                      size="md" // Material Tailwind Prop for Button Size
                      className="hover:scale-110" // Adding hover scale class
                      ripple="light" // Adding ripple effect
                    >
                      Site-аар зочлох
                    </TailwindButton>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgrammScreen;
