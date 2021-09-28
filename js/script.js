const dropdownList = document.querySelectorAll('.dropdown-list select');
const fromList = document.querySelector('.from-list select');
const toList = document.querySelector('.to-list select');
const exchangeButton = document.querySelector('button');
const apiKey = "4a53526cafb15d8038f068c6";
/*=============Getting a countries in drop down list=============*/
for (let i = 0; i < dropdownList.length; i++) {
    for (currency_code in country_code){
        let selected;
        if(i==0){
            selected = currency_code == "USD" ? 'selected' : ' ';
        }
        else if(i==1){
            selected = currency_code == "NPR" ? 'selected' : ' ';
        }
    let optionList = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
    dropdownList[i].insertAdjacentHTML("beforeend",optionList);
    }
    dropdownList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}
/*======================FLAG BUTTON=======================*/
function loadFlag(flag){
    for(let code in country_code){
        if(code == flag.value){
            let imgTag = flag.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflags.io/${country_code[code]}/flat/48.png`;
        }
    }
}
/*=========================EXCHANGE ICON====================*/
const exchangeIcon = document.querySelector("form .exchange-icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromList.value;
    fromList.value = toList.value;
    toList.value = tempCode;
    loadFlag(fromList);
    loadFlag(toList);
    getExchangeRate();
})
/*====================it will show converting... text on while reloading or clicking on button======================*/
window.addEventListener("load", () => {
    getExchangeRate();
});
exchangeButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});
function getExchangeRate() {
    const amt = document.querySelector(".amount input");
    let exchangeRateTxt = document.querySelector('.exchange-data');
    let valAmt = amt.value;
    if(valAmt =='' || valAmt == '0'){
        amt.value= "1";
    }
    exchangeRateTxt.innerHTML = "Converting..."
    /*===================Exchange rate API====================*/
    let url = `https://v6.exchangerate-api.com/v6/4a53526cafb15d8038f068c6/latest/${fromList.value}`;
    fetch(url)
    .then(response => response.json())
    .then(result =>{
        let exchangeRate = result.conversion_rates[toList.value];
        let totalExchangeRate = (valAmt * exchangeRate).toFixed(2);
        exchangeRateTxt.innerHTML = `<b>${valAmt} ${fromList.value} = ${totalExchangeRate} ${toList.value}</b>`
    });
}