import {ctx} from './init';
import {toRad, rotate, rand, setColor} from './functions';
import {ships} from './ships/Ships';
import {Map} from './Map';


export let shoots = [];


export let Shoots = new class Shoots {


	constructor() {
		// Are there holes in the shoots array (they are creatiпg when the shoot left the canvas / crashed into a ship)
		this.isHoles = false;
	};


	draw() {
		this.removeHoles();

		for (let i = 0; i < shoots.length; i++) {

			// For readability
			let shoot = shoots[i];

			// Changing x/y denend's on shoot.rotate
			shoot.x += Math.cos(toRad(shoot.rotate + 90)) * 13;
			shoot.y += Math.sin(toRad(shoot.rotate + 90)) * 13;

			// Shoot have time of live. If it didn't spent - draw it. Else - delete it (isShootAlive func will make it itself) and skip iteration
			if (this.isShootAlive(i)) {
				setColor(shoot.color);

				// Change the center point of the shoot to the center point of the ship
				rotate(shoot.x, shoot.y, shoot.rotate + 90);
				ctx.fillRect(shoot.x, shoot.y, shoot.h, shoot.w);
	
				// Restore canvas after rotation
				ctx.restore();

			} else continue;
			

			// If the shoot leave the map - remove it from the array
			if (shoot.x < 0 || shoot.y < 0 || shoot.x > Map.w || shoot.y > Map.h) {
				delete shoots[i];
				this.isHoles = true;
			};

			// If the shoot crashed into a ship - remove it from the array
			if (shoots[i]) {
				this.wasShootHitShip(shoot, i);
			};

		};

	};


	// After a bullet collides with something, the bullet will be deleted and a hole will appear. Remove the holes
	removeHoles() {
		if (this.isHoles) {
			let shootsCopy = [];
			for (let i = 0; i < shoots.length; i++) {
				// Копирует все пули (без дырок) в shootsCopy
				if (shoots[i]) shootsCopy.push(shoots[i]);
			}
			shoots = shootsCopy;
			this.isHoles = false;
		}
	};


	// Bullets should disappear after some time
	isShootAlive(i) {
		shoots[i].timeAlive++;

		if (shoots[i].timeAlive > 60) {
			delete shoots[i];
			this.isHoles = true;
			return false;
		}
		return true;
	};


	wasShootHitShip(shoot, i) {
		// Sorting all the ships
		// TO FIX -1 - не считая главный корабль
		for (let j = 0; j < ships.length-1; j++) {
			// If the center of the shoot is in the ship 
			if (shoot.x + 20 > ships[j].x &&
				shoot.x + 5 < ships[j].x + ships[j].w &&
				shoot.y + 10 > ships[j].y &&
				shoot.y + 5 < ships[j].y + ships[j].h
			) {
				ships[j].x = rand(0, Map.w);
				ships[j].y = rand(0, Map.h);

				// Deleting the shoot
				delete shoots[i];
				this.isHoles = true;
				break;
			}
		}
	};


};
