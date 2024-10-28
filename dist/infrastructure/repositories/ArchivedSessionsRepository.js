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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTZXNzaW9uc1JlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yaWVzL0FyY2hpdmVkU2Vzc2lvbnNSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsa0RBSUM7QUFFRCxrREFXQztBQUVELG9EQW1CQztBQUVELDBCQU9DO0FBUUQsMEVBK0JDO0FBNUZELG1FQUEyQztBQUMzQyx5RUFHd0M7QUFFeEMsU0FBc0IsbUJBQW1CLENBQUMsWUFBOEI7O1FBQ3RFLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkNBQW9CLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Q0FBQTtBQUVELFNBQXNCLG1CQUFtQjs7UUFDdkMsTUFBTSxPQUFPLEdBQUcsTUFBTSwyQ0FBb0IsQ0FBQyxPQUFPLENBQUM7WUFDakQsVUFBVSxFQUFFO2dCQUNWLFFBQVE7Z0JBQ1IsQ0FBQyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUM7YUFDcEU7WUFDRCxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDakIsS0FBSyxFQUFFLENBQUMsQ0FBQyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQUE7QUFFRCxTQUFzQixvQkFBb0I7O1FBTXhDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMkNBQW9CLENBQUMsT0FBTyxDQUFDO1lBQ2pELFVBQVUsRUFBRTtnQkFDVixRQUFRO2dCQUNSLENBQUMsc0JBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLHNCQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDO2FBQ3BFO1lBQ0QsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2pCLEtBQUssRUFBRSxDQUFDLENBQUMsc0JBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLHNCQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEUsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hFLENBQUMsQ0FBc0IsQ0FBQztJQUMzQixDQUFDO0NBQUE7QUFFRCxTQUFzQixPQUFPLENBQUMsZ0JBQXdCOztRQUNwRCxNQUFNLFlBQVksR0FBRyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUN0RCxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5QixLQUFLLEVBQUUsZ0JBQWdCO1NBQ3hCLENBQUMsQ0FBQztRQUVILE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7Q0FBQTtBQVFELFNBQXNCLCtCQUErQjs7UUFDbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSwyQ0FBb0IsQ0FBQyxPQUFPLENBQUM7WUFDakQsVUFBVSxFQUFFO2dCQUNWLFFBQVE7Z0JBQ1IsYUFBYTtnQkFDYixDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUNwRTtZQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUM7WUFDaEMsS0FBSyxFQUFFO2dCQUNMLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztnQkFDakIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSx3QkFBd0IsR0FBb0IsRUFBRSxDQUFDO1FBRXJELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2QixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRztnQkFDdkMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFXO2dCQUNwQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQVc7Z0JBQzFDLFdBQVcsRUFBRSxVQUFVLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEUsQ0FBQztZQUVGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUN0Qyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDeEMsQ0FBQztZQUVELHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sd0JBQXdCLENBQUM7SUFDbEMsQ0FBQztDQUFBIn0=