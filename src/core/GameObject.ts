import { Container, IDestroyOptions, Sprite } from "pixi.js";

class GameObject extends Container {
    sprite: Sprite;
    private _arrX: number;
    private _arrY: number;

    constructor() {
        super();
        this.sprite = new Sprite();
        this._arrX = 0;
        this._arrY = 0;
    }

    getSprite(): Sprite {
        return this.sprite;
    }

    setSprite(sprite: Sprite) {
        this.removeChild(sprite);

        this.sprite = sprite;

        this.addChild(sprite);

        //Game.Instance.app.stage.addChild(this);
    }

    get arrY(): number {
        return this._arrY;
    }

    set arrY(value: number) {
        this._arrY = value;
    }
    get arrX(): number {
        return this._arrX;
    }

    set arrX(value: number) {
        this._arrX = value;
    }

    destroy(options: IDestroyOptions) {
        super.destroy(options);
    }
}

export default GameObject;
