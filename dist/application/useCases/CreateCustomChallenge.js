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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomChallenge = CreateCustomChallenge;
const ChallengeRepository = __importStar(require("../../infrastructure/repositories/ChallengeRepository"));
function CreateCustomChallenge(userId, time) {
    const existentChallenge = ChallengeRepository.getChallenge(userId);
    if (existentChallenge)
        throw new Error(`<@${userId}> ya tiene un reto creado`);
    ChallengeRepository.setChallenge(userId, { time, isActive: false });
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlQ3VzdG9tQ2hhbGxlbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0NyZWF0ZUN1c3RvbUNoYWxsZW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsc0RBTUM7QUFSRCwyR0FBNkY7QUFFN0YsU0FBZ0IscUJBQXFCLENBQUMsTUFBYyxFQUFFLElBQVk7SUFDaEUsTUFBTSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsSUFBSSxpQkFBaUI7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLE1BQU0sMkJBQTJCLENBQUMsQ0FBQztJQUMxRCxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLE9BQU87QUFDVCxDQUFDIn0=