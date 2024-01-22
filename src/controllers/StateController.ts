import { GameStates } from "../helpers/GameStates";

export class StateController {
    private _currentState: GameStates;

    constructor() {
        this._currentState = GameStates.Default;
    }

    public get currentState(): GameStates {
        return this._currentState;
    }

    private set currentState(value: GameStates) {
        this._currentState = value;
    }

    public startGame(): void {
        this.currentState = GameStates.Playing;
    }

    public gameOver(): void {
        this.currentState = GameStates.GameOver;
    }

    public restartGame(): void {
        this.currentState = GameStates.Playing;
    }
}
