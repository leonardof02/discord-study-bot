"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishStudySession = FinishStudySession;
const StudySessionRepository = __importStar(require("../../infrastructure/repositories/StudySessionRepository"));
const ArchivedSessionsRepository = __importStar(require("../../infrastructure/repositories/ArchivedSessionsRepository"));
const TimeUtils_1 = require("../utils/TimeUtils");
function FinishStudySession(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existentStudySession = StudySessionRepository.getStudySession(userId);
        if (!existentStudySession) {
            throw new Error(`<@${userId}> no has iniciado ninguna sesión de estudio`);
        }
        const totalTime = Date.now() - existentStudySession.startTime;
        const finishedStudySessionData = {
            totalTime,
            subjectName: existentStudySession.subjectName,
            startTime: existentStudySession.startTime,
            points: parseFloat((Math.round(((Date.now() - existentStudySession.startTime) / (1000 * 60)) * 100) / 100).toFixed(2)),
            humanReadableTotalTime: (0, TimeUtils_1.msToTime)(totalTime),
            userId,
        };
        const sessionId = yield ArchivedSessionsRepository.archiveStudySession(finishedStudySessionData);
        StudySessionRepository.removeStudySession(userId);
        return Object.assign(Object.assign({}, finishedStudySessionData), { id: sessionId });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluaXNoU3R1ZHlTZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0ZpbmlzaFN0dWR5U2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsZ0RBOEJDO0FBcENELGlIQUFtRztBQUNuRyx5SEFBMkc7QUFHM0csa0RBQThDO0FBRTlDLFNBQXNCLGtCQUFrQixDQUN0QyxNQUFjOztRQUVkLE1BQU0sb0JBQW9CLEdBQUcsc0JBQXNCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxNQUFNLDZDQUE2QyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUM7UUFDOUQsTUFBTSx3QkFBd0IsR0FBcUI7WUFDakQsU0FBUztZQUNULFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxXQUFXO1lBQzdDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxTQUFTO1lBQ3pDLE1BQU0sRUFBRSxVQUFVLENBQ2hCLENBQ0UsSUFBSSxDQUFDLEtBQUssQ0FDUixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUNwRSxHQUFHLEdBQUcsQ0FDUixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDYjtZQUNELHNCQUFzQixFQUFFLElBQUEsb0JBQVEsRUFBQyxTQUFTLENBQUM7WUFDM0MsTUFBTTtTQUNQLENBQUM7UUFFRixNQUFNLFNBQVMsR0FBRyxNQUFNLDBCQUEwQixDQUFDLG1CQUFtQixDQUNwRSx3QkFBd0IsQ0FDekIsQ0FBQztRQUNGLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELHVDQUFZLHdCQUF3QixLQUFFLEVBQUUsRUFBRSxTQUFTLElBQUc7SUFDeEQsQ0FBQztDQUFBIn0=