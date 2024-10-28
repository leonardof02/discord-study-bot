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
exports.getPointsSumsWithSubjectFromUser = getPointsSumsWithSubjectFromUser;
exports.getStudySessionsFromUser = getStudySessionsFromUser;
const DbConnection_1 = __importDefault(require("../DbConnection"));
const ArchivedStudySession_1 = require("../models/ArchivedStudySession");
function archiveStudySession(studySession) {
    return __awaiter(this, void 0, void 0, function* () {
        const newStudySession = yield ArchivedStudySession_1.ArchivedStudySession.create(studySession);
        newStudySession.save();
        return newStudySession.dataValues.id;
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
            totalPoints: parseFloat(item.get("totalPoints").toFixed(2)),
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
                totalPoints: parseFloat(item.get("totalPoints").toFixed(2)),
            };
            if (!usersWithPointsBySubject[userId]) {
                usersWithPointsBySubject[userId] = {};
            }
            usersWithPointsBySubject[userId][subject] = totalPoints;
        });
        return usersWithPointsBySubject;
    });
}
function getPointsSumsWithSubjectFromUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            attributes: [
                "subjectName",
                [DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "totalPoints"],
            ],
            group: ["subjectName"],
            order: [["subjectName", "ASC"]],
            where: {
                userId,
            },
        });
        const pointsBySubject = results.map((item) => ({
            subjectName: item.get("subjectName"),
            totalPoints: parseFloat(item.get("totalPoints").toFixed(2)),
        }));
        return pointsBySubject;
    });
}
function getStudySessionsFromUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const lastSessions = yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            order: [["createdAt", "DESC"]],
        });
        return lastSessions.map((session) => ({
            subjectName: session.dataValues.subjectName,
            totalPoints: session.dataValues.points,
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTZXNzaW9uc1JlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yaWVzL0FyY2hpdmVkU2Vzc2lvbnNSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsa0RBSUM7QUFFRCxrREFXQztBQUVELG9EQW1CQztBQUVELDBCQU9DO0FBUUQsMEVBK0JDO0FBSUQsNEVBbUJDO0FBRUQsNERBU0M7QUE5SEQsbUVBQTJDO0FBQzNDLHlFQUd3QztBQUV4QyxTQUFzQixtQkFBbUIsQ0FBQyxZQUE4Qjs7UUFDdEUsTUFBTSxlQUFlLEdBQUcsTUFBTSwyQ0FBb0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEUsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUFBO0FBRUQsU0FBc0IsbUJBQW1COztRQUN2QyxNQUFNLE9BQU8sR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNqRCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUTtnQkFDUixDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUNwRTtZQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RFLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FBQTtBQUVELFNBQXNCLG9CQUFvQjs7UUFNeEMsTUFBTSxPQUFPLEdBQUcsTUFBTSwyQ0FBb0IsQ0FBQyxPQUFPLENBQUM7WUFDakQsVUFBVSxFQUFFO2dCQUNWLFFBQVE7Z0JBQ1IsQ0FBQyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUM7YUFDcEU7WUFDRCxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDakIsS0FBSyxFQUFFLENBQUMsQ0FBQyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUIsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEUsQ0FBQyxDQUFzQixDQUFDO0lBQzNCLENBQUM7Q0FBQTtBQUVELFNBQXNCLE9BQU8sQ0FBQyxnQkFBd0I7O1FBQ3BELE1BQU0sWUFBWSxHQUFHLE1BQU0sMkNBQW9CLENBQUMsT0FBTyxDQUFDO1lBQ3RELEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLEtBQUssRUFBRSxnQkFBZ0I7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztDQUFBO0FBUUQsU0FBc0IsK0JBQStCOztRQUNuRCxNQUFNLE9BQU8sR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNqRCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUTtnQkFDUixhQUFhO2dCQUNiLENBQUMsc0JBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLHNCQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDO2FBQ3BFO1lBQ0QsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQztZQUNoQyxLQUFLLEVBQUU7Z0JBQ0wsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO2dCQUNqQixDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUM7YUFDdkI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLHdCQUF3QixHQUFvQixFQUFFLENBQUM7UUFFckQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxHQUFHO2dCQUN2QyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQVc7Z0JBQ3BDLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBVztnQkFDMUMsV0FBVyxFQUFFLFVBQVUsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RSxDQUFDO1lBRUYsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1lBRUQsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyx3QkFBd0IsQ0FBQztJQUNsQyxDQUFDO0NBQUE7QUFJRCxTQUFzQixnQ0FBZ0MsQ0FBQyxNQUFjOztRQUNuRSxNQUFNLE9BQU8sR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNqRCxVQUFVLEVBQUU7Z0JBQ1YsYUFBYTtnQkFDYixDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUNwRTtZQUNELEtBQUssRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUN0QixLQUFLLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQixLQUFLLEVBQUU7Z0JBQ0wsTUFBTTthQUNQO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQXdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEUsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFXO1lBQzlDLFdBQVcsRUFBRSxVQUFVLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEUsQ0FBQyxDQUFDLENBQUM7UUFFSixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0NBQUE7QUFFRCxTQUFzQix3QkFBd0IsQ0FBQyxNQUFjOztRQUMzRCxNQUFNLFlBQVksR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUN0RCxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7UUFFSCxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVztZQUMzQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1NBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUFBIn0=