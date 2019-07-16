import {starsCount, ctx, map, canvas, stars} from './init'

import {rand} from './functions'


// Рисуем звезды
// При загрузке страницы генерируем количество звезд в зависимости от ширины экрана
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

// Каждый кард немножко меняем позицию звезд 
export function drawSpace() {
	ctx.fillStyle = "#ffffff"

	for (let i = 0; i < stars.length; i++) {
		stars[i].x += stars[i].speedX
		stars[i].y += stars[i].speedY

		// Если звездавылезла за пределы canvas`a перенести в другой край
		// 5 - небольшая погрешность, чтобы звезды исчезали не на краю канваса, а на 5 пикселей за его пределами 
		if (stars[i].x < 0 - 5) stars[i].x = canvas.width + 5
		if (stars[i].x > canvas.width + 5) stars[i].x = 0 - 5
		if (stars[i].y < 0 - 5) stars[i].y = canvas.height + 5
		if (stars[i].y > canvas.height + 5) stars[i].y = 0 - 5

		// Отрисовывем звезды маленькими квадратиками (круглешочки при большом количестве лагают)
		ctx.fillRect(stars[i].x, stars[i].y, stars[i].d / 7, stars[i].d / 7)

	}
}




// Рисует рамку-ограничитель
export function drawBorder() {
	ctx.beginPath()
	ctx.strokeStyle = "#fff"
	ctx.rect(0, 0, map.w, map.h)
	ctx.stroke()
	ctx.closePath()
}
