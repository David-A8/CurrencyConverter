const apiRates = "https://open.er-api.com/v6/latest/"; //API to get exchange rates
document.getElementById("convert").onclick = inputs;

const baseRates = {}; //This array will store the rates of the currencies temporaly to avoid calling the API so many
//times and reduce efficiency
const currencies = [ // Array to store a list of currencies and their codes
    { code: "USD", name: "United States Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "CZK", name: "Czech Republic Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Sheqel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KRW", name: "South Korean Won" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "PHP", name: "Philippine Peso" }
]

populateCurrencies();

function populateCurrencies() { //Function to populate selectboxes with currencies
    document.querySelector("#currencyList"); // Select the first selectbox
    currencies.forEach(currency => {
        let item = document.createElement("option"); //Creates a new option for the selectbox
        item.textContent = currency.code + " - " + currency.name; // Add text to the option in the selectbox
        item.value = currency.code; //Stores the code of the currency as a value we'll use to convert currency later on
        document.querySelector("#currencyList").appendChild(item); //Adds the new option to the selectbox
    })
    document.querySelector("#currencyList2"); // Same steps for first selectbox
    currencies.forEach(currency => {
        let item = document.createElement("option");
        item.textContent = currency.code + " - " + currency.name;
        item.value = currency.code;
        document.querySelector("#currencyList2").appendChild(item);
    })
}

async function getRates(base = "USD") { //Function to get rates from the API based on the currency the user chooses
    const api = await fetch(apiRates + base); //The link of the API and the base is added
    const currencyRates = await api.json(); //The data from the API is stored in a json file
    return currencyRates;
}

function inputs() { // Function to get the user's inputs.
    let from = document.querySelector("#currencyList").value;
    let to = document.querySelector("#currencyList2").value;
    let amount = document.querySelector("#amountMoney").value;
    convert(amount, from, to); //Once we got the user's input, they are sent to the function convert
}

async function convert(amount, from, to) { //This function receives the amount, and both currencies to start converting
    if (!baseRates[from]) { //If the rates of the currency received are not in the local database, they will be requested
        const newRates = await getRates(from);
        baseRates[from] = newRates; //The new rates are stored in the local database
    }

    const rate = baseRates[from].rates[to]; //If the rates are in the local database, they are pulled
    const converted = rate * amount; //The conversion is calculated
    document.querySelector("#output").innerHTML = `${amount} ${from} are ${converted} ${to}`;//The outcome is displayed
}




