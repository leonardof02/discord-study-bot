import { StudySessionData } from "../models/ArchivedStudySession";

const activeStudySessions: Record<string, StudySession> = {};

export function addStudySession(studySession: StudySessionData) {
  activeStudySessions[studySession.userId] = studySession;
}

export function removeStudySession(userId: string) {
  delete activeStudySessions[userId];
}

export function getStudySession(userId: string) {
  return activeStudySessions[userId];
}
