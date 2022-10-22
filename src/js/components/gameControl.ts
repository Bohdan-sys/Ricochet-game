import { Game } from "./game";

export class GameControl {
    private element: HTMLElement
    private fireBtn: HTMLElement;
    private upBtn: HTMLElement;
    private downBtn: HTMLElement;
    private restartBtn: HTMLElement;
    public levelSelect: HTMLSelectElement;

    constructor(private game: Game) {
        this.element = null;
        this.fireBtn = null;
        this.upBtn = null;
        this.downBtn = null;
        this.restartBtn = null;
        this.levelSelect = null;
        this.init();
    }

    private init(): void {
        this.element = document.querySelector('.js-control');
        this.fireBtn = this.element.querySelector('.js-fire-button');
        this.upBtn = this.element.querySelector('.js-up-button');
        this.downBtn = this.element.querySelector('.js-down-button');
        this.restartBtn = this.element.querySelector('.js-restart-button');
        this.levelSelect = this.element.querySelector('.js-level-select');
        this.levelSelect.value = this.game.data.level || 1;

        document.addEventListener('keydown', e => {
            switch (e.code) {
                case 'ArrowUp':
                    this.game.trajectory.moveUp();
                    break;
                case 'ArrowDown':
                    this.game.trajectory.moveDown();
                    break;
                case 'Space':
                    this.game.trajectory.fire();
                    break;
            }
        });

        if (this.element) {
            this.element.addEventListener('click', ({ target }) => {
                if (target === this.fireBtn) {
                    this.game.trajectory.fire();
                }
                if (target === this.upBtn) {
                    this.game.trajectory.moveUp();
                }
                if (target === this.downBtn) {
                    this.game.trajectory.moveDown();
                }
                if (target === this.restartBtn) {
                    this.game.resetGame()
                }
            });

            this.levelSelect.addEventListener('input', () => {
                this.game.level = +this.levelSelect.value;
                this.game.createStorage();
                this.game.init();
            });
        }
    }
}
