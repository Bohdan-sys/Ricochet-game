import { Game } from "./game";
import FIREBALL from "../../img/fireball.png";

export class GameBall {
    private readonly image: HTMLImageElement;
    public audio: HTMLAudioElement;
    public speed: {x: number, y: number};
    public position: {x: number, y: number};
    private readonly gameHeight: number;
    private readonly gameWidth: number;
    public size: number;
    public angle: number;

    constructor(private game: Game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.image = new Image();
        this.audio = new Audio('./files/nutfall.flac');
        this.angle = 4;
        this.size = 20;
        this.speed = {
            x: 4 - (this.angle * 0.8),
            y: 2
        };
        this.position = {
            x: 0,
            y: game.gameHeight - 30
        };
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        this.image.src = FIREBALL;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    public update(): void {
        if (!this.game.win) {
            const { x, y } = this.game.target.position;
            const targetBottom = y + this.game.target.height;
            const rightSideOfTarget = x + this.game.target.width;

            this.position.x += this.speed.x * (this.angle - 0.2);
            this.position.y -= this.speed.y;

            if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
                this.game.touches--;
                this.audio.play();
                this.speed.x = -this.speed.x;
            }
            if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
                this.game.touches--;
                this.audio.play();
                this.speed.y = -this.speed.y;
            }
            if (this.position.x + this.size >= x
                && this.position.x <= rightSideOfTarget
                && this.position.y + this.size >= y
                && this.position.y <= targetBottom) {
                this.size = 0;
                this.game.win = true;
            }
        }
    }
}
