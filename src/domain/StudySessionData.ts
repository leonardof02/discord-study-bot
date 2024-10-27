export interface StudySessionData extends StudySession {
  id?: number;
  userId: string;
  humanReadableTotalTime: string;
}
