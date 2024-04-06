import { Draw, Game } from './models';

export const minimalCubeSet = (games: Game[]): number => {
  return games.reduce((totalPower, game) => {
    let maxRed = 0, maxGreen = 0, maxBlue = 0;
    game.draws.forEach(draw => {
      maxRed = Math.max(maxRed, draw.red || 0);
      maxGreen = Math.max(maxGreen, draw.green || 0);
      maxBlue = Math.max(maxBlue, draw.blue || 0);
    });

    const gamePower = maxRed * maxGreen * maxBlue;
    return totalPower + gamePower;
  }, 0);
};