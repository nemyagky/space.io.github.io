import {ctx} from './init';


const mapSettings = {
   w: 30000,
   h: 15000
};


export const Map = new class Map {

   constructor() {
      this.w = mapSettings.w;
      this.h = mapSettings.h;
   };

   drawBorder() {
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.rect(0, 0, this.w, this.h);
      ctx.stroke();
      ctx.closePath();
   };

};
