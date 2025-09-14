// src/features/sessions/domain/IArchivedStudySessionRepository.ts

import { SubjectScore } from "../../../points/domain/SubjectScore";
import { UserScore } from "../../../points/domain/UserScore";
import { StudySession } from "../entities/StudySession";

export interface IFinishedStudySessionRepository {
  archiveSession(session: StudySession): Promise<string>;
  getArchivedSessions(): Promise<StudySession[]>;
  getPointsSumsPerUser(): Promise<UserScore[]>;
  getLast(n: number): Promise<StudySession[]>;
  getPointsSumsPerUserWithSubject(): Promise<
    Record<string, Record<string, number>>
  >;
  getPointsSumsWithSubjectFromUser(userId: string): Promise<SubjectScore[]>;
  getStudySessionsFromUser(
    userId: string
  ): Promise<{ subjectName: string | null; totalPoints: number }[]>;
}
