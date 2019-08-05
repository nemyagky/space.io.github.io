// REFACTORED

import {ctx} from './init';


const mapSettings = {
   w: 30000,
   h: 15000
};


class Map {

   constructor(settings) {
      this.w = settings.w;
      this.h = settings.h;
   };

   drawBorder() {
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.rect(0, 0, this.w, this.h);
      ctx.stroke();
      ctx.closePath();
   }

}

export const map = new Map(mapSettings);
