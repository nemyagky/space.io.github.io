import {getDistBetween2dots, toRad, rotate, rand} from './functions';
import {ctx} from './init';
import {map} from './map';
import {ships} from './ships/ships';

// Рисует выстрелы

export let shoots = []


// Стрельба раз в fpsAfterShoot кадров

// Есть ли дырки в массиве shoots (создаются, если выстрел покинул canvas)
let isHolesInShoots = false



// Каждый кадр рисует выстрелы
export function drawShoots() {

	// Так как пули удаляются, если они вышли за пределы canvas`а, то в массиве остаются дырки. Убираем их
	(function removeHoles() {
		// Если дырки есть (для оптимизации)
		if (isHolesInShoots) {
			let shootsCopy = []
			for (let i = 0; i < shoots.length; i++) {
				// Копирует все пули (без дырок) в shootsCopy
				if (shoots[i]) shootsCopy.push(shoots[i])
			}
			shoots = shootsCopy
			isHolesInShoots = false
		}
	})()


	function wasShootHitShip(i) {
		// Перебирает все красные корабли
		for (let j = 0; j < ships.length; j++) {
			// Если центр патрона лежит в корабле 
			if (shoots[i].x + 20 > ships[j].x &&
				shoots[i].x + 5 < ships[j].x + ships[j].w &&
				shoots[i].y + 10 > ships[j].y &&
				shoots[i].y + 5 < ships[j].y + ships[j].h &&
				!ships[j].isPlayer
			) {
				ships[j].x = rand(0, map.w)
				ships[j].y = rand(0, map.h)

				// Удаляем патрон
				delete shoots[i]
				isHolesInShoots = true
				break
			}
		}
	}


	// Красиво убирает пулю, если она
	function shootsAlive(i) {

		shoots[i].timeAlive++

		if (shoots[i].timeAlive > 60 * 10) {
			delete shoots[i]
			isHolesInShoots = true
			return false
		}
		return true

	}



	// Перебираем массив пуль, изменяем координаты и отрисовываем пули. Если пуля столкнулась с кораблем - нанести урон
	for (let i = 0; i < shoots.length; i++) {


			// Увеличивает x и y в зависимости от rotate
			shoots[i].x += Math.cos(toRad(shoots[i].rotate + 90)) * 13
			shoots[i].y += Math.sin(toRad(shoots[i].rotate + 90)) * 13


			if (shootsAlive(i)) {
				ctx.fillStyle = shoots[i].color

				// Поворачивает и рисут патрон. + 15, +15, + 20, +10 не трогать под страхом смерти. Иначе пули летят не из центра корабля
				// Смещает центральную точку отрисовки пуль на центральную точку корабля
				rotate(shoots[i].x, shoots[i].y, shoots[i].rotate + 90)
				ctx.fillRect(shoots[i].x, shoots[i].y, shoots[i].h, shoots[i].w)
	
				// Обновляет канвас после поворота
				ctx.restore()
			} else {
				continue;
			}





			// Если пуля вышла за пределы map - удалить ее из массива
			if (shoots[i].x < 0 || shoots[i].y < 0 || shoots[i].x > map.w || shoots[i].y > map.h) {
				delete shoots[i]
				isHolesInShoots = true
			}


			// Если патрон столкнулся с каким-нибудь кораблем - удалить патрон, отнять ХП
			if (shoots[i]) {
				wasShootHitShip(i)
			}

	}

}
