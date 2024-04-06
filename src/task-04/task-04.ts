import { Points, RPSInput, Shape, Outcome } from './models/rock-paper-scissors';

export const rockPaperScissors = (gameSet: readonly RPSInput[]): number => {
  let totalPoints = 0;

  gameSet.forEach(({ shape, outcome }) => {
    let myShape: Shape;
    
    switch(outcome) {
      case Outcome.WIN:
        if (shape === Shape.ROCK) myShape = Shape.PAPER;
        else if (shape === Shape.PAPER) myShape = Shape.SCISSORS;
        else myShape = Shape.ROCK;
        break;
      case Outcome.LOOSE:
        if (shape === Shape.ROCK) myShape = Shape.SCISSORS;
        else if (shape === Shape.PAPER) myShape = Shape.ROCK;
        else myShape = Shape.PAPER;
        break;
      case Outcome.DRAW:
        myShape = shape;
        break;
    }

    
    const pointsForMyShape = Points.get(myShape) ?? 0;
    const pointsForOutcome = Points.get(outcome) ?? 0;

    totalPoints += pointsForMyShape + pointsForOutcome;
  });

  return totalPoints;
};
