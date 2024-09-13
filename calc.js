let a = ''; // первое число
let b = ''; // второе число
let sign = ''; // знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '%'];

// экран
const out = document.querySelector('.calc-screen p');

function clearAll() {
	a = ''; // первое число
	b = ''; // второе число
	sign = ''; // знак операции
	finish = false;
	out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
	// нажата не кнопка
	if (!event.target.classList.contains('btn')) return;
	// нажата кнопка all clear (ac)
	if (event.target.classList.contains('ac')) return;

	// получаю нажатую кнопку
	const key = event.target.textContent;

	// если нажата клавиша 0-9 или .
	if (digit.includes(key)) {
		if (b === '' && sign === '') {
			a += key;
			out.textContent = a;
		} else if (a !== '' && b !== '' && finish) {
			b = key;
			finish = false;
			out.textContent = b;
		} else {
			b += key;
			out.textContent = b;
		}
		console.table(a, b, sign);
		return;
	}

	// если нажата клавиша + - / X
	if (action.includes(key)) {
		sign = key;
		out.textContent = sign;
		console.table(a, b, sign);
		return;
	}

// Обработка кнопки процентов
if (key === '%') {
	// если число b еще не введено
	if (b === '') {
		a = (parseFloat(a) / 100).toString(); // переводим a в проценты
		out.textContent = a;
	} else {
		b = (parseFloat(b) / 100 * parseFloat(a)).toString(); // переводим b в проценты от a
		out.textContent = b;
	}
	console.table(a, b, sign);
	return;
}

	// Обработка кнопки +/-
	if (event.target.classList.contains('plus-minus')) {
		if (b === '') {
			a = (-a).toString(); // меняем знак числа a
			out.textContent = a;
		} else {
			b = (-b).toString(); // меняем знак числа b
			out.textContent = b;
		}
		console.table(a, b, sign);
		return;
	}

	// нажата клавиша =
	if (key === '=') {
		if (b === '') b = a;
		switch (sign) {
			case "+":
				a = (+a) + (+b);
				break;
			case "-":
				a = a - b;
				break;
			case "X":
				a = a * b;
				break;
			case "/":
				if (b === '0') {
					out.textContent = 'Ошибка';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a = a / b;
				break;
		}
		finish = true;
		out.textContent = a;
		console.table(a, b, sign);
	}
};
