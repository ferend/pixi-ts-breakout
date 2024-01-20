import { Application } from "pixi.js";
import Level from "./models/Level";
import PlayerPad from "./models/PlayerPad";
import Ball from "./models/Ball";
import GameWorld from "./core/GameWorld";
export default class Game {
    app: Application;
    level: Level;
    private pad: PlayerPad;
    private ball: Ball;
    private speed: number = 5; // Adjust the speed as needed
    private isMovingLeft: boolean = false;
    private isMovingRight: boolean = false;
    private gameWorld: GameWorld;
    constructor(app: Application) {
        this.app = app;
        this.level = new Level();
        this.ball = new Ball(app);
        this.pad = new PlayerPad(app);
        this.gameWorld = new GameWorld(app);
        this.createLevel();
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
        this.app.ticker.add(this.update.bind(this));
    }

    private createLevel() {
        this.level.load(1);
        this.level.createLevelBricks(this.app);
    }

    private update() {
        if (this.pad === undefined) return;

        if (this.isMovingLeft && this.pad.x > this.gameWorld.leftBorder.width) {
            this.pad.x -= this.speed;
        }
        if (
            this.isMovingRight &&
            this.pad.x < this.app.screen.width - this.gameWorld.rightBorder.width - this.pad.width - 640
        ) {
            this.pad.x += this.speed;
        }
    }

    private handleKeyDown(event: KeyboardEvent) {
        if (event.key === "ArrowRight") {
            this.isMovingRight = true;
        }

        if (event.key === "ArrowLeft") {
            this.isMovingLeft = true;
        }
    }

    private handleKeyUp(event: KeyboardEvent) {
        if (event.key === "ArrowRight") {
            this.isMovingRight = false;
        }

        if (event.key === "ArrowLeft") {
            this.isMovingLeft = false;
        }
    }
}
