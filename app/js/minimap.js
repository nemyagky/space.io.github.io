import { miniMap, map } from "./init";

export default class MiniMap {
  constructor({ ctx, x, y, w, h, color }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.canvas = document.querySelector(".canvas");
  }
  //Основная функция, по которой рисуется мини-карта
  drawMiniMap = () => {
    this.ctx.fillStyle = this.color;

    // Позиция по x - (получаем % координаты на всей карте) *  miniMap.w, чтобы перевести в размеры миникарты
    // Позиция по Y - (canvas.height - miniMap.h - 2) - верхняя точка minimap + (получаем % координаты на всей карте) *  miniMap.h
    this.ctx.fillRect(
      (this.x / map.w) * miniMap.w,
      this.canvas.height - miniMap.h + (this.y / map.h) * miniMap.h - 3.5, //TODO: Решить вопрос насчет того, чтобы значение брались изнутри объекта, а не из других файлов
      this.w,
      this.h
    );
  };
  
  draw = () => {
    this.styleBorder();
    this.drawMainStarship();
  };
  //Стиль границы
  styleBorder = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#fff";
    this.ctx.rect(
      1,
      this.canvas.height - miniMap.h - 2,
      miniMap.w + 5,
      miniMap.h
    );
    this.ctx.stroke();
    this.ctx.closePath();
  };

  drawMainStarship = () => {
    this.ctx.fillStyle = "#fff";
    this.drawMiniMap();
  };
}
