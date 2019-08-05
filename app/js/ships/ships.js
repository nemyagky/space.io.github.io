import {ShipBot} from './ShipBot';
import {MainShip} from './MainShip';
import {rotate, getDistBetween2dots} from './../functions';
import {ctx} from './../init';


// Корабли рядом с игроком
export let ships = [];

export let shipsFullArray = [];
export let shipsInTeam = 10;


// Создает корабли
(function createShips() {

	for (let i = 0; i < shipsInTeam; i++) {
		shipsFullArray.push(new ShipBot("blue"));
		shipsFullArray[i].spawn();
	}

	for (let i = shipsInTeam; i < shipsInTeam * 2; i++) {
		shipsFullArray.push(new ShipBot("red"));
		shipsFullArray[i].spawn();
	}

	console.log( MainShip )
	shipsFullArray.push(MainShip);
	shipsFullArray[shipsFullArray.length - 1].spawn();

})()


export function drawShips() {

	for (let i = 0; i < ships.length; i++) {
		// Двигает, поворачивает, застравляет стрелять и тд
		ships[i].behavior()

		rotate(ships[i].x + 40, ships[i].y + 40, ships[i].rotate + 90)
		ctx.drawImage(ships[i].image, ships[i].x, ships[i].y, 70, 70);

		ctx.restore()
	}

}


let framesPassed = 60;

export function setShipsNearPlayer() {

	framesPassed++;

	// Раз в секунду изменяет массив кораблей рядом с игроком
	if (framesPassed >= 60) { 
	  framesPassed = 0;

	  ships = [];
 
	  shipsFullArray.forEach((ship) => {
		 if (getDistBetween2dots([MainShip.x, MainShip.y], [ship.x, ship.y]) <= 3000) {
			ships.push(ship);
		 };
	  });

	};
 
 
 };
