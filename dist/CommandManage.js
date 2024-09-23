"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manage = manage;
const StudySessionManager_1 = require("./services/StudySessionManager");
const actions = {
    "!ranking": StudySessionManager_1.getRanking,
    "!estudiar": StudySessionManager_1.startStudySession,
    "!terminar": StudySessionManager_1.endStudySession,
    "!sesiones": StudySessionManager_1.getLastSessions,
    "!estudio_general": StudySessionManager_1.startGeneralStudySession,
};
function manage(message) {
    const instructions = message.content.split(" ");
    const command = instructions[0];
    const args = [...instructions.slice(1)];
    if (command == null || !Object.keys(actions).includes(command))
        return;
    actions[command](message, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZE1hbmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Db21tYW5kTWFuYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBeUJBLHdCQU9DO0FBOUJELHdFQU13QztBQVN4QyxNQUFNLE9BQU8sR0FBb0I7SUFDL0IsVUFBVSxFQUFFLGdDQUFVO0lBQ3RCLFdBQVcsRUFBRSx1Q0FBaUI7SUFDOUIsV0FBVyxFQUFFLHFDQUFlO0lBQzVCLFdBQVcsRUFBRSxxQ0FBZTtJQUM1QixrQkFBa0IsRUFBRSw4Q0FBd0I7Q0FDN0MsQ0FBQztBQUVGLFNBQWdCLE1BQU0sQ0FBQyxPQUFvRDtJQUN6RSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFZLENBQUM7SUFDM0MsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QyxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFBRSxPQUFPO0lBQ3ZFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9