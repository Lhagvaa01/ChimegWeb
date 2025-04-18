import React from "react";

const numberToMongolianText = (number) => {
  const negj = [
    "",
    "нэг",
    "хоёр",
    "гурав",
    "дөрөв",
    "тав",
    "зургаа",
    "долоо",
    "найм",
    "ес",
    "арав",
  ];
  const aravt = [
    "",
    "арван",
    "хорин",
    "гучин",
    "дөчин",
    "тавин",
    "жаран",
    "далан",
    "наян",
    "ерэн",
  ];
  const zuut = [
    "",
    "нэг зуун",
    "хоёр зуун",
    "гурван зуун",
    "дөрвөн зуун",
    "таван зуун",
    "зургаан зуун",
    "долоон зуун",
    "найман зуун",
    "есөн зуун",
  ];
  const myngat = [
    "",
    "нэг мянга",
    "хоёр мянга",
    "гурван мянга",
    "дөрвөн мянга",
    "таван мянга",
    "зургаан мянга",
    "долоон мянга",
    "найман мянга",
    "есөн мянга",
  ];
  const arvanMyngat = [
    "",
    "арван",
    "хорин",
    "гучин",
    "дөчин",
    "тавин",
    "жаран",
    "далан",
    "наян",
    "ерэн",
  ];
  const zuunMyngat = [
    "",
    "нэг зуун",
    "хоёр зуун",
    "гурван зуун",
    "дөрвөн зуун",
    "таван зуун",
    "зургаан зуун",
    "долоон зуун",
    "найман зуун",
    "есөн зуун",
  ];
  const sayt = [
    "",
    "нэг сая",
    "хоёр сая",
    "гурван сая",
    "дөрвөн сая",
    "таван сая",
    "зургаан сая",
    "долоон сая",
    "найман сая",
    "есөн сая",
  ];
  const arvanSayt = [
    "",
    "арван",
    "хорин",
    "гучин",
    "дөчин",
    "тавин",
    "жаран",
    "далан",
    "наян",
    "ерэн",
  ];
  const zuunSayt = [
    "",
    "нэг зуун",
    "хоёр зуун",
    "гурван зуун",
    "дөрвөн зуун",
    "таван зуун",
    "зургаан зуун",
    "долоон зуун",
    "найман зуун",
    "есөн зуун",
  ];

  if (number === 0) {
    return "тэг";
  }

  const digits = String(number).split("").map(Number);
  const digitCount = digits.length;

  if (digitCount > 9) {
    return "тоо их байна";
  }

  let result = "";
  if (digitCount === 9) {
    result += zuunSayt[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 8) {
    result += arvanSayt[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 7) {
    result += sayt[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 6) {
    result += zuunMyngat[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 5) {
    result += arvanMyngat[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 4) {
    result += myngat[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 3) {
    result += zuut[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 2) {
    result += aravt[digits[0]] + " ";
    digits.shift();
  }

  if (digitCount >= 1) {
    result += negj[digits[0]];
  }

  return result.trim();
};

export default numberToMongolianText;
