import { GameBarrel } from "./gameBarrel";
import { GameControl } from "./gameControl";
import { GameBall } from "./gameBall";
import { GameObstacle } from "./gameObstacle";
import { GameBlast } from "./gameBlast";
import { GameTarget } from "./gameTarget";
import { buildObstacle } from "./gameObstacleLevels";

export class Game {
    public data: any;
    private control: GameControl;
    public trajectory: GameBarrel;
    public target: GameTarget;
    public ball: GameBall;
    public blast: GameBlast;
    public obstacle: GameObstacle[];
    private gameObjects: any[];
    public win: boolean;
    public startGame: boolean;
    public touches: number;
    public difficult: number;
    public shots: number;
    public level: number;
    private shotsElement: HTMLElement;
    private touchesElement: HTMLElement;


    constructor(private readonly context: CanvasRenderingContext2D, public gameWidth: number, public gameHeight: number) {
        this.data = JSON.parse(localStorage.getItem('game')) || {};
        this.control = new GameControl(this);
        this.trajectory = new GameBarrel(this);
        this.ball = new GameBall(this);
        this.target = new GameTarget(this);
        this.blast = new GameBlast(this);
        this.obstacle = [];
        this.gameObjects = [];
        this.win = false;
        this.startGame = false;
        this.touches = 3;
        this.difficult = 3;
        this.shots = 2;
        this.level = this.data.level || 1;
        this.shotsElement = null;
        this.touchesElement = null;

        this.init();
    }

    public init(): void {
        this.shotsElement = document.querySelector('.js-strike-icon');
        this.touchesElement = document.querySelector('.js-touches-count');
        this.obstacle = buildObstacle(this);
        this.touchesElement.textContent = this.difficult.toString();
        this.gameObjects = [this.trajectory, this.target, this.blast, ...this.obstacle];
        this.createShots();
    }

    public draw(): void {
        if (this.touches <= 0 && !this.win) {
            this.shots--;
            if (this.shots > 0) {
                this.touches = this.difficult;
                this.startGame = false;
                this.ball = new GameBall(this);
                this.trajectory = new GameBarrel(this);
                this.ball.draw(this.context);
                this.gameObjects = [this.trajectory, this.target, this.blast, ...this.obstacle];
                this.createShots();
            } else {
                this.createShots();
                this.endGame(this.context);
            }
        } else {
            this.ball.draw(this.context);
            this.gameObjects.forEach(object => object.draw(this.context));
            if (this.win) {
                setTimeout(() => {
                    this.endGame(this.context, 'rgba(82, 5, 247, 0.6)', `YOU\`RE WIN` );
                }, 2000)
            }
        }
    }

    public update(): void {
        if (this.startGame) {
            this.ball.update();
            this.control.levelSelect.disabled = true;
        }
        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.gameObjects.forEach(object => object.update());
    }

    private endGame(context: CanvasRenderingContext2D, backgroundColor?: string, text?: string): void {
        context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        context.rect(0, 0, this.gameWidth, this.gameHeight);
        context.fillStyle = backgroundColor || 'rgba(0, 0, 0, 0.8)';
        context.fill();
        context.font = '30px Arial';
        context.fillStyle = '#fff';
        context.textAlign = 'center';
        context.fillText(text || 'GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
    }

    private createShots(): void {
        this.shotsElement.textContent = '';
        for (let i = 0; i < this.shots; i++) {
            this.shotsElement.textContent += String.fromCodePoint(0x1F4A2);
        }

        if (!this.shots) {
            this.shotsElement.textContent = String.fromCodePoint(0x1F61E);
        }
    }

    public resetGame(): void {
        location.reload();
    }

    public createStorage(): void {
        localStorage.setItem('game', JSON.stringify({ level: this.level }));
    }
}
