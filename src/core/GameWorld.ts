import { Application, Container, Graphics } from "pixi.js";
import { gameConfig } from "../gameConfig";

export default class GameWorld extends Container {
    public leftBorder: Graphics;
    public rightBorder: Graphics;

    constructor(app: Application) {
        super();

        // Access the width and height of the game configuration (assuming they are available in 'gameConfig.width' and 'gameConfig.height')
        const gameWidth = gameConfig.width;
        const gameHeight = gameConfig.height;

        // Create left border
        this.leftBorder = new Graphics();
        this.leftBorder.beginFill(0x00ff00); // You can change the color as needed
        this.leftBorder.drawRect(0, 0, 10, gameHeight); // Adjust the width as needed
        this.leftBorder.endFill();
        this.addChild(this.leftBorder); // Add left border to the container

        // Create right border
        this.rightBorder = new Graphics();
        this.rightBorder.beginFill(0x00ff00); // You can change the color as needed
        this.rightBorder.drawRect(gameWidth - 10, 0, 10, gameHeight); // Adjust the width as needed
        this.rightBorder.endFill();
        this.addChild(this.rightBorder); // Add right border to the container

        app.stage.addChild(this);
    }
}
