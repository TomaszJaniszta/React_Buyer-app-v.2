import React, { useState, useEffect } from 'react';
import { board } from '../../common/consts/ExamInput';
import styles from './Ball2.module.scss';

function Ball2() {

  let play;
  let start = 0;
  let started = false;

  let gameBoardUpdate = () => {
    return board.map((indexTable) => (
      <div>
        {indexTable.map((element) => {
          if (element === 'X') {
            return <div className={styles.Wall}>C</div>; // g, C
          } else if (element === '1') {
            // if (started === false) {
            return (
              <div id="ball" className={started ? styles.BallRunning : styles.Ball}>
                y
              </div>
            );
            // } else {
            //   return (
            //     <div id="ballRunning" className={styles.BallRunning}>
            //       y
            //     </div>
            //   );
            // }
          } else if (element === '0') {
            return <div className={styles.Air}>c</div>;
          } else if (element === 'Y') {
            return <div className={styles.y}>s</div>;
          }
        })}
      </div>
    ));
  };

  let [gameBoardDisplay, setGameBoardDisplay] = useState(gameBoardUpdate());
  let [time, setTime] = useState(0);

  class BallGenerator {
    constructor(board) {
      this.board = board;
    }
    generateBall() {
      let y;
      let x;
      for (let i = 0; i < board.length; i++) {
        let tempX = board[i].indexOf('1');
        if (tempX > -1) {
          y = i;
          x = tempX;
        }
      }
      return { y: y, x: x };
    }
  }

  class Vector {
    constructor(y, x) {
      this.x = x * this.randomVector();
      this.y = y * this.randomVector();
    }
    randomVector() {
      if (Math.random() < 0.5) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  class Ball {
    constructor(y, x, vector) {
      this.x = x;
      this.y = y;
      this.vector = vector;
    }
    move() {
      this.x += this.vector.x;
      this.y += this.vector.y;
    }
  }

  class Game {
    constructor(ball, board) {
      this.ball = ball;
      this.board = board;
      this.startingX = Number(ball.x);
      this.startingY = Number(ball.y);
    }

    randomVector = () => {
      if (Math.random() < 0.5) {
        return (this.ball.vector.x *= -1);
      } else {
        return (this.ball.vector.y *= -1);
      }
    };

    checkForYCollision = () => {
      this.moveBall();
      this.randomVector();
    };

    checkForXCollision = () => {
      // corner X collision
      if (
        this.board[this.ball.y][this.ball.x + this.ball.vector.x] !== 'X' &&
        this.board[this.ball.y + this.ball.vector.y][this.ball.x] !== 'X'
      ) {
        this.randomVector();
      }
      // horizontal and vertical X collision
      if (this.board[this.ball.y][this.ball.x + this.ball.vector.x] === 'X') {
        this.ball.vector.x *= -1;
      }
      if (this.board[this.ball.y + this.ball.vector.y][this.ball.x] === 'X') {
        this.ball.vector.y *= -1;
      }
      this.moveBall();
    };

    moveBall = () => {
      this.board[this.ball.y][this.ball.x] = '0';
      this.board[this.ball.y + this.ball.vector.y][
        this.ball.x + this.ball.vector.x
      ] = '1';
      this.ball.move();
    };

    start() {
      // interval
      play = setInterval(() => {
        if (
          this.board[this.ball.y + this.ball.vector.y][
          this.ball.x + this.ball.vector.x
          ] === 'Y'
        ) {
          this.checkForYCollision();
        } else if (
          this.board[this.ball.y + this.ball.vector.y][
          this.ball.x + this.ball.vector.x
          ] === 'X'
        ) {
          this.checkForXCollision();
        } else {
          this.moveBall();
        }
        setTime(time += 1);
        setGameBoardDisplay(gameBoardUpdate());
        if (this.ball.x === this.startingX && this.ball.y === this.startingY) {
          clearInterval(play);
          alert('Game done!');
          console.log('Game over');
          window.location.reload();
        }
      }, 1000);
    }
  }

  let startBall = new BallGenerator(board).generateBall();
  let myVector = new Vector(1, 1);
  let movingBall = new Ball(startBall.y, startBall.x, myVector);
  let game = new Game(movingBall, board);

  const gameReset = () => {
    window.location.reload();
  };

  const handleButtonDown = (event) => {
    console.log('Button pressed');
    if (start < 1) {
      game.start();
      start += 1;
      started = !started;
      element.innerHTML === "Start" ? element.innerHTML = "Stop" : element.innerHTML = "Start";
    } else {
      start -= 1;
      started = !started;
      element.innerHTML === "Start" ? element.innerHTML = "Stop" : element.innerHTML = "Start";
      clearInterval(play);
    }
  };

  let element;

  React.useEffect(() => {
    // window.addEventListener('keydown', handleKeyDown);
    element = document.getElementById('myBtn');
    element.addEventListener('click', handleButtonDown);

    // cleanup this component
    return () => {
      clearInterval(play);
      element.removeEventListener('click', handleButtonDown);
    };
  }, []);

  return (
    <>
      <div className={styles.ball2}>
        <div>
          <p><b>Ball bouncy simulator v.2.</b><br /><br />The program is to show how the object would travel and bounce against the walls.<br />
            "?" blocks change the direction of the ball to random. The program is to end when object comes back to original position.<br />
            Ball v.2 version based on Webdings font.</p>
          {/* <p id="time">{`Time: ${time}`}</p> */}
        </div>
        <br />
        <div className={styles.board}>{gameBoardDisplay}</div>
        <div>
          <button
            type="button"
            id="myBtn"
          >
            Start
          </button>
          <button
            type="button"
            id="resetBtn"
            onClick={gameReset}
          >
            Reset
          </button>
        </div>
        <div className={styles.time}><p>{'Time: '}<b>{time}</b></p></div>
      </div>
    </>
  );
}

export default Ball2;