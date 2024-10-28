"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudySession = addStudySession;
exports.removeStudySession = removeStudySession;
exports.getStudySession = getStudySession;
exports.setStudySession = setStudySession;
const activeStudySessions = {};
function addStudySession(studySession, challenge) {
    activeStudySessions[studySession.userId] = Object.assign(Object.assign({}, studySession), { challenge });
}
function removeStudySession(userId) {
    delete activeStudySessions[userId];
}
function getStudySession(userId) {
    return activeStudySessions[userId];
}
function setStudySession(userId, studySession) {
    activeStudySessions[userId] = studySession;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3R1ZHlTZXNzaW9uUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3JpZXMvU3R1ZHlTZXNzaW9uUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLDBDQVFDO0FBRUQsZ0RBRUM7QUFFRCwwQ0FFQztBQUVELDBDQUVDO0FBdEJELE1BQU0sbUJBQW1CLEdBQWlDLEVBQUUsQ0FBQztBQUU3RCxTQUFnQixlQUFlLENBQzdCLFlBQThCLEVBQzlCLFNBQXFCO0lBRXJCLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsbUNBQ25DLFlBQVksS0FDZixTQUFTLEdBQ1YsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjO0lBQy9DLE9BQU8sbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxNQUFjO0lBQzVDLE9BQU8sbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxNQUFjLEVBQUUsWUFBMEI7SUFDeEUsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQzdDLENBQUMifQ==