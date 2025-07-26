const isGameOver = (history: GameHistory, winner: string | null) =>
  history.length - 1 === 9 && winner === '';

export default isGameOver;
