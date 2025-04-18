import React, { useState, useEffect } from "react";
import { GetApi } from "../constant/Api";
import { errorToast } from "../constant/ReacrToast";
import TailwindButton from "../components/customButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Modal from "react-modal";

const Partnet = () => {
  const [partners, setPartners] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    GetApi(`partners/`)
      .then((val) => {
        setPartners(val || []);
      })
      .catch((error) => {
        errorToast("Error fetching partners:" + error);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Гар утас дээр 1 зураг
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 640, // sm breakpoint (гар утас)
        settings: {
          slidesToShow: 1, // Гар утсанд 1 зураг
        },
      },
      {
        breakpoint: 768, // md breakpoint (таблет)
        settings: {
          slidesToShow: 2, // Таблет дээр 2 зураг
        },
      },
      {
        breakpoint: 1024, // lg breakpoint (том дэлгэц)
        settings: {
          slidesToShow: 3, // Том дэлгэц дээр 3 зураг
        },
      },
    ],
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="pt-24 md:pt-40 px-10 md:px-20 min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-10">
          Хамтран ажиллагч байгууллагууд
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {partner.logo && (
                      <img
                        src={`${partner.logo}`}
                        alt={`${partner.name} Logo`}
                        className="h-12 w-auto mr-4"
                      />
                    )}
                    <h2 className="text-lg md:text-xl font-semibold">
                      {partner.name}
                    </h2>
                  </div>
                  <div>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TailwindButton
                          color="green"
                          size="md"
                          className="hover:scale-110"
                          ripple="light"
                        >
                          Site-аар зочлох
                        </TailwindButton>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  {partner.description}
                </p>
                {partner.images.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {partner.images.map((image, index) => (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => openModal(image.image)}
                      >
                        <img
                          src={image.image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-350 object-contain"
                          style={{ width: "350px", height: "350px" }}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => openModal(partner.images.image)}
                  >
                    <img
                      src={partner.images.image}
                      alt={`Image ${1}`}
                      className="w-full h-350 object-contain"
                      style={{ width: "350px", height: "350px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enlarged Image"
        className="flex items-center justify-center bg-black bg-opacity-50 inset-0 fixed"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        shouldCloseOnOverlayClick={true}
      >
        <div className="relative bg-white p-4 rounded-lg" onClick={closeModal}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={"Enlarged"}
              className="w-full h-450 object-contain"
              style={{ width: "450px", height: "450px" }}
            />
          )}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg"
          >
            Хаах
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Partnet;
