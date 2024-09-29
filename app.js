const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/"  // api url to get currency exchange rate

// getting Required tags , class , values from html page
const dropdowns = document.querySelectorAll(".dropDown select");
const calculateBtn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeRate = document.querySelector(".rate-exchange");



for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target); // function called to execute
    })
}


// updates country flag based on chosen country code
const updateFlag = (element) => {
    let currCode = element.value;
    let countCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// calculation performed when button clicked 
calculateBtn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value ;
    if(amtVal === "" || amtVal < 1){ 
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json `;
    let response = await fetch(URL);
    let data = await response.json(); // geting json data
    let rate = await data[fromCurr.value.toLowerCase()];
    let conRate = await rate[toCurr.value.toLowerCase()]; // exchange rate value 

    // Exchange Rate Calculation Happeing here
    let finalAmt = amount.value * conRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
    exchangeRate.innerHTML = `<b>Exchange Rate : 1 ${fromCurr.value} = ${conRate.toFixed(2)} ${toCurr.value}</b>`;

});

