import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/RepHeader";
import MainDetails from "../components/RepMainDetails";
import ClientDetails from "../components/RepClientDetails";
import Totals from "../components/RepTotals";
import Table from "../components/RepTable";
import Footer from "../components/RepFooter";
import ReactToPrint from "react-to-print";
import axios from "axios";
import jsPDF from "jspdf";
import { PostApi, PostApi2, GetApi } from "../constant/Api";
import secureLocalStorage from "react-secure-storage";

const PriceOffer = ({ products, tot, dBCompany }) => {
  const componentRef = useRef();
  const location = useLocation();

  const [reEmail, setReEmail] = useState("zayalhagva6@gmail.com");
  const [sub, setSub] = useState("Hello");
  const [message, setmessage] = useState("Test Lhagvaah");
  const { companyName, companyRegister, companyPhone, companyMail } =
    location.state;

  useEffect(() => {
    // const pdfUrl = "https://invoice.kacc.mn/media/Downloads/Talkh_chikher.pdf";
    // window.open(pdfUrl, "_blank");
    // console.log(companyName, companyRegister, companyPhone, companyMail);
    // console.log(dBCompany);
  }, [companyName, companyRegister, companyPhone, companyMail, dBCompany]);

  const handlePrint = () => {
    if (componentRef.current) {
      const content = componentRef.current.innerHTML;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.html(content, {
        callback: async function () {
          // Once PDF is rendered, access its pages
          const numPages = pdf.internal.pages.length;
          for (let i = 1; i <= numPages; i++) {
            const page = pdf.internal.pages[i - 1];
            // Do something with the page
            // console.log("Page " + i, page);
          }
        },
      });
    } else {
      alert("Error: componentRef is not set.");
    }
  };

  const sendPdfMail = (ref) => {
    const content = componentRef.current.innerHTML;

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.html(content, {
      callback: async function () {
        // Once PDF is rendered, access its pages
        const numPages = pdf.internal.pages.length;
        for (let i = 1; i <= numPages; i++) {
          const page = pdf.internal.pages[i - 1];
          // Do something with the page
          // console.log("Page " + i, page);
        }
      },
    });
    // const pdfContent = ref.innerHTML; // Get the PDF content
    PostApi("/save-pdf/", { pdf_content: pdf });
  };

  const sendPdfMail2 = async () => {
    if (componentRef.current) {
      const content = componentRef.current.innerHTML;
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.html(content, {
        callback: async function () {
          try {
            const pdfContent = pdf.output("blob"); // Get the PDF blob

            // console.log("PDF Content:", pdfContent);

            // Check if PDF content is available
            if (pdfContent) {
              // Make API request to send email with PDF attachment
              await PostApi2("save-pdf/", { pdf_content: pdfContent }); // Remove the leading slash
              alert("Message Sent");
            } else {
              alert("PDF content is missing");
            }
          } catch (error) {
            alert("Failed to send the email");
            console.error("Error:", error);
          }
        },
      });
    } else {
      alert("Error: componentRef is not set.");
    }
  };

  const [orderNum, setOrderNum] = useState(() => {
    const orderNum = secureLocalStorage.getItem("orderNum");
    return orderNum ? JSON.parse(orderNum) : null;
  });

  return (
    <div className="print-scale mx-44 mt-44 mb-32 bg-white p-5 rounded-2xl border-4 border-blue-200">
      <div>
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
              Print / Download
            </button>
          )}
          content={() => componentRef.current}
          onBeforePrint={handlePrint}
        />
      </div>

      <button onClick={() => sendPdfMail2()}>Send Email</button>
      <div ref={componentRef} className="p-5">
        <Header />
        <MainDetails />
        <ClientDetails
          companyName={companyName}
          companyRegister={companyRegister}
          companyPhone={companyPhone}
          companyMail={companyMail}
          dBCompany={dBCompany}
        />
        <div className="flex">
          <div>Гүйлгээний утга:</div>
          <div className="border-b text-red-700 ml-3">
            [{orderNum}, {companyRegister}] гэсэн бүтэцтэй байна.
          </div>
        </div>
        <div className="border-b text-red-700 mb-3">
          Гүйлгээний утга зөв бичсэн тохиолдолд захиалга баталгаажиж 48-цагын
          дотор хүргэлтэнд гарна.
        </div>
        <Table products={products} tot={tot} />
        <Totals tot={tot} />
        <Footer dBCompany={dBCompany} />
      </div>
    </div>
  );
};

export default PriceOffer;
