import { SubjectScore } from "./SubjectScore";

export type UserScore = { userId: string; totalPoints: number };

export type UserScoreWithSubject = {
  userId: string;
  subjectScore: SubjectScore;
};
