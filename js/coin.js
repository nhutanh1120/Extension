const PERCENT = "10";
const DONVI = "26000";

const percentElement = document.getElementById("percent");
const costPriceElement = document.getElementById("costPrice");
const flagPercentElement = document.getElementById("flagPercent");
const flag = convertStringtoBool(localStorage.getItem("flagPercent")) ?? true;
document.getElementById("flagPercent").innerText = flag ? "Tăng" : "Giảm";

const donviElement = document.getElementById("donvi");
const usdtElement = document.getElementById("usdt");

percentElement.addEventListener("input", changeValue);
percentElement.addEventListener("focus", function () {
    clearInput(this);
});
percentElement.addEventListener("focusout", function () {
    handleFocusOut(percentElement, "percent");
});
costPriceElement.addEventListener("input", changeValue);
costPriceElement.addEventListener("focusout", function () {
    handleFocusOut(costPriceElement, "costPrice");
});
flagPercentElement.addEventListener("click", function () {
    const costPrice = parseFloat(removeSpaces(document.getElementById("costPrice").value));
    const percentage = parseFloat(removeSpaces(document.getElementById("percent").value));
    const flag = !convertStringtoBool(localStorage.getItem("flagPercent")) ?? true;
    localStorage.setItem("flagPercent", flag);
    document.getElementById("flagPercent").innerText = flag ? "Tăng" : "Giảm";

    // Set the value of the 'sellingPrice' input field to the calculated price increase
    document.getElementById("sellingPrice").value = calculatePriceIncrease(costPrice, percentage, flag);
});

donviElement.addEventListener("blur", formatInputValue);
donviElement.addEventListener("focus", function () {
    clearInput(this);
});
donviElement.addEventListener("focusout", function () {
    handleFocusOut(donviElement, "donvi");
});
donviElement.addEventListener("input", changeUsdtValue);
usdtElement.addEventListener("input", changeUsdtValue);

percentElement.value = localStorage.getItem("percent") || PERCENT;
donviElement.value = localStorage.getItem("donvi") || DONVI;
usdtElement.value = localStorage.getItem("usdt") || 0;
costPriceElement.value = localStorage.getItem("costPrice") || 0;

// Initial calculations
changeUsdtValue();
changeValue();

function calculatePriceIncrease(initialPrice, percentageIncrease, flag) {
    const percent = initialPrice * (percentageIncrease / 100);
    return flag == true ? initialPrice + percent : initialPrice - percent;
}

function handleFocusOut(inputElement, store) {
    if (inputElement.value === null || inputElement.value === "") {
        inputElement.value = localStorage.getItem(store) || 0;
        localStorage.setItem(store, 0);
    }
    var costPrice = parseFloat(removeSpaces(document.getElementById("costPrice").value));
    var percentage = parseFloat(removeSpaces(document.getElementById("percent").value));
    localStorage.setItem("percent", percentage);
    localStorage.setItem("costPrice", costPrice);
    localStorage.setItem("donvi", document.getElementById("donvi").value);
}

function changeValue() {
    // Get the value of each input field
    const costPrice = parseFloat(removeSpaces(document.getElementById("costPrice").value));
    const percentage = parseFloat(removeSpaces(document.getElementById("percent").value));
    const flag = convertStringtoBool(localStorage.getItem("flagPercent")) ?? true;

    // Set the value of the 'sellingPrice' input field to the calculated price increase
    document.getElementById("sellingPrice").value = calculatePriceIncrease(costPrice, percentage, flag);
}

function changeUsdtValue() {
    const donvi = document.getElementById("donvi");
    document.getElementById("vnd").value = formatCurrency(
        parseFloat(removeSpaces(document.getElementById("usdt").value)) * (removeSpaces(donvi.value) ?? 26000),
    );
    localStorage.setItem("usdt", document.getElementById("usdt").value);
}

function formatCurrency(amount, currencyCode = "VND", locale = "vi-VN") {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(amount);
}

function formatInputValue() {
    // Lấy giá trị từ ô input
    let inputValue = document.getElementById("donvi").value;

    // Chuyển đổi giá trị sang số
    let numericValue = parseFloat(removeSpaces(inputValue));

    // Kiểm tra nếu giá trị là một số hợp lệ
    if (!isNaN(numericValue)) {
        // Hiển thị giá trị định dạng trong ô input
        document.getElementById("donvi").value = insertLeadingZeros(numericValue);
        localStorage.setItem("donvi", insertLeadingZeros(numericValue));
    }
    changeUsdtValue();
}

function insertLeadingZeros(number) {
    var numberStr = number.toString();
    var length = numberStr.length;

    if (length >= 5) {
        return number;
    }

    var missingZeros = 5 - length;
    var newNumber = (newNumber = numberStr + "0".repeat(missingZeros));

    return insertDot(newNumber);
}

function insertDot(number) {
    // Convert the number to a string for easier manipulation
    var str = number.toString();

    // Variable to store the result
    var result = "";

    // Counter for the processed digits
    var count = 0;

    // Iterate through each character in the string
    for (var i = str.length - 1; i >= 0; i--) {
        // Insert characters from right to left into the result
        result = str[i] + result;
        // Increment the counter
        count++;

        // If 3 digits have been inserted and it's not the last digit, insert a dot
        if (count % 3 === 0 && i !== 0) {
            result = " " + result;
        }
    }

    return result;
}

function removeSpaces(str) {
    return str.replace(/\s+/g, "");
}

function clearInput(input) {
    input.value = "";
}

function convertStringtoBool(str) {
    return str === "true";
}
