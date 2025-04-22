import "./App.css";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "./constant/ReacrToast";
import { APIURL } from "./context/SampleContext";
import secureLocalStorage from "react-secure-storage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomContainer from "./components/BottomContainer";
import SocialContact from "./components/SocialContact";
import CartProductPin from "./components/CartProductPin";
import SearchBar from "./components/searchBar";

// Lazy-load components
const MainContainer = lazy(() => import("./Pages/MainContainer"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const ProgrammScreen = lazy(() => import("./Pages/ProgrammScreen"));
const About = lazy(() => import("./Pages/About"));
const Partner = lazy(() => import("./Pages/Partner"));
const Contact = lazy(() => import("./Pages/Contact"));
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Profile = lazy(() => import("./Pages/Profile"));
const OrderHistory = lazy(() => import("./Pages/OrderHistory"));
const OrderDetail = lazy(() => import("./Pages/OrderDetail"));
const Wishlist = lazy(() => import("./Pages/Wishlist"));
const Download = lazy(() => import("./Pages/Download"));
const ProductCat = lazy(() => import("./Pages/ProductCat"));
const CheckoutProcess = lazy(() => import("./Pages/CheckoutProcess"));
const PayOut = lazy(() => import("./Pages/PayOut"));
const PriceOffer = lazy(() => import("./Pages/PriceOffer"));
const OrderAddress = lazy(() => import("./components/OrderAddress"));
const Payments = lazy(() => import("./components/Payments"));
const Qpay = lazy(() => import("./components/Qpay"));
const Bank = lazy(() => import("./components/Bank"));
const UsersOrder = lazy(() => import("./Pages/UsersOrder"));

export const Context = React.createContext();

const apiClient = axios.create({
  baseURL: `https://${APIURL}/`,
  headers: {
    Authorization: "token 218d68b6dfe280a288a396352f7d720a18a00997",
  },
  // timeout: 5000, // 5 секунд хүлээх
});

function App() {
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [productsInCart, setProducts] = useState(
    JSON.parse(secureLocalStorage.getItem("shopping-cart")) || []
  );

  const totalPrice = useMemo(
    () =>
      productsInCart.reduce(
        (acc, item) => acc + item.count * (item.discountPrice || item.price),
        0
      ),
    [productsInCart]
  );

  useEffect(() => {
    secureLocalStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  const addProductToCart = useCallback(
    (product, selectedColor, quantity) => {
      const itemIndex = productsInCart.findIndex(
        (item) =>
          item.itemCode === product.itemCode &&
          item.selectedColor?.id === selectedColor?.id
      );

      if (selectedColor.qty >= quantity) {
        if (itemIndex !== -1) {
          const existingItem = productsInCart[itemIndex];
          const updatedCount = existingItem.count + quantity;

          if (selectedColor.qty >= updatedCount) {
            const updatedItem = { ...existingItem, count: updatedCount };
            const updatedCart = [...productsInCart];
            updatedCart[itemIndex] = updatedItem;
            setProducts(updatedCart);
            successToast(
              `Амжилттай: ${product.name} (${selectedColor.ColorName}) ${quantity} тоо/ш нэмэгдлээ`
            );
          } else {
            errorToast("Уучлаарай үлдэгдэл хүрэхгүй байна");
          }
        } else {
          const newProduct = { ...product, count: quantity, selectedColor };
          setProducts([...productsInCart, newProduct]);
          successToast(
            `Амжилттай: ${product.name} (${selectedColor.ColorName}) сагсанд нэмлээ`
          );
        }
      } else {
        errorToast("Уучлаарай үлдэгдэл хүрэхгүй байна");
      }
    },
    [productsInCart]
  );

  const fetchDataWithFallback = useCallback(
    async ({ endpoint, stateSetter, storageKey }) => {
      // LocalStorage-аас өгөгдөл авна
      const cachedData = secureLocalStorage.getItem(storageKey);
      if (cachedData) {
        stateSetter(JSON.parse(cachedData)); // LocalStorage өгөгдлийг state-д тавина
      }

      try {
        // API-ээс шинэ өгөгдөл татаж авна
        const { data } = await apiClient.get(endpoint);
        stateSetter(data.dtl); // State-д шинэ өгөгдөл тавина
        secureLocalStorage.setItem(storageKey, JSON.stringify(data.dtl)); // Шинэ өгөгдлийг LocalStorage-д хадгална
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    },
    []
  );

  const fetchAllData = useCallback(async () => {
    const endpoints = [
      // {
      //   endpoint: "get_InvoiceSettings/",
      //   stateSetter: setDBCompany,
      //   storageKey: "dBCompany",
      // },
      {
        endpoint: "get_SiteProductNew/0/",
        stateSetter: setDBproduct,
        storageKey: "pd",
      },
      {
        endpoint: "get_GroupHDR/",
        stateSetter: setDBgroup,
        storageKey: "dBgroup",
      },
      {
        endpoint: "get_DiscountProducts/",
        stateSetter: setDBDiscount,
        storageKey: "dBDiscount",
      },
    ];

    try {
      await Promise.all(
        endpoints.map((config) => fetchDataWithFallback(config))
      );
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  }, [fetchDataWithFallback]);

  // const fetchAllData = useCallback(async () => {
  //   const endpoints = [
  //     {
  //       endpoint: "get_InvoiceSettings/",
  //       stateSetter: setDBCompany,
  //       storageKey: "dBCompany",
  //     },
  //     {
  //       endpoint: "get_SiteProductNew/0/",
  //       stateSetter: setDBproduct,
  //       storageKey: "pd",
  //     },
  //     {
  //       endpoint: "get_GroupHDR/",
  //       stateSetter: setDBgroup,
  //       storageKey: "dBgroup",
  //     },
  //     {
  //       endpoint: "get_DiscountProducts/",
  //       stateSetter: setDBDiscount,
  //       storageKey: "dBDiscount",
  //     },
  //   ];

  //   try {
  //     const results = await Promise.all(
  //       endpoints.map(({ endpoint, stateSetter, storageKey }) =>
  //         apiClient.get(endpoint).then(({ data }) => {
  //           stateSetter(data.dtl);
  //           secureLocalStorage.setItem(storageKey, JSON.stringify(data.dtl));
  //         })
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }, []);

  const [dBCompany, setDBCompany] = useState([]);
  const [dBproduct, setDBproduct] = useState([]);
  const [dBgroup, setDBgroup] = useState([]);
  const [dBDiscount, setDBDiscount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (!dBCompany.length)
  //     fetchData("get_InvoiceSettings", setDBCompany, "dBCompany");
  //   if (!dBproduct.length)
  //     fetchData("get_SiteProductNew/0", setDBproduct, "pd");
  //   if (!dBgroup.length) fetchData("get_GroupHDR", setDBgroup, "dBgroup");
  //   if (!dBDiscount.length)
  //     fetchData("get_DiscountProducts", setDBDiscount, "dBDiscount");
  //   setIsLoading(false);
  // }, [fetchData, dBCompany, dBproduct, dBgroup, dBDiscount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full h-16 w-16"></div>
      </div>
    );
  }

  const onQuantityChange = (productId, action) => {
    setProducts((oldState) =>
      oldState.map((item) =>
        item.itemCode === productId
          ? {
              ...item,
              count: action
                ? Math.min(item.qty, item.count + 1) // Тоо нэмэх үед үлдэгдлээс хэтрүүлэхгүй
                : Math.max(1, item.count - 1), // Тоо хасах үед 1-ээс бага болгохгүй
            }
          : item
      )
    );
  };

  const onProductRemove = (product) => {
    setProducts((oldState) =>
      oldState.filter((item) => item.itemCode !== product.itemCode)
    );
  };
  const onProductClear = () => {
    setProducts([]);
  };

  return (
    <>
      <Helmet>
        <meta property="og:title" content="Чимэг - Алт - Монет" />
        <meta property="og:description" content="Чимэг - Алт - Монет" />
        <meta
          property="og:image"
          content="https://api.chimeg.mn/media/Downloads/kacc.jpg"
        />
        <meta property="og:url" content="https://chimeg.mn" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Context.Provider value={[dBCompany, dBproduct, dBgroup, dBDiscount]}>
        <div className="flex flex-col">
          <Header dBgroup={dBgroup} dBDiscount={dBDiscount} />
          <ToastContainer />
          <main className="w-full h-full">
            <CartProvider>
              <Suspense
                fallback={
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  </div>
                }
              >
                <Routes>
                  <Route
                    path="/*"
                    element={
                      <MainContainer
                        addProductToCart={addProductToCart}
                        dBproduct={dBproduct}
                        dBgroup={dBgroup}
                        onProductClear={onProductClear}
                      />
                    }
                  />
                  <Route
                    path="/product-detail/:id"
                    element={
                      <ProductDetail
                        addProductToCart={addProductToCart}
                        dBproduct={dBproduct}
                      />
                    }
                  />
                  <Route path="/programmInfo" element={<ProgrammScreen />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/partner" element={<Partner />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/LoginPage" element={<Login />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/OrderHistory" element={<OrderHistory />} />
                  <Route path="/OrderDetail/:id" element={<OrderDetail />} />
                  <Route path="/admin/order/" element={<UsersOrder />} />
                  <Route
                    path="/Wishlist"
                    element={
                      <Wishlist
                        addProductToCart={addProductToCart}
                        dBproduct={dBproduct}
                      />
                    }
                  />
                  <Route
                    path="/Download"
                    element={
                      <Download dBproduct={dBproduct} dBgroup={dBgroup} />
                    }
                  />
                  <Route
                    path="/CheckOut"
                    element={
                      <CheckoutProcess
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                        onQuantityChange={onQuantityChange}
                        onProductClear={onProductClear}
                      />
                    }
                  />
                  <Route
                    path="/PayOut"
                    element={
                      <PayOut
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                        onQuantityChange={onQuantityChange}
                        onProductClear={onProductClear}
                      />
                    }
                  />
                  <Route
                    path="/PriceOffer"
                    element={
                      <PriceOffer
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                        dBCompany={dBCompany}
                      />
                    }
                  />
                  <Route
                    path="/OrderAddress"
                    element={
                      <OrderAddress
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                      />
                    }
                  />
                  <Route
                    path="/Payments"
                    element={
                      <Payments
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                      />
                    }
                  />
                  <Route
                    path="/Qpay"
                    element={
                      <Qpay
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                        onProductClear={onProductClear}
                      />
                    }
                  />
                  <Route
                    path="/Bank"
                    element={
                      <Bank
                        products={productsInCart}
                        tot={totalPrice}
                        dBproduct={dBproduct}
                        onProductClear={onProductClear}
                      />
                    }
                  />
                  <Route
                    path="/ProductCat/:catId/:catDtlId"
                    element={
                      <ProductCat
                        addProductToCart={addProductToCart}
                        dBproduct={dBproduct}
                        dBgroup={dBgroup}
                        dBDiscount={dBDiscount}
                      />
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <ProductCat
                        addProductToCart={addProductToCart}
                        dBproduct={dBproduct}
                        dBgroup={dBgroup}
                        dBDiscount={dBDiscount}
                      />
                    }
                  />
                  <Route path="/SearchBar" element={<SearchBar />} />
                </Routes>
              </Suspense>
            </CartProvider>
            <CartProductPin
              visibilty={cartsVisibilty}
              products={productsInCart}
              onClose={setCartVisible}
              tot={totalPrice}
              onProductClear={onProductClear}
              onProductRemove={onProductRemove}
            />
            <SocialContact />
          </main>
          <BottomContainer />
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
