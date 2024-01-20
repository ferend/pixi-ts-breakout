import { Application, Graphics } from "pixi.js";
import { Brick } from "./Brick";
import { gameConfig } from "../gameConfig";

export default class Level {
    public bricks: Array<Brick>;

    constructor() {
        console.log("level loaded!");
        this.bricks = [];
    }

    public load(n: number): void {
        const tmp = this.JSONLoader("assets/levels/" + n + ".json");
        this.bricks = tmp.bricks;
    }

    public createLevelBricks(app: Application) {
        for (let i = 0, l = this.bricks.length; i < l; i++) {
            const b = this.bricks[i];
            b.x = parseInt(String(b.x));
            b.y = parseInt(String(b.y));
            b.width = parseInt(String(b.width));
            b.height = parseInt(String(b.height));
            b.score = parseInt(String(b.score));

            const wb = new Graphics();
            wb.beginFill(0xfffff0);
            const offsetX = (gameConfig.width - b.width) / 6;
            const offsetY = (gameConfig.height - b.height) / 120;

            wb.drawRect(b.x + offsetX, b.y + offsetY, b.width, b.height);

            this.addBrick(wb);
            app.stage.addChild(wb);
        }
    }

    addBrick(spr: Graphics): Graphics {
        this.bricks.push({
            x: spr.position.x,
            y: spr.position.y,
            width: spr.width,
            height: spr.height,
            color: spr.fill,
            score: 10,
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
