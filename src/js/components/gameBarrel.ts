import { Game } from "./game";
import { IObject } from "../utils/gameInterface";
import LASER from "../../img/laser.png";

export class GameBarrel implements IObject {
    image: HTMLImageElement;
    private readonly audio: HTMLAudioElement;
    private angle: number;
    position: {x: number, y: number};
    width: number;
    height: number;

    constructor(private game: Game) {
        this.audio = new Audio('./files/shot.wav');
        this.image = new Image();
        this.angle = -80;
        this.width = 100;
        this.height = 40;
        this.position = {
            x: 0,
            y: game.gameHeight - 10
        };
    }
    draw(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.position;
        ctx.translate(x, y);
        ctx.rotate(this.angle * Math.PI / 360);
        this.image.src = LASER;
        ctx.drawImage(this.image, -30, -20, this.width, this.height);
    }

    update(): void {

    }

    public moveUp(): void {
        if (this.angle <= -135 || this.game.startGame) {
            return;
        }
        this.angle -= 2;
        this.game.ball.angle -= 0.12;
    }

    public moveDown(): void {
        if (this.angle >= -30 || this.game.startGame) {
            return;
        }
        this.angle += 2;
        this.game.ball.angle += 0.12;
    }

    public fire(): void {
        if (!this.game.startGame) {
            this.audio.play();
            this.game.startGame = true;
        }
    }
}
