"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveStudySession = archiveStudySession;
exports.getArchivedSessions = getArchivedSessions;
exports.getPointsSumsPerUser = getPointsSumsPerUser;
exports.getLast = getLast;
exports.getPointsSumsPerUserWithSubject = getPointsSumsPerUserWithSubject;
const DbConnection_1 = __importDefault(require("../DbConnection"));
const ArchivedStudySession_1 = require("../models/ArchivedStudySession");
function archiveStudySession(studySession) {
    return __awaiter(this, void 0, void 0, function* () {
        (yield ArchivedStudySession_1.ArchivedStudySession.create(studySession)).save();
    });
}
function getArchivedSessions() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            attributes: [
                "userId",
                [DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "totalPoints"],
            ],
            group: ["userId"],
            order: [[DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "DESC"]],
        });
        return results;
    });
}
function getPointsSumsPerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            attributes: [
                "userId",
                [DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "totalPoints"],
            ],
            group: ["userId"],
            order: [[DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "DESC"]],
        });
        return results.map((item) => ({
            userId: item.get("userId"),
            totalPoints: item.get("totalPoints"),
        }));
    });
}
function getLast(numberOfSessions) {
    return __awaiter(this, void 0, void 0, function* () {
        const lastSessions = yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            order: [["createdAt", "DESC"]],
            limit: numberOfSessions,
        });
        return lastSessions;
    });
}
function getPointsSumsPerUserWithSubject() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            attributes: [
                "userId",
                "subjectName",
                [DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "totalPoints"],
            ],
            group: ["userId", "subjectName"],
            order: [
                ["userId", "ASC"],
                ["subjectName", "ASC"],
            ],
        });
        const usersWithPointsBySubject = {};
        results.forEach((item) => {
            const { userId, subject, totalPoints } = {
                userId: item.get("userId"),
                subject: item.get("subjectName"),
                totalPoints: item.get("totalPoints"),
            };
            if (!usersWithPointsBySubject[userId]) {
                usersWithPointsBySubject[userId] = {};
            }
            usersWithPointsBySubject[userId][subject] = totalPoints;
        });
        return usersWithPointsBySubject;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTZXNzaW9uc1JlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yaWVzL0FyY2hpdmVkU2Vzc2lvbnNSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsa0RBRUM7QUFFRCxrREFXQztBQUVELG9EQW1CQztBQUVELDBCQU9DO0FBUUQsMEVBK0JDO0FBMUZELG1FQUEyQztBQUMzQyx5RUFHd0M7QUFFeEMsU0FBc0IsbUJBQW1CLENBQUMsWUFBOEI7O1FBQ3RFLENBQUMsTUFBTSwyQ0FBb0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0NBQUE7QUFFRCxTQUFzQixtQkFBbUI7O1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMkNBQW9CLENBQUMsT0FBTyxDQUFDO1lBQ2pELFVBQVUsRUFBRTtnQkFDVixRQUFRO2dCQUNSLENBQUMsc0JBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLHNCQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDO2FBQ3BFO1lBQ0QsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pCLEtBQUssRUFBRSxDQUFDLENBQUMsc0JBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLHNCQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEUsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUFBO0FBRUQsU0FBc0Isb0JBQW9COztRQU14QyxNQUFNLE9BQU8sR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNqRCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUTtnQkFDUixDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUNwRTtZQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RFLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QixNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDMUIsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1NBQ3JDLENBQUMsQ0FBc0IsQ0FBQztJQUMzQixDQUFDO0NBQUE7QUFFRCxTQUFzQixPQUFPLENBQUMsZ0JBQXdCOztRQUNwRCxNQUFNLFlBQVksR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUN0RCxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5QixLQUFLLEVBQUUsZ0JBQWdCO1NBQ3hCLENBQUMsQ0FBQztRQUVILE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FBQTtBQVFELFNBQXNCLCtCQUErQjs7UUFDbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSwyQ0FBb0IsQ0FBQyxPQUFPLENBQUM7WUFDakQsVUFBVSxFQUFFO2dCQUNWLFFBQVE7Z0JBQ1IsYUFBYTtnQkFDYixDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUNwRTtZQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUM7WUFDaEMsS0FBSyxFQUFFO2dCQUNMLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztnQkFDakIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSx3QkFBd0IsR0FBb0IsRUFBRSxDQUFDO1FBRXJELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRztnQkFDdkMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFXO2dCQUNwQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQVc7Z0JBQzFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBVzthQUMvQyxDQUFDO1lBRUYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1lBRUQsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyx3QkFBd0IsQ0FBQztJQUNsQyxDQUFDO0NBQUEifQ==