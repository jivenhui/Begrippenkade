export class QuizInput {
  listEntry: string;
  expectedTranslation: string;
  receivedTranslation: string;

  constructor(listEntry: string, expectedTranslation: string, receivedTranslation: string) {
    this.listEntry = listEntry;
    this.expectedTranslation = expectedTranslation;
    this.receivedTranslation = receivedTranslation;
  }
}
