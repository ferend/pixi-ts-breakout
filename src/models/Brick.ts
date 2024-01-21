import { Sprite } from "pixi.js";

export class Brick {
    x: number;
    y: number;
    width: number;
    height: number;
    score: number;
    sprite: Sprite;

    constructor(x: number, y: number, width: number, height: number, sprite: Sprite, score: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.score = score;
        this.sprite = sprite;
    }
}
