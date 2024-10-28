const activeChallenges: Record<string, Challenge> = {};

export function getChallenge(userId: string) {
  return activeChallenges[userId];
}

export function setChallenge(userId: string, challenge: Challenge) {
  activeChallenges[userId] = challenge;
}

export function removeChallenge(userId: string) {
  delete activeChallenges[userId];
}