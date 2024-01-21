import { Application, Sprite, Texture } from "pixi.js";
import { Brick } from "./Brick";

export default class Level {
    public bricks: Array<Brick>;
    private app: Application;
    constructor(app: Application) {
        this.app = app;
        console.log("level loaded!");
        this.bricks = [];
    }

    public load(n: number): void {
        const tmp = this.JSONLoader("assets/levels/" + n + ".json");
        this.bricks = tmp.bricks;
    }

    public createLevelBricks() {
        for (let i = 0, l = this.bricks.length; i < l; i++) {
            const b = this.bricks[i];
            b.x = parseInt(String(b.x)) + 150;
            b.y = parseInt(String(b.y));
            b.width = parseInt(String(b.width));
            b.height = parseInt(String(b.height));
            b.score = parseInt(String(b.score));

            const wb = new Sprite(Texture.from("pad"));
            wb.x = b.x;
            wb.y = b.y;

            this.addBrick(wb);
            this.app.stage.addChild(wb);
        }
    }

    public removeBrick(i: number): void {
        this.app.stage.removeChild(this.bricks[i].sprite);
        this.bricks.splice(i, 1);
    }

    addBrick(spr: Sprite): Sprite {
        this.bricks.push({
            x: spr.position.x,
            y: spr.position.y,
            width: spr.width,
            height: spr.height,
            score: 10,
            sprite: spr,
        });
        return spr;
    }

    // eslint-disable-next-line
    private JSONLoader(url: string): any {
        // eslint-disable-next-line
        let data: any;
        const request = new XMLHttpRequest();
        request.open("GET", url, false);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
            } else {
                console.error("Error loading bricks placement");
            }
        };

        request.onerror = () => {
            console.error("Error loading level");
        };

        request.send();
        return data;
    }

    list(): void {
        $.ajax({
            url: "layouts/",
            success: (data) => {
                $(data)
                    .find("a:contains(.json)")
                    .each(() => {
                        const image = $(this).attr("href");
                        console.log(image);
                    });
            },
        });
    }
}
