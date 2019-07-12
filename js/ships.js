var shipsFullArray = []
var shipsInTeam = 0;



// Создает корабли
(function createShips() {
	
	for (var i = 0; i < shipsInTeam; i++) {
		shipsFullArray.push(new Ship("blue"))
		shipsFullArray[i].spawn()
	}

	for (var i = shipsInTeam; i < shipsInTeam*2; i++) {
		shipsFullArray.push(new Ship("red"))
		shipsFullArray[i].spawn()
	}

	shipsFullArray.push(mainShip)
	shipsFullArray[shipsFullArray.length - 1].spawn()

})();


function drawShips() {

		for (var i = 0; i < ships.length; i++) {

			ships[i].behavior()

			rotate(ships[i].x + 40, ships[i].y + 40, ships[i].rotate + 90)
			//if (ships[i].team == 'red') {
				ctx.drawImage(ships[i].image, ships[i].x, ships[i].y, 70, 70);				
			//}
			ctx.restore()


		}

}
