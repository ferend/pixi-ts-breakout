import GameObject from "../core/GameObject";
import { Application, Sprite, Texture } from "pixi.js";
import { gameConfig } from "../gameConfig";

export default class Ball extends GameObject {
    constructor(app: Application) {
        super();
        const sp = new Sprite(Texture.from("ball"));
        this.setSprite(sp);
        this.x = (gameConfig.width - this.width) / 2;
        this.y = (gameConfig.height - this.height) / 1.3;
        app.stage.addChild(this);
    }
}
