import {rand} from './functions'

let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// Создает количество звезд
export let starsCount = 0;

canvas.width > 1000 ? starsCount = canvas.width / 2 : starsCount = canvas.width



export let stars = []

window.onresize = function () {


	// canvas на всю ширину
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Пересоздает звезды
	canvas.width > 1000 ? starsCount = canvas.width / 2 : starsCount = canvas.width;
	
	stars = [];

	for (let i = 0; i < starsCount; i++) {
		stars.push({
			// Диаметр
			d: rand(1, 9),
			// Скорость (делим на 100, так как они должны двигаться медленно)
			speedX: rand(-3, 3) / 100,
			speedY: rand(-3, 3) / 100,
			x: rand(1, canvas.width),
			y: rand(1, canvas.height)
		})
	}

	// Изменяет размеры миникаты
	miniMap.w = canvas.width / 3.85
	miniMap.h = miniMap.w / 1.8

	if (miniMap.w > miniMap.max) miniMap.w = miniMap.max
	if (miniMap.w < miniMap.min) miniMap.w = miniMap.min
}


// Настройки карты
export let map = {
	//w: 25000,
	//h: 14250
	w: 30000,
	h: 150000
}



// Миникарта
export let miniMap = {
	w: canvas.width / 3.85,
	min: 250,
	max: 400
}
miniMap.h = miniMap.w / 1.8
if (miniMap.w > miniMap.max) miniMap.w = miniMap.max
if (miniMap.w < miniMap.min) miniMap.w = miniMap.min




export let iterations = 0;
let pause = false;






export { ctx, canvas }
