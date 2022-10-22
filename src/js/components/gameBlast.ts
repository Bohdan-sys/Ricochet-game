import { Game } from "./game";
import { IObject } from "../utils/gameInterface";
import BLAST from "../../img/blast.png";

export class GameBlast implements IObject {
    image: HTMLImageElement;
    private readonly audio: HTMLAudioElement;
    position: {x: number, y: number};
    width: number;
    height: number;

    constructor(private game: Game) {
        this.image = new Image();
        this.audio = new Audio('./files/explosion.flac');
        this.width = 0;
        this.height = 0;
        this.position = {
            x: game.target.position.x - 20,
            y: game.target.position.y - 20
        };
    }
    public draw(ctx: CanvasRenderingContext2D): void {
        const { x, y } = this.position;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.image.src = BLAST;
        ctx.drawImage(this.image, x, y, this.width, this.height);
    }
    public update(): void {
        if (this.game.win && this.width <= 200) {
            this.audio.play();
            this.width = 100;
            this.height = 100;
        }
    }
}


