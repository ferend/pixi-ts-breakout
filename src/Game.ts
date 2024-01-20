import { Application } from "pixi.js";
import Level from "./models/Level";
import PlayerPad from "./models/playerPad";
export default class Game {
    app: Application;
    level: Level;
    private pad: PlayerPad;

    constructor(app: Application) {
        this.app = app;
        this.level = new Level();
        this.createLevel();
        this.pad = new PlayerPad(app);
    }

    private createLevel() {
        this.level.load(1);
        this.level.createLevelBricks(this.app);
    }
}
