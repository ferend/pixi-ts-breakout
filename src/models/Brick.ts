import { FillStyle } from "pixi.js";

export class Brick {
    x: number;
    y: number;
    width: number;
    height: number;
    color: FillStyle;
    score: number;

    constructor(x: number, y: number, width: number, height: number, color: FillStyle, score: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.score = score;
    }
}
