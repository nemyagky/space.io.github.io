import './../sass/main.sass';
import {ctx, canvas} from './init';
import {map} from './map'
import {setKeyboardSettings, setCursorSettings, fps, nextGameStep, setTimeSpent } from './functions';
import {MainShip} from './ships/MainShip'
import {drawShips, setShipsNearPlayer} from './ships/ships'
import {drawShoots} from './shoots'
import {miniMap} from './minimap'
import {stars} from './stars'

// При загрузке создаем изображения
window.addEventListener("load", gameLoop())


function gameLoop() {
	
	ctx.clearRect(0 , 0, canvas.width, canvas.height);

	// Получаем активные клавиши и информацию о курсоре
	setKeyboardSettings();

	setCursorSettings();

	setShipsNearPlayer();

	//Рисуем звезды на фоне
	stars.draw();

	// Рисует остальной canvas относительно игрока
	ctx.save();

	MainShip.move()
	ctx.translate(-MainShip.x + canvas.width/2, -MainShip.y + canvas.height/2);
	

  	map.drawBorder();
	drawShoots();
	drawShips();
	

	ctx.restore();
	miniMap.draw()
	
	// Рисует все статические элементы поверх всего остального
	fps();

	setTimeSpent()

	// Следующий кадр
	nextGameStep(gameLoop);

	
}
