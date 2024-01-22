import { Application, Text, TextStyle } from "pixi.js";
import gsap from "gsap";

export class ScoreText extends Text {
    private _score: number = 0;

    constructor(app: Application) {
        super(
            "Score: 0",
            new TextStyle({
                fill: 0xffffff,
                fontSize: 84,
                fontFamily: "OverFont",
            }),
        );

        this.position.set(10, 10);
        app.stage.addChild(this);
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
        this.text = `Score: ${this._score}`;
        gsap.fromTo(
            this.scale,
            { x: 1, y: 1 },
            {
                x: 1.2,
                y: 1.2,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    this.scale.x = 1;
                    this.scale.y = 1;
                },
            },
        );
    }
}
