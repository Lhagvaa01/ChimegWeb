import React from "react";
import { BiSupport, BiCalendarCheck } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <div>
      <div className="md:mt-40 mt-24 h-full md:mx-44">
        <div className="flex font-bold text-4xl justify-center">
          Холбоо барих
        </div>
        <div className="flex justify-center">
          <div className="w-36 mt-6 border-b border-green-800"></div>
        </div>
        <div className="mt-10 md:flex md:flex-row mb-16 font-semibold ">
          <div className="grid md:w-1/4 w-full md:mx-0 mx-10">
            <div className="md:mb-0 mb-16">
              <div className="flex text-xl mb-3 items-center justify-start">
                <BiSupport className="fill-green-800 scale-125" />
                <span className="inline-block py-1 px-2 pb-2">
                  Холбоо барих:
                </span>
              </div>
              <div>Утас: 7766-9002</div>
              <div>Мэйл хаяг: sales@chimeg.mn</div>
              <div>Facebook: chimeg.mn</div>
            </div>
            <div className="w-full">
              <div className="flex text-xl mb-3 items-center justify-start">
                <BiCalendarCheck className="fill-green-800 scale-125" />
                <span className="inline-block py-1 px-2 pb-2">
                  Цагийн хуваарь:
                </span>
              </div>
              <div>Даваа - Баасан - /09:00 - 18:00/</div>
              <div>Бямба - /10:00 - 17:00/</div>
              <div>Ням - /Амарна/</div>
            </div>
          </div>
          <div className="md:h-96 md:mt-6 md:border-l md:border-green-800"></div>
          <div className="md:w-full md:ml-12 md:mx-0 mx-10">
            <div className="md:flex md:text-xl mb-3 items-center justify-start">
              <div className="flex items-center justify-start">
                <MdLocationOn className="fill-green-800 scale-125" />
                Хаяг:{" "}
              </div>
              <span className="inline-block py-1 px-2 pb-2 md:text-xl text-sm ">
                Улаанбаатар Бгд 1-р хороо төмөр зам Богд ар хороолол тавин ус
                эмийн сангийн замын эсрэг талд
              </span>
            </div>
            <div>
              <iframe
                className="mt-10 w-full md:h-[400px] h-96"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=KACC.MN Kassiin mashinii hudaldaa&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Contact;
