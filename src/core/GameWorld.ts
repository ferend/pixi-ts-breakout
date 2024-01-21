import { Application, Container, Graphics } from "pixi.js";
import { gameConfig } from "../gameConfig";

export default class GameWorld extends Container {
    public leftBorder: Graphics;
    public rightBorder: Graphics;

    constructor(app: Application) {
        super();

        const gameWidth = gameConfig.width;
        const gameHeight = gameConfig.height;
        this.leftBorder = new Graphics();
        this.rightBorder = new Graphics();
        this.gameBorders(gameHeight, gameWidth);
        app.stage.addChild(this);
    }

    private gameBorders(gameHeight: number, gameWidth: number) {
        this.leftBorder.beginFill(0x00ff00);
        this.leftBorder.drawRect(0, 0, 10, gameHeight);
        this.leftBorder.endFill();
        this.addChild(this.leftBorder);

        this.rightBorder.beginFill(0x00ff00);
        this.rightBorder.drawRect(gameWidth - 10, 0, 10, gameHeight);
        this.rightBorder.endFill();
        this.addChild(this.rightBorder);
    }
}
