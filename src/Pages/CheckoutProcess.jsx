import React, { useState } from "react";
import Payout from "./PayOut";
import OrderAddress from "../components/OrderAddress";
import Payments from "../components/Payments";
import Bank from "../components/Bank";

const steps = ["Payout", "Order Address", "Payments", "Bank"];

const CheckoutProcess = ({
  products,
  tot,
  dBgroup,
  dBproduct,
  onQuantityChange,
  onProductClear,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Payout
            products={products}
            tot={tot}
            dBgroup={dBgroup}
            onQuantityChange={onQuantityChange}
            onProductClear={onProductClear}
          />
        );
      case 1:
        return (
          <OrderAddress products={products} tot={tot} dBproduct={dBproduct} />
        );
      case 2:
        return <Payments products={products} tot={tot} />;
      case 3:
        return (
          <Bank products={products} tot={tot} onProductClear={onProductClear} />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Step Progress Bar */}
      <div className="flex items-center justify-between mb-8 mt-44 mx-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center w-full">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            <div className="flex-1 h-1 bg-gray-300">
              {index < currentStep && (
                <div className="h-1 bg-blue-500 w-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Render Current Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={goToPreviousStep}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Өмнөх алхам
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            onClick={goToNextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Дараагийн алхам
          </button>
        ) : (
          <button
            onClick={() => alert("Checkout process completed!")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Төлбөр дуусгах
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProcess;
