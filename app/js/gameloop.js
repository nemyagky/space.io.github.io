import './../sass/main.sass';

import {ctx, canvas} from './init';
import {map} from './map'
import {setKeyboardSettings, setCursorSettings, framesPassedFunctions, fps, nextGameStep } from './functions';
import {mainShip} from './ships-proto'
import {drawShips} from './ships'
import {drawShoots} from './shoots'
import {miniMap} from './minimap'
import {stars} from './space'

// При загрузке создаем изображения
window.addEventListener("load", gameLoop())


function gameLoop() {

	ctx.clearRect(0 , 0, canvas.width, canvas.height);

	// Получаем активные клавиши и информацию о курсоре
	setKeyboardSettings();

	setCursorSettings();

	// По большей частности используется для оптимизации. ТК вовсе незачем все действия выполнять 60 раз в секунду - вводит различные счетчики и прочие приемы оптимизации
	framesPassedFunctions();

	//Рисуем звезды на фоне
	stars.draw();

	// Рисует остальной canvas относительно игрока
	ctx.save();
	ctx.translate(-mainShip.x + canvas.width/2, -mainShip.y + canvas.height/2);

  	map.drawBorder();
	drawShoots();
	drawShips();
	

	ctx.restore();
	miniMap.draw()
	
	// Рисует все статические элементы поверх всего остального
	fps();

	// Следующий кадр
	nextGameStep(gameLoop);
}
