"use strict";

const fromMoney = document.querySelector(".from select");
const toMoney = document.querySelector(".to select");
const getBtn = document.querySelector(".container button");
const exIcon = document.querySelector(".reverse");
const amountEl = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

const API_KEY = "aaf6934178e7540a4cb9bf81";
//const url="https://v6.exchangerate-api.com/v6/aaf6934178e7540a4cb9bf81/latest/USD"

[fromMoney, toMoney].forEach((select, i) => {
  for (let curcode in Country_List) {
    const selected =
      (i === 0 && curcode === "INR") || (i === 1 && curcode === "USD")
        ? "selected"
        : "";

    select.insertAdjacentHTML(
      "beforeend",
      ` <option value="${curcode}" ${selected}>${curcode}</option>`,
    );
  }


  select.addEventListener("change", () => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector('img')
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`
  })


  async function getExchangeRate() {
    const amountValue = amountEl.value;
    exRateTxt.textContent="Please Wait"
  
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromMoney.value}`,
      );
      const result = await response.json();
      
  
      const exRate = result.conversion_rates[toMoney.value];
      const totalExRate = amountValue * exRate.toFixed(2);
      exRateTxt.textContent = `${amountValue} ${fromMoney.value} = ${totalExRate} ${toMoney.value}`;
  
    } catch (error) {
      exRateTxt.textContent = "Something Went Wrong";
    }
  
  }

  window.addEventListener("DOMContentLoaded", getExchangeRate);
getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

exIcon.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];
  [fromCurrency, toCurrency].forEach((select) => {
    const code = select.value;
    const imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${Country_List[
      code
    ].toLowerCase()}.png`;
  });

  getExchangeRate();
});

amountEl.addEventListener("keyup", () => {
  getExchangeRate();
});

})