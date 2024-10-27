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
const DbConnection_1 = __importDefault(require("../DbConnection"));
const ArchivedStudySession_1 = require("../models/ArchivedStudySession");
function archiveStudySession(studySession) {
    return __awaiter(this, void 0, void 0, function* () {
        (yield ArchivedStudySession_1.ArchivedStudySession.create(studySession)).save();
    });
}
function getArchivedSessions() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = (yield ArchivedStudySession_1.ArchivedStudySession.findAll({
            attributes: [
                "userId",
                [DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "totalPoints"],
            ],
            group: ["userId"],
            order: [[DbConnection_1.default.fn("SUM", DbConnection_1.default.col("points")), "DESC"]],
        }));
        return results;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTZXNzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3JpZXMvQXJjaGl2ZWRTZXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU1BLGtEQUVDO0FBRUQsa0RBV0M7QUFyQkQsbUVBQTJDO0FBQzNDLHlFQUd3QztBQUV4QyxTQUFzQixtQkFBbUIsQ0FBQyxZQUE4Qjs7UUFDdEUsQ0FBQyxNQUFNLDJDQUFvQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNELENBQUM7Q0FBQTtBQUVELFNBQXNCLG1CQUFtQjs7UUFDdkMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLDJDQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNsRCxVQUFVLEVBQUU7Z0JBQ1YsUUFBUTtnQkFDUixDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQzthQUNwRTtZQUNELEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLHNCQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RFLENBQUMsQ0FBVSxDQUFDO1FBRWIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUFBIn0=