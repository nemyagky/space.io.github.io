import {Ship, defaultShip} from './Ship';
import {shoots} from '../Shoots';
import {ships} from './Ships'
import { getDistBetween2dots, setSpeed } from '../functions';
import { MainShip } from './MainShip';


export class ShipBot extends Ship {


	constructor(team) {
		super(defaultShip, team);
		this.movingCords = {};
	};


	behavior() {
		this.moving();
		this.setTargetForShooting();
		this.shoot();
		this.moveTo();
	};


	// Detects the nearest enemy and rotate in it's direction
	setTargetForShooting(type) {

			// Rotate ship to targetForShooting
			let setRotate = () => {
				if (!type) {
						this.rotate = 180 / Math.PI *
							Math.atan2(this.targetForShooting.y - this.y, this.targetForShooting.x - this.x);
				}
				if (type == 'smart') {

					this.rotate = 180 / Math.PI *
						Math.atan2(this.targetForShooting.y - this.y, this.targetForShooting.x - this.x);
	
				}
			};
	
			// At start this variable doesn't contains the nearest ship. Passing standart params 
			let nearestShip = {
				x: this.x,
				y: this.y,
				dist: 99999
			};
	
			// Iterate over all enemy ships and set the nearest
			for (let i = 0; i < ships.length; i++) {
				//if (this.team != ships[i].team) {
				// Little by little reduce the dist
				let dist = getDistBetween2dots( [this.x, this.y], [ships[i].x, ships[i].y] );
				if (dist < 100000 && dist != 0) {
					// If current ship are near then previous nearestShip - update nearestShip
					if (dist < nearestShip.dist) {
						nearestShip.x = ships[i].x;
						nearestShip.y = ships[i].y;
						nearestShip.dist = dist;
					};
				};
			};
	
			// After finding nearestShip - save it as targetForShooting
			this.targetForShooting = {
				x: nearestShip.x,
				y: nearestShip.y
			};
	
			setRotate();
	};


	// Make shoot
	shoot() {
		this.fpsAfterShoot++;

		if (this.fpsAfterShoot > this.fireSpeed) {

			if (getDistBetween2dots([this.targetForShooting.x, this.targetForShooting.y ], [this.x, this.y]) < 1000) {
			shoots.push({
				w: 7,
				h: 20,
				x: this.x + 43,
				y: this.y,
				team: "red",
				rotate: this.rotate - 90,
				speed: 20,
				color: "#00FFA9",
				timeAlive: 0
			});
			this.fpsAfterShoot = 0;
		}
		};
	};
	

	moveTo() {

		this.movingCords.x = MainShip.x
		this.movingCords.y = MainShip.y

		if (this.x < this.movingCords.x) {
			this.speedX += setSpeed(this.speedUp);
		}
		if (this.x > this.movingCords.x) {
			this.speedX -= setSpeed(this.speedUp);
		}
		if (this.y < this.movingCords.y) {
			this.speedY += setSpeed(this.speedUp);
		}
		if (this.y > this.movingCords.y) {
			this.speedY -= setSpeed(this.speedUp);
		}
	};


};
