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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCurrentChallenge = DeleteCurrentChallenge;
const ChallengeRepository = __importStar(require("../../infrastructure/repositories/ChallengeRepository"));
function DeleteCurrentChallenge(userId) {
    const activeChallenge = ChallengeRepository.getChallenge(userId);
    if (!activeChallenge) {
        throw new Error(`<@${userId}> no tiene un reto activado`);
    }
    ChallengeRepository.removeChallenge(userId);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVsZXRlQ3VycmVudENoYWxsZW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBsaWNhdGlvbi91c2VDYXNlcy9EZWxldGVDdXJyZW50Q2hhbGxlbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsd0RBUUM7QUFWRCwyR0FBNkY7QUFFN0YsU0FBZ0Isc0JBQXNCLENBQUMsTUFBYztJQUNuRCxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFakUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxNQUFNLDZCQUE2QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFDIn0=