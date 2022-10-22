export interface IObject {
    image: HTMLImageElement;
    position: {x: number, y: number};
    width: number;
    height: number;
    draw(ctx: CanvasRenderingContext2D): void;
    update(): void;
}
