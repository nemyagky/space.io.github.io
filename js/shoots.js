// Рисует выстрелы
var shoots = []


// Стрельба раз в fpsAfterShoot кадров

// Есть ли дырки в массиве shoots (создаются, если выстрел покинул canvas)
var isHolesInShoots = false



// Каждый кадр рисует выстрелы
function drawShoots() {

		// Так как пули удаляются, если они вышли за пределы canvas`а, то в массиве остаются дырки. Убираем их
		(function removeHoles() {
			// Если дырки есть (для оптимизации)
			if (isHolesInShoots) {
					var shootsCopy = []
					for ( var i = 0; i < shoots.length; i++ ) {
						iterations++
						// Копирует все пули (без дырок) в shootsCopy
						if ( shoots[i] )	shootsCopy.push(shoots[i])
					}
					shoots = shootsCopy
					isHolesInShoots = false
				}
		})()


		/*function wasShootHitShip(i) {
			// Перебирает все красные корабли
			for (var j = 0; j < team.length; j++) {
				// Если центр патрона лежит в корабле 
				if (shoots[i].x + 20 > team[j].x &&
						shoots[i].x + 5 < team[j].x + team[j].w &&
						shoots[i].y + 10 > team[j].y &&
						shoots[i].y + 5 < team[j].y + team[j].h
					 ) 
				{
					team[j].x = rand(0, map.w)
					team[j].y = rand(0, map.h)

					// Удаляем патрон
					delete shoots[i]
					isHolesInShoots = true
					break
				}
			}
		}*/



		// Перебираем массив пуль, изменяем координаты и отрисовываем пули. Если пуля столкнулась с кораблем - нанести урон
		for ( var i = 0; i < shoots.length; i++ ) {
			iterations++
			// Увеличивает x и y в зависимости от rotate
			shoots[i].x += Math.cos(toRad(shoots[i].rotate + 90) ) * shoots[i].speed
			shoots[i].y += Math.sin(toRad(shoots[i].rotate + 90) ) * shoots[i].speed

			ctx.fillStyle = shoots[i].color

			// Поворачивает и рисут патрон. + 15, +15, + 20, +10 не трогать под страхом смерти. Иначе пули летят не из центра корабля
			// Смещает центральную точку отрисовки пуль на центральную точку корабля
			rotate(shoots[i].x, shoots[i].y, shoots[i].rotate + 90)
			ctx.fillRect(shoots[i].x, shoots[i].y, shoots[i].h, shoots[i].w)

			// Обновляет канвас после поворота
			ctx.restore()




			// Если пуля вышла за пределы map - удалить ее из массива
			if (shoots[i].x < 0 || shoots[i].y < 0 || shoots[i].x > map.w || shoots[i].y > map.h)  {
				delete shoots[i]
				isHolesInShoots = true
			}
			

			// Если патрон столкнулся с каким-нибудь кораблем - удалить патрон, отнять ХП
			/*if (shoots[i]) {		
				wasShootHitShip(i)
			}*/


		}

}
