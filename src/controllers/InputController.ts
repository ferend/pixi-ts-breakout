export default class InputController {
    isMovingLeft: boolean = false;
    isMovingRight: boolean = false;

    constructor() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
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
