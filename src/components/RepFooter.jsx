export default function Footer({ dBCompany }) {
  return (
    <>
      <footer className="footer pt-5 relative">
        <img
          src={dBCompany[0].TCStampImage}
          alt="Description of image"
          className="mx-auto mt-5 z-10 left-1/3 "
        />
        <div className="z-10 top-0 absolute h-full flex items-center justify-start ">
          <div>
            <ul className="  ">
              <li className="grid grid-cols-2 mx-44">
                <span className="font-bold ">Нэхэмжлэл хүлээн авагч:</span>
                <span className="font-bold">//</span>
              </li>
              <li className="grid grid-cols-2 mx-44">
                <span className="font-bold">Нэхэмжлэгч:</span>
                <span className="font-bold">//</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
