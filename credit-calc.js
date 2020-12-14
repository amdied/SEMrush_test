const monthlyPayment = document.querySelector('#monthly-payment');
const profit = document.querySelector('#profit');
const overpayment = document.querySelector('#overpayment');
const creditBody = document.querySelector('#credit-body');

let payment = {
	sum: 20000000,
	downPayment: 3000000,
	time: 10,
	rate: 10,
};

function calculate() {
	let rate12 = (payment.rate / 1200);
	let monthRate = (payment.time * 12);
	let creditBodyValue = (payment.sum - payment.downPayment);
	let monthlyPaymentValue = (creditBodyValue * (rate12 + (rate12 / (Math.pow(1 + rate12, monthRate) - 1))));
	let profitValue = 5 * (monthlyPaymentValue / 3);
	let overpaymentValue = ((monthlyPaymentValue * monthRate) - payment.sum + payment.downPayment);
	
	overpayment.textContent = parseFloat(overpaymentValue.toFixed(0)).toLocaleString('ru-RU');
	monthlyPayment.textContent = parseFloat(monthlyPaymentValue.toFixed(0)).toLocaleString('ru-RU');
	creditBody.textContent = (parseFloat(creditBodyValue.toFixed(0))).toLocaleString('ru-RU');
	profit.textContent = parseFloat(profitValue.toFixed(0)).toLocaleString('ru-RU');
	
	return 0;
};


document.querySelector('input[name="sum"]').addEventListener('input', (e) => {
	payment.sum = +e.target.value;
	calculate();
})
document.querySelector('input[name="down-payment"]').addEventListener('input', (e) => {
	payment.downPayment = +e.target.value;
	calculate();
})
document.querySelector('input[name="time"]').addEventListener('input', (e) => {
	payment.time = +e.target.value;
	calculate();
})
document.querySelector('input[name="rate"]').addEventListener('input', (e) => {
	payment.rate = +e.target.value;
	calculate();
})

document.getElementById('sum').oninput = function () {
	if (this.value.length > 9) this.value = this.value.substr(0, 9); // в поле можно ввести только 10 символов
}

document.getElementById('rate').oninput = function () {
	if (this.value.length > 2) this.value = this.value.substr(0, 2); // в поле можно ввести только 2 символа
}

document.getElementById('time').oninput = function () {
	if (this.value.length > 2) this.value = this.value.substr(0, 2); // в поле можно ввести только 2 символа
}

document.getElementById('down-payment').oninput = function () {
	if (this.value.length > 9) this.value = this.value.substr(0, 9); // в поле можно ввести только 9 символов
}

// Очистка заполненных форм
function ClearFields() {
	document.getElementById("sum").value = "";
	document.getElementById("down-payment").value = "";
	document.getElementById("time").value = "";
	document.getElementById("rate").value = "";
	document.getElementById("procent").value = "";
	creditBody.textContent = "0";
	monthlyPayment.textContent = "0";
	profit.textContent = "0";
	overpayment.textContent = "0";
	return 0;
}; 


$('input[name="procent"]').click(function(){
	let value = $(this).attr('value');
	percent = (value/100) * payment.sum;
	payment.downPayment = percent;
	document.getElementById("down-payment").value = payment.downPayment;
	document.getElementById("sum").value = payment.sum;
	document.getElementById("time").value = payment.time;
	document.getElementById("rate").value = payment.rate;
	calculate();
	return 0;
});

// Сохранение данных из input.
document.addEventListener("DOMContentLoaded", function() {
  var ids = ["sum", "down-payment", "time", "rate",];
	for (var id of ids) {
    var input = document.getElementById(id);
    input.value = localStorage.getItem(id);
    (function(id, input) {
      input.addEventListener("change", function() {
        localStorage.setItem(id, input.value);
      });
    })(id, input);
  } 
});
