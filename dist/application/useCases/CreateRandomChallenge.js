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
exports.CreateRandomChallenge = CreateRandomChallenge;
const ChallengeRepository = __importStar(require("../../infrastructure/repositories/ChallengeRepository"));
function CreateRandomChallenge(userId, time) {
    const existentChallenge = ChallengeRepository.getChallenge(userId);
    if (existentChallenge)
        throw new Error(`<@${userId}> ya tiene un reto creado`);
    ChallengeRepository.setChallenge(userId, {
        time,
        isActive: false,
        isRandom: true,
    });
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlUmFuZG9tQ2hhbGxlbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0NyZWF0ZVJhbmRvbUNoYWxsZW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHNEQVVDO0FBWkQsMkdBQTZGO0FBRTdGLFNBQWdCLHFCQUFxQixDQUFDLE1BQWMsRUFBRSxJQUFZO0lBQ2hFLE1BQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLElBQUksaUJBQWlCO1FBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxNQUFNLDJCQUEyQixDQUFDLENBQUM7SUFDMUQsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUN2QyxJQUFJO1FBQ0osUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQztJQUNILE9BQU87QUFDVCxDQUFDIn0=