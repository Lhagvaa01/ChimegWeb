import { BsFillInfoCircleFill, BsFillTelephoneForwardFill } from "react-icons/bs";
import { GrMap } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
export const MobileFooter = [
    {
      key: "sub1",
      label: "БИДНИЙ ТУХАЙ",
      icon: <BsFillInfoCircleFill />,
      children: [
        {
          key: "1",
          label: "Бидний тухай",
        },
        {
          key: "2",
          label: "Программ",
        }
      ],
    },
    {
      key: "sub2",
      label: "ХОЛБОО БАРИХ",
      icon: <BsFillTelephoneForwardFill />,
      children: [
        {
          key: "3",
          label: "7766-9002",
        },
        {
          key: "4",
          label: "sales@chimeg",
        }
      ],
    },
    {
      key: "sub3",
      label: "ХАЯГ",
      icon: <GrMap />,
      children: [
        {
          key: "5",
          label: "Улаанбаатар Бгд 1-р хороо төмөр зам Богд ар хороолол тавин ус эмийн сангийн замын эсрэг талд",
        }
      ],
    },,
    {
      key: "sub4",
      label: "ЦАГИЙН ХУВААРЬ",
      icon: <CiCalendar />,
      children: [
        {
            key: "6",
            label: "Даваа - Баасан - /09:00 - 18:00",
        },
        {
            key: "7",
            label: "Бямба - /10:00 - 17:00/",
        },
        {
            key: "8",
            label: "Ням - /Амарна/",
        }
      ],
    },
  ];