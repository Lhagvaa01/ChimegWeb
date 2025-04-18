// import { State } from "../context/stateContext";

export default function ClientDetails({
  companyName,
  companyRegister,
  companyPhone,
  companyMail,
  dBCompany,
}) {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFutureDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <section className="grid grid-cols-2 mt-10 mb-5">
        <div>
          <h2 className="text-xl font-bold mb-5">Нэхэмжлэгч:</h2>
          <ul className="pr-10">
            <li className="flex justify-between">
              <div>Байгууллагын нэр:</div>
              <div className="border-b w-[55%]">
                {dBCompany[0].TCCompanyName}
              </div>
            </li>
            <li className="flex justify-between">
              <div>Хаяг:</div>
              <div className="border-b w-[55%]">{dBCompany[0].TCAddress}</div>
            </li>
            <li className="flex justify-between">
              <div>Утас, Факс:</div>
              <div className="border-b w-[55%]">{dBCompany[0].TCPhone}</div>
            </li>
            <li className="flex justify-between">
              <div>И-Мэйл:</div>
              <div className="border-b w-[55%]">{dBCompany[0].TCEmail}</div>
            </li>
            <li className="flex justify-between">
              <div>Банкны нэр:</div>
              <div className="border-b w-[55%]">{dBCompany[0].TCBankName}</div>
            </li>
            <li className="flex justify-between">
              <div>Банкны дансны дугаар:</div>
              <div className="border-b w-[55%]">
                {dBCompany[0].TCBankAccountID}
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-5">Төлөгч:</h2>
          <ul className="pr-10">
            <li className="flex justify-between">
              <div>Байгууллагын нэр:</div>
              <div className="border-b w-[55%]">{companyName}</div>
            </li>
            <li className="flex justify-between">
              <div>Хаяг:</div>
              <div className="border-b w-[55%]"></div>
            </li>
            <li className="flex justify-between">
              <div>Гэрчилгээний №:</div>
              <div className="border-b w-[55%]">{companyRegister}</div>
            </li>
            <li className="flex justify-between">
              <div>Нэхэмжилсэн огноо:</div>
              <div className="border-b w-[55%]">{getCurrentDate()}</div>
            </li>
            <li className="flex justify-between">
              <div>Төлбөр хийх хугацаа:</div>
              <div className="border-b w-[55%] text-red-700">
                {getFutureDate()} - Хүртэл хүчинтэй
              </div>
            </li>
            <li className="flex justify-between">
              <div>Утас:</div>
              <div className="border-b w-[55%]">{companyPhone}</div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
