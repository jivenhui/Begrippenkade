export class QuizResult {
  id: number;
  listName: string;
  correctAnswers: number;
  totalAnswers: number;
  percentageCorrect: number;
  date: Date;

  constructor(id: number, listName: string, correctAnswers: number, totalAnswers: number, date: Date) {
    this.id = id;
    this.listName = listName;
    this.correctAnswers = correctAnswers;
    this.totalAnswers = totalAnswers;
    this.percentageCorrect = Math.round((correctAnswers / totalAnswers) * 100);
    this.date = date;
  }
}
