import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NumberFormatExample from "../constant/NumberFormatExample";

import noImg from "../images/no-image.png";

import tie from "../images/tie.png";
import CustomButtonMain from "../components/CustomButtonMain";

export default function Product({ item, addProductToCart }) {
  return (
    // <div className="card">
    //   <img className="product--image" src={item.url} alt="product image" />
    //   <h2>{item.name}</h2>
    //   <p className="price">{item.price}</p>
    //   <p>{item.description}</p>
    //   <p>
    //     <button>Add to Cart</button>
    //   </p>
    // </div>
    <div
      key={item?.id}
      className="mr-3 h-fit group product-card cart-type-neon  transform overflow-hidden rounded border border-border-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow "
    >
      <Link
        to={{
          pathname: `/product-detail/${item.itemCode}`,
          // state: { productData: item },
        }}
        className="relative flex h-32   w-auto cursor-pointer items-center justify-center  overflow-hidden"
      >
        <span className="sr-only">Product Image</span>

        <img
          alt="Apples"
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          className={
            item.imgs[0] != null
              ? "object-contain w-full h-20 md:h-full"
              : "object-contain w-50% h-20 md:h-50%"
          }
          sizes="(max-width: 768px) 100vw"
          src={item.imgs[0] != null ? item.imgs[0] : noImg}
        />
        <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-lime-600 text-white py-2 px-5">
            Дэлгэрэнгүй
          </button>
        </div>
        {item.discountPrice !== 0 && (
          <div className="absolute top-3 text-center bg-green-800 right-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white sm:px-2 md:top-4 md:px-2.5">
            {/* <div>Хямдралтай</div> */}
            <div className="flex font-bold">
              -{NumberFormatExample(item.price - item.discountPrice)}₮
            </div>
          </div>
        )}
        {item.qty === 0 && (
          <div className="absolute top-3 text-center bg-red-600 right-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white sm:px-2 md:top-4 md:px-2.5">
            {/* <div>Хямдралтай</div> */}
            <div className="flex font-bold">Дууссан</div>
          </div>
        )}
        {item.promotionalProducts?.length > 0 && (
          <div>
            <div className="absolute top-3 text-center bg-green-800 left-3 md:left-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white sm:px-2 md:top-4 md:px-2.5">
              {/* <div>Хямдралтай</div> */}
              <div className="flex font-bold">Бэлэгтэй</div>
            </div>
            <div className="absolute top-0 left-0 -rotate-45">
              <img
                src={tie} // Банткийн зургийн замыг энд оруулна
                alt="Бэлэгний бантик"
                className="w-10 h-10" // Зургийн хэмжээг өөрчлөх
              />
            </div>
          </div>
        )}
        {/* <div className="absolute top-3 rounded bg-accent px-1.5 text-xs font-semibold leading-6 text-white ltr:right-3 rtl:left-3 sm:px-2 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4"> 20% </div> */}
      </Link>
      <header className="p-3 md:p-6">
        <div className="mb-2 flex items-center">
          {item.discountPrice === 0 ? (
            <span className="flex text-sm font-semibold text-heading md:text-base">
              {NumberFormatExample(item.price)}₮
            </span>
          ) : (
            <div className="grid md:flex ">
              <span className="flex text-sm line-through text-red-600 font-semibold  md:text-base">
                {NumberFormatExample(item.price)}₮
              </span>
              <div className="px-2 hidden md:block">/</div>
              <span className="flex text-sm font-bold text-green-800 text-heading md:text-base">
                {NumberFormatExample(item.discountPrice)}₮
              </span>
            </div>
          )}
        </div>
        <h3 className="cursor-pointer truncate text-xs text-body md:text-sm">
          {item.name}
        </h3>

        <div className="mb-2">
          Үлд:{" "}
          {item.catId[0] == 5 && item.qty > 200
            ? "200+"
            : item.qty > 10
            ? "10+"
            : item.qty}
          ш
        </div>
        <div>
          <CustomButtonMain
            onClick={() => addProductToCart(item, item.color_variants[0], 1)}
            ismain={true}
          >
            Сагслах
          </CustomButtonMain>
          {/* <button
            onClick={() => addProductToCart(item, item.color_variants[0], 1)}
            id="add-btn"
            className="group flex h-7 w-full items-center justify-between rounded bg-gray-100 text-xs text-body-dark transition-colors hover:border-green-800 hover:bg-green-800 hover:text-white focus:border-green-800 focus:bg-green-800 focus:text-white focus:outline-0 md:h-9 md:text-sm"
          >
            <span className="flex-1">Сагслах</span>
            <span className="grid h-7 w-7 place-items-center bg-gray-200 transition-colors duration-200 group-hover:bg-green-700 group-focus:bg-green-700 ltr:rounded-tr ltr:rounded-br rtl:rounded-tl rtl:rounded-bl md:h-9 md:w-9">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </span>
          </button> */}
        </div>
      </header>
    </div>
  );
}
