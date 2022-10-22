import { Game } from "./components/game";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const GAME_WIDTH = 400;
    const GAME_HEIGHT = 400;

    const game = new Game(context, GAME_WIDTH, GAME_HEIGHT);

    function gameLoop() {
        game.update();
        game.draw();

        if (game.shots <= 0 || game.win) {
            return;
        }

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
});
