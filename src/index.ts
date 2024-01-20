import "pixi-spine";
import "./style.css";
import { Application } from "pixi.js";
import { gameConfig } from "./gameConfig";
import Game from "./Game";
import { attachConsole } from "./utils/attach-console";

// import { attachConsole } from "./utils/attach-console";

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

    if (VERSION.includes("d")) {
        // if development version
        attachConsole(app.stage, gameConfig.width, gameConfig.height);
    }
};

async function loadGameAssets(): Promise<void> {}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    resize();

    window.addEventListener("resize", resize);
}
