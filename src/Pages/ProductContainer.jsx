import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { Link } from "react-router-dom";
import NumberFormatExample from "../constant/NumberFormatExample";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Product from "../components/Product";
import { responsive } from "../data/data";
import noImg from "../images/no-image.png";
import tie from "../images/tie.png";
import CustomButtonMain from "../components/CustomButtonMain";

const LazyProduct = React.lazy(() => import("../components/Product"));

const ProductContainer = ({
  addProductToCart,
  dBproduct = [], // Default to empty array if undefined
  dBgroup = [], // Default to empty array if undefined
  isMain,
  dBDiscount,
}) => {
  const [showDots, setShowDots] = useState(window.innerWidth > 640);

  // Memoize groups to avoid recalculating
  const filteredGroups = useMemo(() => {
    return dBgroup.map((Gitem) => ({
      ...Gitem,
      products: dBproduct.filter(
        (item) => item.catId?.[0] === Gitem.catId && item.qty > 0
      ),
    }));
  }, [dBgroup, dBproduct]);

  // Update media for showDots based on screen size
  const updateMedia = useCallback(() => {
    setShowDots(window.innerWidth > 640);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [updateMedia]);

  const renderCarousel = useCallback(
    (products) => {
      return products.length > 0 ? (
        <Carousel
          showDots={showDots}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          className="z-10"
        >
          {products.map((item) => (
            // <Product
            //   key={item.id}
            //   addProductToCart={addProductToCart}
            //   item={item}
            // />
            <Suspense fallback={<div>Түр хүлээнэ үү...</div>} key={item.id}>
              <LazyProduct addProductToCart={addProductToCart} item={item} />
            </Suspense>
          ))}
        </Carousel>
      ) : (
        <div>Тухайн тасагт бараа бүртгэгдээгүй байна</div>
      );
    },
    [showDots, addProductToCart]
  );

  return (
    <section className="mx-5 " id="Cart">
      <div className="col-span-5 sm:col-span-4">
        {isMain ? (
          <div className="w-full h-fit">
            {filteredGroups.map((Gitem) => (
              <div key={Gitem.catId} className="mb-6 md:mb-10">
                <div className="flex flex-row justify-between items-start md:items-end">
                  <div className="text-lg font-semibold md:text-2xl mb-1 md:mb-0">
                    {Gitem.catName}
                  </div>
                  <div className="text-sm md:text-lg hover:text-green-800">
                    <Link to={`/ProductCat/${Gitem.catId}/0`}>
                      ...Бүгдийг харах
                    </Link>
                  </div>
                </div>
                <div className="pb-4 md:pb-8">
                  <div className="w-full border-b border-green-800"></div>
                </div>
                {renderCarousel(Gitem.products)}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dBproduct?.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded shadow-sm transition-transform duration-300 hover:transform hover:scale-105"
              >
                <Link
                  to={`/product-detail/${item.itemCode}`}
                  className="relative block overflow-hidden"
                >
                  <img
                    alt={item.name}
                    src={item.imgs?.[0] || noImg} // Optional chaining for imgs
                    loading="lazy"
                    className="object-contain w-full h-32 sm:h-48 md:h-64"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <button className="bg-lime-600 text-white py-2 px-5">
                      Дэлгэрэнгүй
                    </button>
                  </div>
                  {item.discountPrice > 0 && (
                    <div className="flex absolute top-3 right-3 bg-green-800 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{NumberFormatExample(item.price - item.discountPrice)}₮
                    </div>
                  )}
                  {item.qty === 0 && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      Дууссан
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
                </Link>
                <div className="p-3">
                  <div className="grid items-center justify-between mb-2">
                    {item.discountPrice > 0 ? (
                      <div className="grid md:flex">
                        <span className="flex line-through text-red-600 text-sm">
                          {NumberFormatExample(item.price)}₮
                        </span>
                        <span className="flex font-bold text-green-800 text-lg">
                          {NumberFormatExample(item.discountPrice)}₮
                        </span>
                      </div>
                    ) : (
                      <span className="flex font-bold text-lg">
                        {NumberFormatExample(item.price)}₮
                      </span>
                    )}
                    <div className="mb-2">
                      Үлд:{" "}
                      {item.catId[0] == 5 && item.qty > 200
                        ? "200+"
                        : item.qty > 10
                        ? "10+"
                        : item.qty}
                      ш
                    </div>
                  </div>
                  <h3 className="text-sm truncate mb-2">{item.name}</h3>
                  <CustomButtonMain
                    onClick={() =>
                      addProductToCart(item, item.color_variants?.[0], 1)
                    }
                    ismain={false}
                  >
                    Сагслах
                  </CustomButtonMain>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductContainer;
