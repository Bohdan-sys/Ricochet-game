import {GameBall} from "./gameBall";
import {GameObstacle} from "./gameObstacle";

export function detectCollision(ball: GameBall, gameObject: GameObstacle) {
    const { x: ballX, y: ballY } = ball.position;
    const { x: objectX, y: objectY } = gameObject.position;

    if (ballX + ball.size / 2 >= objectX
        && ballX <= objectX + gameObject.width
        && ballY + ball.size / 2 >= gameObject.position.y
        && ballY <= objectY + gameObject.height) {
        if (!(ballY > objectY - ball.size / 2
            && ballY < objectY + gameObject.height)) {
            if (ballY === objectY - ball.size / 2) {
                if ((ballY < objectY) && (ballY === objectY - ball.size / 2)) {
                    ball.position.y = ball.position.y - ball.size / 2;
                    ball.audio.play();
                    gameObject.game.touches--;
                    return ball.speed.y = -ball.speed.y;
                }
                ball.position.x = ball.position.x - ball.size / 2;
                ball.audio.play();
                gameObject.game.touches--;
                return ball.speed.x = -ball.speed.x;
            }
            ball.position.y = ball.position.y + ball.size / 2;
            ball.audio.play();
            gameObject.game.touches--;
            return ball.speed.y = -ball.speed.y;
        }
        ball.audio.play();
        gameObject.game.touches--;
        return ball.speed.x = -ball.speed.x;
    }
}


