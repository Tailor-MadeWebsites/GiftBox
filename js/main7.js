var productRates = [
{ lower: 1000, upper: 5000, mir: 1.525, repApr: 24 },
{ lower: 5001, upper: 15000, mir: 1.164, repApr: 18.5 },
{ lower: 15001, upper: 25000, mir: 0.557, repApr: 12 },
];

var amountSlider = document.getElementById('amountSlider');
var termSlider = document.getElementById('termSlider');
var amountField = document.getElementById('amountField');
var termField = document.getElementById('termField');
var totalRepaymentField = document.getElementById('totalRepayment');
var monthlyRepaymentField = document.getElementById('monthlyRepayment');
var totalInterestField = document.getElementById('totalInterest');
var repAprField = document.getElementById('repApr');

var sliderFill1 = document.querySelector('.slider-container-one .bar .fill');
var sliderFill2 = document.querySelector('.slider-container-two .bar .fill');

function setBarOne() {
var calculatedWidth = ((amountSlider.value - amountSlider.min) / (amountSlider.max - amountSlider.min)) * 100;
sliderFill1.style.width = calculatedWidth + '%';
amountField.value = amountSlider.value;
}
function setBarTwo() {
var calculatedWidth = ((termSlider.value - termSlider.min) / (termSlider.max - termSlider.min)) * 100;
sliderFill2.style.width = calculatedWidth + '%';
termField.value = termSlider.value;
}
function updateSliderOne() {
amountSlider.value = amountField.value;
setBarOne();
}
function updateSliderTwo() {
termSlider.value = termField.value;
setBarTwo();
}

amountSlider.addEventListener('input', setBarOne);
termSlider.addEventListener('input', setBarTwo);
amountField.addEventListener('change', updateSliderOne);
termField.addEventListener('change', updateSliderTwo);

amountSlider.addEventListener('change', calculateValues);
termSlider.addEventListener('change', calculateValues);
amountField.addEventListener('change', calculateValues);
termField.addEventListener('change', calculateValues);


function calculateValues() {
var amount = parseFloat(amountField.value);
var months = termField.value;
var bracket = productRates.filter(x => amount >= x.lower && amount <= x.upper)[0];
var mir = bracket.mir / 100.0;
var cdf = 1 / mir - 1 / (mir * (mir + 1) ** months);
var monthly = amount / cdf;
var repApr = bracket.repApr;

if (amountField.value && termField.value) {
totalRepaymentField.innerHTML = '£' + roundTo2DP(monthly * months).toLocaleString();
monthlyRepaymentField.innerHTML = '£' + roundTo2DP(monthly).toLocaleString();
totalInterestField.innerHTML = '£' + roundTo2DP(monthly * months - amount).toLocaleString();
repAprField.innerHTML = repApr + '%';
} else {
totalRepaymentField.innerHTML = '-';
monthlyRepaymentField.innerHTML = '-';
totalInterestField.innerHTML = '-';
repAprField.innerHTML = '-';
}

}

function roundTo2DP(num) {
return Math.round(num * 100) / 100;
}


function la (src){
	window.location=src;
}