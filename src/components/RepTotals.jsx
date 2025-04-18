import NumberFormatExample from "../constant/NumberFormatExample";
import numberToMongolianText from "../constant/NumberToText";

export default function Totals({ tot }) {
  const priceCalc = (action) => {
    const noVat = (tot / 1.1).toFixed(0);
    const vat = (tot - noVat).toFixed(0);
    const total = tot.toFixed(0);
    switch (action) {
      case "NoVat":
        return NumberFormatExample(parseInt(noVat));
      case "Vat":
        return NumberFormatExample(parseInt(vat));
      case "Total":
        return NumberFormatExample(parseInt(total));
    }
  };

  return (
    <>
      <article className="flex w-full justify-between">
        <div className="flex w-2/3 h-14 px-5  pt-5">
          <div className="w-44"> Мөнгөний дүн: </div>
          <div className="border-b w-full border-gray-700">
            {numberToMongolianText(tot)}
          </div>
        </div>
        <div className="flex-row justify-between border w-96 mb-14">
          <ul>
            <li className="flex p-1 w-full justify-between">
              <span className="font-bold w-1/2 border-r">Дүн /НӨАТ-гүй/:</span>
              <span>{priceCalc("NoVat")}</span>
            </li>
            <li className="flex p-1 w-full justify-between bg-gray-100 ">
              <span className="font-bold w-1/2 border-r">НӨАТ:</span>{" "}
              <span>{priceCalc("Vat")}</span>
            </li>
            <li className="flex p-1 w-full justify-between ">
              <span className="font-bold w-1/2 border-r">
                Нийт дүн /НӨАТ-тэй/
              </span>
              <span>{priceCalc("Total")}</span>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
