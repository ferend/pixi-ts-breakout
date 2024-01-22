import { Application } from "pixi.js";
import Level from "./models/Level";
import PlayerPad from "./models/PlayerPad";
import Ball from "./models/Ball";
import GameWorld from "./core/GameWorld";
import { Constants } from "./helpers/Constants";
import { gameConfig } from "./gameConfig";
import InputHandler from "./core/InputHandler";
import { ScoreText } from "./ui/scoreText";
export default class Game {
    app: Application;
    level: Level;
    private pad: PlayerPad;
    private ball: Ball;
    private gameWorld: GameWorld;
    private inputHandler: InputHandler;
    private scoreText: ScoreText;

    constructor(app: Application) {
        this.app = app;
        this.inputHandler = new InputHandler();
        this.level = new Level(app);
        this.ball = new Ball(app);
        this.pad = new PlayerPad(app);
        this.gameWorld = new GameWorld(app);
        this.scoreText = new ScoreText(app);
        this.createLevel();
        this.app.ticker.add(this.update.bind(this));
    }

    private createLevel() {
        this.level.load(1);
        this.level.createLevelBricks();
    }

    private update() {
        if (this.pad === undefined) return;

        if (this.inputHandler.isMovingLeft && this.pad.x > this.gameWorld.leftBorder.width) {
            this.pad.x -= Constants.speed;
        }
        if (
            this.inputHandler.isMovingRight &&
            this.pad.x < this.app.screen.width - this.gameWorld.rightBorder.width - this.pad.width - 640
        ) {
            this.pad.x += Constants.speed;
        }

        this.CheckCollision();
        this.ball.position.x += Constants.ballSpeedX;
        this.ball.position.y += Constants.ballSpeedY;
    }

    private CheckCollision(): void {
        let collisionX: boolean = false,
            collisionY: boolean = false;
        const blx: number = this.ball.position.x + Constants.ballSpeedX,
            bly: number = this.ball.position.y + Constants.ballSpeedY;

        let hBounds: boolean =
            this.ball.position.x + this.ball.width > this.pad.position.x &&
            this.ball.position.x < this.pad.position.x + this.pad.width;
        let vBounds: boolean =
            this.ball.position.y + this.ball.height > this.pad.position.y &&
            this.ball.position.y < this.pad.position.y + this.pad.height;

        if (
            Constants.ballSpeedY > 0 &&
            hBounds &&
            this.ball.position.y + this.ball.height >= this.pad.position.y &&
            this.ball.position.y < this.pad.position.y + this.pad.width / 2
        ) {
            Constants.ballSpeedX =
                -(this.pad.position.x + this.pad.width / 2 - (this.ball.position.x + this.ball.width / 2)) / 4;
            collisionY = true;
            console.log("Collision with pad");
        }

        for (let i = 0; i < this.level.bricks.length; i++) {
            const b = this.level.bricks[i];

            hBounds = this.ball.position.x + this.ball.width > b.x && this.ball.position.x < b.x + b.width;
            vBounds = this.ball.position.y + this.ball.height > b.y && this.ball.position.y < b.y + b.height;

            if (
                hBounds &&
                ((bly + this.ball.height >= b.y && bly < b.y + b.width / 2) || // Top Collision
                    (bly + this.ball.height > b.y && bly <= b.y + b.height / 2))
            ) {
                // Bottom Collision
                collisionY = true;
                console.log("Vertical hit with block " + i);
                this.hitBrick(i);
            }

            if (
                vBounds &&
                ((blx + this.ball.width >= b.x && blx < b.x + b.width / 2) || // Left Collision
                    (blx <= b.x + b.width && blx + this.ball.width > b.x + b.width / 2))
            ) {
                // Right or leftCollision
                collisionX = true;
                console.log("Horizontal hit with block " + i);
                this.hitBrick(i);
            }

            // TODO: Slow motion effect
            if (this.level.bricks.length == 1) {
            }
        }

        if (blx + this.ball.width >= gameConfig.width) {
            collisionX = true;
            console.log("Collision with right bound");
        }

        if (blx <= 0) {
            collisionX = true;
            console.log("Collision with left bound");
        }

        if (bly <= 0) {
            collisionY = true;
            console.log("Collision with top bound");
        }

        if (bly >= gameConfig.height) {
            console.log("lose life");
        }

        if (this.level.bricks.length == 0) {
            console.log("no more brick");
        }

        if (collisionX) {
            Constants.ballSpeedX = -Constants.ballSpeedX;
        }

        if (collisionY) {
            Constants.ballSpeedY = -Constants.ballSpeedY;
        }
    }

    private hitBrick(i: number): void {
        //score += bricks[i].score;
        this.scoreColor(this.level.bricks[i].score);
        this.level.removeBrick(i);
    }

    private scoreColor(points: number): void {
        this.scoreText.score += points;
    }
}
