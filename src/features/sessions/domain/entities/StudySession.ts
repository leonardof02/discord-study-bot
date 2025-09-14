export interface StudySessionParams {
  id: string;
  userId: string;
  subjectId?: string;
  totalTime?: number;
  points?: number;
  startTime?: number;
  challenge?: Challenge;
}

export class StudySession implements StudySessionParams {
  public readonly id: string;
  public readonly userId: string;
  public subjectId?: string;
  public totalTime: number | undefined;
  public points: number;
  public startTime: number | undefined;
  public readonly challenge?: Challenge;

  constructor({
    id,
    userId,
    subjectId,
    challenge,
  }: StudySessionParams) {
    this.id = id;
    this.userId = userId;
    this.subjectId = subjectId;
    this.challenge = challenge;
    this.points = 0;
  }

  public start() {
    this.startTime = Date.now();
    if (this.challenge) this.challenge.isActive = true;
  }

  public finish() {
    if (!this.startTime)
      throw new Error(`Session from <@${this.userId}> not started yet`);
    this.totalTime = Date.now() - this.startTime;
    this.calculatePoints();
  }

  public changeSubject(newSubjectId: string) {
    this.subjectId = newSubjectId;
  }

  public get humanReadableTotalTime() {
    if (!this.totalTime) return "0:00:00";
    return new Date(this.totalTime).toISOString().substr(11, 8);
  }

  private calculatePoints() {
    if (!this.startTime)
      throw new Error(`Session from <@${this.userId}> not started yet`);

    const passedTime = Date.now() - this.startTime;
    const pointsGained = Math.round((passedTime / (1000 * 60)) * 100) / 100;

    if (!this.isChallengeCompleted) this.points = pointsGained;

    const challengePoints = this.challenge?.isActive ? pointsGained * 0.1 : 0;
    this.points = this.challenge?.isRandom
      ? Number.parseFloat((pointsGained * 2).toFixed(2))
      : Number.parseFloat((pointsGained + challengePoints).toFixed(2));
  }

  public get isChallengeCompleted() {
    if (!this.challenge || !this.startTime) return false;
    return Date.now() - this.startTime > this.challenge?.time * 1000;
  }
}
