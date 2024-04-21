const PERCENT = '10';
const DONVI = '26.000';

const percentElement = document.getElementById("percent");
const costPriceElement = document.getElementById("costPrice");

const donviElement = document.getElementById("donvi");
const usdtElement = document.getElementById("usdt");

percentElement.addEventListener("input", changeValue);
percentElement.addEventListener("focus", function () {
    clearInput(this);
});
costPriceElement.addEventListener("input", changeValue);

donviElement.addEventListener("blur", formatInputValue);
donviElement.addEventListener("focus", function () {
    clearInput(this);
});
donviElement.addEventListener("input", changeUsdtValue);
usdtElement.addEventListener("input", changeUsdtValue);

percentElement.value = PERCENT;
donviElement.value = DONVI;

function calculatePriceIncrease(initialPrice, percentageIncrease) {
    return initialPrice + initialPrice * (percentageIncrease / 100);
}

function changeValue() {
    // Get the value of each input field
    var costPrice = parseFloat(removeDots(document.getElementById("costPrice").value));
    var percentage = parseFloat(removeDots(document.getElementById("percent").value));

    // Set the value of the 'sellingPrice' input field to the calculated price increase
    document.getElementById("sellingPrice").value = calculatePriceIncrease(costPrice, percentage);
}

function changeUsdtValue() {
    const donvi = document.getElementById("donvi");
    document.getElementById("vnd").value = formatCurrency(
        parseFloat(removeDots(document.getElementById("usdt").value)) * (removeDots(donvi.value) ?? 26000),
    );
}

function formatCurrency(amount, currencyCode = "VND", locale = "vi-VN") {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(amount);
}

function formatInputValue() {
    // Lấy giá trị từ ô input
    let inputValue = document.getElementById("donvi").value;

    // Chuyển đổi giá trị sang số
    let numericValue = parseFloat(removeDots(inputValue));

    // Kiểm tra nếu giá trị là một số hợp lệ
    if (!isNaN(numericValue)) {
        // Hiển thị giá trị định dạng trong ô input
        document.getElementById("donvi").value = insertLeadingZeros(numericValue);
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
            result = "." + result;
        }
    }

    return result;
}

function removeDots(str) {
    // Sử dụng phương thức replace với biểu thức chính quy để thay thế tất cả các dấu chấm bằng ''
    return str.replace(/\./g, "");
}

function clearInput(input) {
    input.value = "";
}
