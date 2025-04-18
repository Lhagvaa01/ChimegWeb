export default function Header() {
    return (
      <>
        <header className="">
          <div className="flex justify-between">
            <div className="font-medium text-xl">
              НХМаягт Т-1
            </div>
            <ul className="flex flex-col items-end justify-end">
              <li>Сангийн сайдын 2017-оны 12 дугаар сарын 5</li>
              <li>өдрийн 347 тоот тушаалын хавсралт</li>
            </ul>
          </div>
  
          {/* <div>
            <ul className="flex items-center justify-between flex-wrap">
              <li>
                <button
                  onClick={handlePrint}
                  className="bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
                >
                  Print
                </button>
              </li>
              <li className="mx-2">
                <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                  Download
                </button>
              </li>
              <li>
                <button className="bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300">
                  Send
                </button>
              </li>
            </ul>
          </div> */}
        </header>
      </>
    );
  }
  