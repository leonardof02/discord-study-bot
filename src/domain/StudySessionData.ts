import { StudySession } from "./StudySession";

export interface StudySessionData extends StudySession {
  id?: number;
  userId: string;
  challengeCompleted: boolean;
  humanReadableTotalTime: string;
}