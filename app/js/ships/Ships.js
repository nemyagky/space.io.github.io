import {ShipBot} from './ShipBot';
import {MainShip} from './MainShip';
import {rotate, getDistBetween2dots, rand} from '../functions';
import {ctx} from '../init';
import { Map } from '../Map';


// There are 2 ships array: 
// 1) ships - ships near to the player. It's updating every second. It's using for optimisation
// 2) shipsFullArray - every ships at the map. Every second some ships are cloning from there (see setShipsNearPlayer()).
export let ships = [];
let shipsFullArray = [];


export let Ships = new class Ships {

	constructor() {
		this.shipsInTeam = 0;
		this.framesPassed = 60;

		this.create();
	};


	// Create ships on pageload
	create() {
		for (let i = 0; i < this.shipsInTeam; i++) {
			shipsFullArray.push(new ShipBot("blue"));
			shipsFullArray[i].spawn();
		};
	
		for (let i = this.shipsInTeam; i < 10; i++) {
			shipsFullArray.push(new ShipBot("red"));
			shipsFullArray[i].spawn({x: rand(0, Map.w), y: rand(0, Map.h)});
		};
	
		shipsFullArray.push(MainShip);
		shipsFullArray[shipsFullArray.length - 1].spawn();
	};


	// Drawing and perform behavior of every ship
	draw() {
		for (let i = 0; i < ships.length; i++) {
			
			// MainShip behavior calls in gameloop.js
			if (i != ships.length-1) {
				ships[i].behavior();
			}
			
			// Moves, turns, makes shoot, etc.
			rotate(ships[i].x + 40, ships[i].y + 40, ships[i].rotate + 90);
			ctx.drawImage(ships[i].image, ships[i].x, ships[i].y, 70, 70);
	
			ctx.restore();
		}
	};


	setShipsNearPlayer() {
		this.framesPassed++;
	
		// If second lost
		if (this.framesPassed >= 60) { 
			this.framesPassed = 0;
	
			ships = [];

			shipsFullArray.forEach((ship) => {
				//if (getDistBetween2dots([MainShip.x, MainShip.y], [ship.x, ship.y]) <= 3000) {
					ships.push(ship);
				//};
			});
		};
	};

};
