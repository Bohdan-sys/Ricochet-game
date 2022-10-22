import { Game } from "./game";
import { GameObstacle } from "./gameObstacle";

import BRICK_BLUE from "../../img/brick-blue.png";
import BRICK_GREEN from "../../img/brick-green.png";
import BRICK_PURPLE from "../../img/brick-purple.png";
import BRICK_RED from "../../img/brick-red.png";
import BRICK_YELLOW from "../../img/brick-yellow.png";
import ASTEROID from "../../img/asteroid.png";
import METEOR from "../../img/meteor.png";

export function buildObstacle(game: Game) {
    let levels = [];
    const imagesArr = [BRICK_BLUE, BRICK_GREEN, BRICK_PURPLE, BRICK_RED, BRICK_YELLOW];
    const randomImage = (number = imagesArr.length) => Math.floor(Math.random() * number);
    switch (game.level) {
        case 1:
            game.target.position.x = game.gameWidth - 50;
            game.target.position.y = game.gameHeight - 350;
            game.blast.position.x = game.gameWidth - 80;
            game.blast.position.y = game.gameHeight - 380;
            game.touches = 3;
            game.difficult = 3;
            game.shots = 4;

            levels.push(
                new GameObstacle(game, {
                    x: game.gameWidth / 2, y: 120
                }, 70, 70, ASTEROID),
                new GameObstacle(game, {
                    x: game.gameWidth / 5, y: 80
                }, 50, 50, METEOR),
            );
            break;
        case 2:
            game.target.position.x = game.gameWidth - 60;
            game.target.position.y = game.gameHeight - 350;
            game.blast.position.x = game.gameWidth - 80;
            game.blast.position.y = game.gameHeight - 380;
            game.touches = 4;
            game.difficult = 4;
            game.shots = 3;

            levels.push(new GameObstacle(game, {
                x: 100, y: 200
            }, 30, 400, imagesArr[randomImage()]),
                new GameObstacle(game, {
                x: game.gameWidth / 1.4, y: 10
            }, 20, 250, imagesArr[randomImage()]),
                new GameObstacle(game, {
                    x: game.gameWidth - 90, y: 140
                }, 40, 40, METEOR),
            );
            break;
        case 3:
            game.target.position.x = 0;
            game.target.position.y = 30;
            game.blast.position.x = 0;
            game.blast.position.y = 20;
            game.touches = 4;
            game.difficult = 4;
            game.shots = 2;
            levels.push(new GameObstacle(game, {
                x: game.gameWidth / 3, y: 256
            }, 60, 200, imagesArr[randomImage()]),
                new GameObstacle(game, {
                x: game.gameWidth / 2, y: 90
            }, 200, 40, imagesArr[randomImage()]),
                new GameObstacle(game, {
                    x: 100, y: 160
                }, 30, 40, METEOR),
                new GameObstacle(game, {
                    x: 80, y: 40
                }, 30, 30, ASTEROID),
                new GameObstacle(game, {
                    x: 250, y: 350
                }, 40, 40, ASTEROID),
            );
            break;
        case 4:
            game.target.position.x = game.gameWidth - 60;
            game.target.position.y = game.gameHeight - 50;
            game.blast.position.x = game.gameWidth - 100;
            game.blast.position.y = game.gameHeight - 100;
            game.touches = 4;
            game.difficult = 4;
            game.shots = 2;
            levels.push(new GameObstacle(game, {
                    x: game.gameWidth / 3, y: 260
                }, 20, 100, imagesArr[randomImage()]),
                new GameObstacle(game, {
                    x: game.gameWidth / 1.3, y: 90
                }, 70, 70, ASTEROID),
                new GameObstacle(game, {
                    x: 100, y: 180
                }, 40, 40, METEOR),

                new GameObstacle(game, {
                    x: 260, y: 300
                }, 40, 40, METEOR),
                new GameObstacle(game, {
                    x: 80, y: 40
                }, 30, 30, ASTEROID),
                new GameObstacle(game, {
                    x: 200, y: 350
                }, 40, 40, ASTEROID),
            );
            break;
        default:
            break;
    }
    return levels;
}
