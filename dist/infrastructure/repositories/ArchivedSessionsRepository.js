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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTZXNzaW9uc1JlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yaWVzL0FyY2hpdmVkU2Vzc2lvbnNSZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBTUEsa0RBSUM7QUFFRCxrREFXQztBQUVELG9EQW1CQztBQUVELDBCQU9DO0FBUUQsMEVBK0JDO0FBNUZELG1FQUEyQztBQUMzQyx5RUFHd0M7QUFFeEMsU0FBc0IsbUJBQW1CLENBQUMsWUFBOEI7O1FBQ3RFLE1BQU0sZUFBZSxHQUFHLE1BQU0sMkNBQW9CLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Q0FBQTtBQUVELFNBQXNCLG1CQUFtQjs7UUFDdkMsTUFBTSxPQUFPLEdBQUcsTUFBTSwyQ0FBb0IsQ0FBQyxPQUFPLENBQUM7WUFDakQsVUFBVSxFQUFFO2dCQUNWLFFBQVE7Z0JBQ1IsQ0FBQyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUM7YUFDcEU7WUFDRCxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDakIsS0FBSyxFQUFFLENBQUMsQ0FBQyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsc0JBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQUE7QUFFRCxTQUFzQixvQkFBb0I7O1FBTXhDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMkNBQW9CLENBQUMs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