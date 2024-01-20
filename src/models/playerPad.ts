import { Application, Sprite, Texture } from "pixi.js";
import GameObject from "../core/GameObject";
import { gameConfig } from "../gameConfig";

export default class PlayerPad extends GameObject {
    constructor(app: Application) {
        super();
        this.position.x = gameConfig.width / 2 - this.width / 2;
        const sp = new Sprite(Texture.from("pad"));
        this.setSprite(sp);
        app.stage.addChild(this);
    }
}
