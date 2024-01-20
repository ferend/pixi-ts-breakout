// @ts-ignore

import "./style.css";
import { Application, Assets } from "pixi.js";
import { gameConfig } from "./gameConfig";
import Game from "./Game";

declare const VERSION: string;
console.log(`Welcome from Breakout. Pixi version:  ${VERSION}`);

const app = new Application(gameConfig);

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    document.body.appendChild(app.view);

    resizeCanvas();
    app.stage.interactive = true;

    new Game(app);
};

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "pad",
                assets: [
                    {
                        name: "pad",
                        srcs: "./assets/pad.png",
                    },
                ],
            },
            {
                name: "ball",
                assets: [
                    {
                        name: "ball",
                        srcs: "./assets/ball.png",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.loadBundle(["pad", "ball"]);
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameConfig.width;
        app.stage.scale.y = window.innerHeight / gameConfig.height;
    };

    resize();
}
