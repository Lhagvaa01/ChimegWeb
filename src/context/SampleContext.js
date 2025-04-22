import { useState } from "react";

const APIURL2 = 'localhost:8000';
let APIURL = "api.chimeg.mn";
// let APIURL = "127.0.0.1:8000";

const token = "token 218d68b6dfe280a288a396352f7d720a18a00997"
// let APIURL = 'localhost:8000';

// Define a function component to use useState hook
function SampleComponent() {
  const [isAddress, setIsAddress] = useState(0);

  
  return { isAddress, setIsAddress };
}

function OderNumber() {
  const [orderNum, setOrderNum] = useState(0);

  
  return { orderNum, setOrderNum };
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export { APIURL,APIURL2, token, SampleComponent, OderNumber, formatDate };