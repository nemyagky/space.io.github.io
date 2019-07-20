import { Ship, mainShip } from './ships-proto';
import {ships, rotate} from './functions';
import {ctx} from './init'

export let shipsFullArray = [];
export let shipsInTeam = 10;

let initWidth = document.body.clientWidth,
	initHeight = document.body.clientWidth,
	coefficientSize = (initWidth + initHeight) / Ship.prototype.baseHeightShip;

window.addEventListener('resize', () => {
	//TODO: Доделать, чтобы при изменении разрешение - увеличивались все объекты
	if (document.body.clientWidth !== initWidth || document.body.clientHeight !== initHeight) {
		let currentSize = (document.body.clientWidth + document.body.clientHeight)  / coefficientSize;
		Ship.prototype.baseHeightShip = currentSize;
		Ship.prototype.baseWidthShip = currentSize;
		drawShips();
		console.log(currentSize);
	}
	//TODO: Доделать, чтобы при изменении разрешение - увеличивались все объекты
})
// Создает корабли
export function createShips() {

	for (let i = 0; i < shipsInTeam; i++) {
		shipsFullArray.push(new Ship("blue"));
		shipsFullArray[i].spawn();
	}

	for (let i = shipsInTeam; i < shipsInTeam * 2; i++) {
		shipsFullArray.push(new Ship("red"));
		shipsFullArray[i].spawn();
	}

	shipsFullArray.push(mainShip);
	shipsFullArray[shipsFullArray.length - 1].spawn();

};

createShips();

export function drawShips() {

	ships.forEach(ship => {
		ship.behavior(Ship.prototype.baseHeightShip)
		console.log()
		rotate(ship.x + 40, ship.y + 40, ship.rotate + 90)
		//if (ships[i].team == 'red') {
		ctx.drawImage(ship.image, ship.x, ship.y, Ship.prototype.baseHeightShip, Ship.prototype.baseWidthShip);
		//}
		ctx.restore()
	});
	// for (let i = 0; i < ships.length; i++) {

	// 	ships[i].behavior()

	// 	rotate(ships[i].x + 40, ships[i].y + 40, ships[i].rotate + 90)
	// 	//if (ships[i].team == 'red') {
	// 	ctx.drawImage(ships[i].image, ships[i].x, ships[i].y, 700, 70);
	// 	//}
	// 	ctx.restore()


	// }

}

