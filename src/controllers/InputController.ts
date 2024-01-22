export default class InputController {
    isMovingLeft: boolean = false;
    isMovingRight: boolean = false;

    constructor() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));

        // Add touch event listeners
        document.addEventListener("touchstart", this.handleTouchStart.bind(this));
        document.addEventListener("touchend", this.handleTouchEnd.bind(this));
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

    private handleTouchStart(event: TouchEvent) {
        // Assuming you have left and right buttons on your touch interface
        const touchX = event.touches[0].clientX;

        // Adjust these values based on your game's layout
        const screenWidth = window.innerWidth;
        const middleX = screenWidth / 2;

        if (touchX > middleX) {
            // Right side touched
            this.isMovingRight = true;
        } else {
            // Left side touched
            this.isMovingLeft = true;
        }
    }

    private handleTouchEnd(event: TouchEvent) {
        // Reset both flags when touch ends
        this.isMovingLeft = false;
        this.isMovingRight = false;
    }
}
