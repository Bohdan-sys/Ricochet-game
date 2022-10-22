import { Game } from "./game";
import { IObject } from "../utils/gameInterface";
import { detectCollision } from "./gameCollisionDetection";
import PURPLE_BRICK from "../../img/brick-purple.png"

export class GameObstacle implements IObject {
    image: HTMLImageElement;
    position: {x: number, y: number};
    width: number;
    height: number;
    color: string;

    constructor(public game: Game, position: {x: number, y: number}, width?: number, height?: number, color?: string) {
        this.image = new Image;
        this.position = position;
        this.width = width || 60;
        this.height = height || this.game.gameHeight;
        this.color = color || PURPLE_BRICK;
    }
    public draw(ctx: CanvasRenderingContext2D) {
        const { x, y } = this.position;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.image.src = this.color;
        ctx.drawImage(this.image, x, y, this.width, this.height);
    }
    public update() {
        detectCollision(this.game.ball, this);
    }
}
