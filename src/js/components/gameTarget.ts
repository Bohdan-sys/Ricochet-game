import { Game } from "./game";
import { IObject } from "../utils/gameInterface";
import UFO from "../../img/ufo.png";

export class GameTarget implements IObject {
    image: HTMLImageElement;
    position: {x: number, y: number};
    width: number;
    height: number;

    constructor(private game: Game) {
        this.image = new Image();
        this.width = 50;
        this.height = 25;
        this.position = {
            x: game.gameWidth - 60,
            y: game.gameHeight - 350,
        };
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const { x, y } = this.position;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.image.src = UFO;
        ctx.drawImage(this.image, x, y, this.width, this.height);
    }

    public update(): void {
        if (this.game.win) {
            this.width = 0;
            this.height = 0;
        }
    }
}
