export interface StudySession {
  subjectName: string;
  totalTime: number;
  points: number;
  startTime: number;
  challenge?: Challenge;
}