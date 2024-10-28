import { StudySession } from "../../domain/StudySession";
import { StudySessionData } from "../models/ArchivedStudySession";

const activeStudySessions: Record<string, StudySession> = {};

export function addStudySession(
  studySession: StudySessionData,
  challenge?: Challenge
) {
  activeStudySessions[studySession.userId] = {
    ...studySession,
    challenge,
  };
}

export function removeStudySession(userId: string) {
  delete activeStudySessions[userId];
}

export function getStudySession(userId: string) {
  return activeStudySessions[userId];
}

export function setStudySession(userId: string, studySession: StudySession) {
  activeStudySessions[userId] = studySession;
}
