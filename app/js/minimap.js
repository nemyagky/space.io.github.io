import {ctx, canvas, miniMap, map} from './init'
import {mainShip} from './ships-proto'

export function drawMiniMap() {


	// Используется для перевода реальных координат в координаты на миникарте
	function drawOnMiniMap(x, y, w, h, color, drawRect) {
		ctx.fillStyle = color

		// Позиция по x - (получаем % координаты на всей карте) *  miniMap.w, чтобы перевести в размеры миникарты
		// Позиция по Y - (canvas.height - miniMap.h - 2) - верхняя точка minimap + (получаем % координаты на всей карте) *  miniMap.h
		ctx.fillRect(
			((x / map.w) * miniMap.w),
			((canvas.height - miniMap.h) + (y / map.h) * miniMap.h) - 3.5,
			w, h
		)

	};





	// Рисуем рамку у карты
	ctx.beginPath()
	ctx.strokeStyle = "#fff"
	// Отступ слева - 1, чтобы была видна рамка
	// Высота экрана - высота миникарты - 1 (чтобы была видна рамка)
	// Ширина, высота
	ctx.rect(1, (canvas.height - miniMap.h - 2), miniMap.w + 5, miniMap.h)
	ctx.stroke()
	ctx.closePath();




	// Рисуем главный корабль
	ctx.fillStyle = "#fff"
	drawOnMiniMap(mainShip.x, mainShip.y, 4, 4)

}
