// src/features/sessions/domain/IStudySessionRepository.ts

import { createDIToken } from "@fioc/core";
import { StudySession } from "../entities/StudySession";

export interface IActiveStudySessionRepository {
  addStudySession(studySession: StudySession, challenge?: Challenge): void;
  removeStudySession(userId: string): void;
  getStudySession(userId: string): StudySession | undefined;
  saveSession(userId: string, studySession: StudySession): void;
}

export const IActiveStudySessionRepositoryToken =
  createDIToken<IActiveStudySessionRepository>().as("IActiveStudySessionRepository");
