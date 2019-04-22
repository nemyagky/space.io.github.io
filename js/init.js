var canvas = document.querySelector(".canvas");
var ctx = canvas.getContext('2d');


canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// Создает количество звезд
canvas.width > 1000 ? starsLenght = canvas.width/2 : starsLenght = canvas.width




window.onresize = function() {

	// canvas на всю ширину
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Пересоздает звезды
	canvas.width > 1000 ? starsLenght = canvas.width/2 : starsLenght = canvas.width
	stars = []
	for (var i = 0; i < starsLenght; i++) {
		stars.push({
			// Диаметр
			d: rand(1,9),
			// Скорость (делим на 100, так как они должны двигаться медленно)
			speedX: rand(-3, 3)/100, speedY: rand(-3, 3)/100,
			x: rand(1, canvas.width),
			y: rand(1, canvas.height) 
		})
	}

	// Изменяет размеры миникаты
	miniMap.w = canvas.width/3.85
	miniMap.h = miniMap.w/1.8
	if (miniMap.w > miniMap.max) miniMap.w = miniMap.max
	if (miniMap.w < miniMap.min) miniMap.w = miniMap.min
}


// Настройки карты
var map = {
	//w: 25000,
	//h: 14250
	w: 30000,
	h: 15000
}



// Миникарта
var miniMap = {
	w: canvas.width/3.85,
	get h() {return this.w/1.8},
	min: 250,
	max: 400
}
if (miniMap.w > miniMap.max) miniMap.w = miniMap.max
if (miniMap.w < miniMap.min) miniMap.w = miniMap.min




var iterations = 0
var pause = false