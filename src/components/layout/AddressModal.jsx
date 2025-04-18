import { useState, useEffect } from "react";
import Modal from "react-modal";
import secureLocalStorage from "react-secure-storage";
import { Button } from "antd";
import { PostApi, GetApi, PutApi } from "../../constant/Api";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet"; // Popup-г эндээс импорт хийх
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markIcon from "../../images/Mark.png";

const customIcon = L.icon({
  iconUrl: markIcon, // Өөрийн зурагны замыг оруулна
  iconSize: [40, 40], // Зургийн хэмжээ (өргөн, өндөр)
  iconAnchor: [21, 37], // Зургийн цэгийг газрын зурагт хэрхэн харуулах
  popupAnchor: [0, -32], // Popup-ийн байрлал
});

function LocationMarker({ userAddress, setUserAddress }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      const generatedUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      // setMapUrl(generatedUrl);
      setUserAddress({
        ...userAddress,
        TCGoogleMapUrl: generatedUrl, // Google Maps URL-г хадгалах
      });
    },
  });

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>Сонгогдсон байрлал</Popup>
    </Marker>
  ) : null;
}

const AddressModal = ({
  isOpen,
  onClose,
  addressPk,
  userPK,
  map,
  location,
  addName,
}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  const [userLocation, setUserLocation] = useState("");
  const [userAddress, setUserAddress] = useState({
    TCAddressName: addName,
    TCDetailAddress: "",
    TCGoogleMapUrl: map,
    TCUserPk: userPK,
    TCCityLocation: 1,
  });
  const [locations, setLocations] = useState([]);
  const [selectAdd, setSelectAdd] = useState(addName);

  useEffect(() => {
    // Update user address on load
    setUserAddress((prevAddress) => ({
      ...prevAddress,
      TCUserPk: userInfo.id,
    }));

    if (addressPk !== 0) {
      // Fetch the address if editing
      GetApi(`get_UserAddress/${userInfo.id}/`)
        .then((val) => {
          const address = val.dtl.find(
            (addr) => addr.id === parseInt(addressPk)
          );
          if (address) {
            setUserAddress(address);
            setUserLocation(address.TCCityLocation);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Fetch locations
    GetApi(`get_locations/`).then((val) => {
      setLocations(val.dtl);
    });
  }, [addressPk, userInfo]);

  const handleSizeChange = (name) => {
    setSelectAdd(name);
    setUserAddress({ ...userAddress, TCAddressName: name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserAddress({ ...userAddress, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setUserLocation(value);
    setUserAddress({ ...userAddress, TCCityLocation: value });
  };

  const saveAddress = (e) => {
    e.preventDefault();
    if (addressPk === 0) {
      // console.log(userAddress);
      PostApi(`post_UserAddress/`, JSON.stringify(userAddress))
        .then((val) => {
          // console.log(val);
          window.location.reload();
          onClose();
        })
        .catch((err) => console.error(err));
    } else {
      PutApi(`put_UserAddress/${addressPk}/`, JSON.stringify(userAddress))
        .then((val) => {
          // console.log(val);
          onClose();
        })
        .catch((err) => console.error(err));
    }
  };

  const [mapUrl, setMapUrl] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Address Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-auto"
    >
      <div className="w-full p-5 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address Form Section */}
          <div className="p-4">
            <h2 className="font-bold text-xl mb-4">Хаягийн мэдээлэл</h2>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <Button
                  type={selectAdd === "Гэр" ? "primary" : "default"}
                  onClick={() => handleSizeChange("Гэр")}
                  className="w-1/3"
                >
                  Гэр
                </Button>
                <Button
                  type={selectAdd === "Ажил" ? "primary" : "default"}
                  onClick={() => handleSizeChange("Ажил")}
                  className="w-1/3"
                >
                  Ажил
                </Button>
                <Button
                  type={selectAdd === "Бусад" ? "primary" : "default"}
                  onClick={() => handleSizeChange("Бусад")}
                  className="w-1/3"
                >
                  Бусад
                </Button>
              </div>

              {/* Location Dropdown */}
              <div>
                <label className="block mb-2">Хот/Аймаг</label>
                <select
                  name="TCCityLocation"
                  value={userLocation}
                  onChange={handleLocationChange}
                  className="block w-full border border-gray-300 p-2 rounded-lg"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detailed Address Input */}
              <div>
                <label className="block mb-2 font-semibold">
                  Дэлгэрэнгүй хаяг
                </label>
                <textarea
                  id="detailed-address"
                  placeholder="Дэлгэрэнгүй хаягаа оруулна уу..."
                  className="border-2 border-gray-300 p-2 rounded-lg w-full h-24 md:h-36"
                  value={userAddress.TCDetailAddress || ""}
                  name="TCDetailAddress"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <Button onClick={onClose} className="w-1/3">
                Буцах
              </Button>
              <Button
                onClick={saveAddress}
                className="w-1/3 bg-green-500 text-white"
              >
                Хадгалах
              </Button>
            </div>
          </div>
          <div>
            <h1>Газрын зураг сонгох</h1>
            <MapContainer
              center={[47.918873, 106.917907]}
              zoom={13}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              {/* <LocationMarker setMapUrl={setMapUrl} /> */}
              <LocationMarker
                userAddress={userAddress}
                setUserAddress={setUserAddress}
              />
            </MapContainer>
            {/* <p>Сонгогдсон газрын зургийн URL: {mapUrl}</p> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
