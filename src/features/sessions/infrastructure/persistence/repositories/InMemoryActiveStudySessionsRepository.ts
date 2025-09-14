import { IActiveStudySessionRepository } from "../../../domain/interfaces/IActiveStudySessionRepository";
import { StudySession } from "../../../domain/entities/StudySession";

export class InMemoryActiveStudySessionsRepository
  implements IActiveStudySessionRepository
{
  private readonly activeStudySessions: Record<
    string,
    StudySession | undefined
  > = {};

  constructor() {
    this.activeStudySessions = {};
  }

  addStudySession(studySession: StudySession, challenge?: Challenge): void {
    this.activeStudySessions[studySession.userId] = new StudySession({
      ...studySession,
      challenge,
    });
  }
  removeStudySession(userId: string): void {
    delete this.activeStudySessions[userId];
  }
  getStudySession(userId: string): StudySession | undefined {
    return this.activeStudySessions[userId];
  }
  saveSession(userId: string, studySession: StudySession): void {
    this.activeStudySessions[userId] = studySession;
  }
}
