var ships = []
var shipsInTeam = 25;

var farmingSquares = {blue: [], red: []};




// Создает корабли
(function createShips() {
	
	(function createFarmingSqueres(){
		// Top
		farmingSquares.blue.push({
			top: 0,
			bottom: map.h/4,
			left: 0,
			right: map.w/2
		})
		// bottom
		farmingSquares.blue.push({
			top: map.h - map.h/4,
			bottom: map.h,
			left: 0,
			right: map.w/2
		})
		// Left
		farmingSquares.blue.push({
			top: 0,
			bottom: map.h,
			left: 0,
			right: map.w/4
		})
		// Center
		farmingSquares.blue.push({
			top: map.h/4,
			bottom: map.h - map.h/4,
			left: map.w/4,
			right: map.w/2
		})

		farmingSquares.red.push({
			top: 0,
			bottom: map.h/4,
			left: map.w/2,
			right: map.w
		})
		farmingSquares.red.push({
			top: map.h - map.h/4,
			bottom: map.h,
			left: map.w/2,
			right: map.w
		})
		farmingSquares.red.push({
			top: 0,
			bottom: map.h,
			left: map.w - map.w/4,
			right: map.w
		})
		farmingSquares.red.push({
			top: map.h/4,
			bottom: map.h - map.h/4,
			left: map.w/2,
			right: map.w
		})
	})();



	for (var i = 0; i < shipsInTeam; i++) {
		ships.push(new Ship("blue"))
		ships[i].spawn()
	}

	for (var i = shipsInTeam; i < shipsInTeam*2; i++) {
		ships.push(new Ship("red"))
		ships[i].spawn()
	}

	ships.push(mainShip)
	ships[ships.length - 1].spawn()

})();




function drawShips() {

		for (var i = 0; i < ships.length; i++) {

			ships[i].behavior()

			rotate(ships[i].x + 40, ships[i].y + 40, ships[i].rotate + 90)
			ctx.drawImage(ships[i].image, ships[i].x, ships[i].y, 70, 70);
			ctx.restore()


		}

}
