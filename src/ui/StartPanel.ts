import { Application, Graphics, Text, TextStyle } from "pixi.js";
import { gameConfig } from "../gameConfig";

export default class StartPanel extends Graphics {
    private app: Application;
    private startButtonCallback: () => void;
    constructor(app: Application, startButtonCallback: () => void) {
        super();
        this.app = app;
        this.startButtonCallback = startButtonCallback;
        this.beginFill(0x333333);
        this.drawRect(gameConfig.width / 4, gameConfig.height / 4, 600, 400);
        this.endFill();
        this.createStartButton();
        this.createGameTitle();
        this.createDescription();
        this.app.stage.addChild(this);
    }

    private createStartButton(): void {
        const startButton = new Text("Start Game");

        const style = new TextStyle({
            fontFamily: "OverFont",
            fontSize: 100,
            fill: "white",
        });

        startButton.style = style;
        startButton.anchor.set(0.5);
        startButton.position.set(this.width + 20, this.height + 80);
        startButton.interactive = true;

        startButton.on("pointerdown", () => {
            this.startButtonCallback();
            this.app.stage.removeChild(this);
        });

        this.addChild(startButton);
    }
    private createGameTitle(): void {
        const titleStyle = new TextStyle({
            fontFamily: "OverFont",
            fontSize: 200,
            fill: "pink",
            dropShadow: true,
            dropShadowDistance: 11,
        });

        const gameTitle = new Text("Breakout", titleStyle);

        gameTitle.anchor.set(0.5);
        gameTitle.position.set(this.width + 20, this.height - 50);
        this.addChild(gameTitle);
    }

    private createDescription(): void {
        const titleStyle = new TextStyle({
            fontFamily: "OverFont",
            fontSize: 60,
            fill: "pink",
            align: "center",
        });

        const description = new Text("Arrow Keys or click left and \nright of screen to Play", titleStyle);
        description.anchor.set(0.5);
        description.position.set(this.width + 10, this.height - 150);
        this.addChild(description);
    }
}
