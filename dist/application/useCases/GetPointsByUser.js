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
exports.GetPointsByUser = GetPointsByUser;
const ArchivedSessionsRepository = __importStar(require("../../infrastructure/repositories/ArchivedSessionsRepository"));
function GetPointsByUser(userId) {
    const pointsBySubject = ArchivedSessionsRepository.getPointsSumsWithSubjectFromUser(userId);
    return pointsBySubject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0UG9pbnRzQnlVc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGxpY2F0aW9uL3VzZUNhc2VzL0dldFBvaW50c0J5VXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMENBSUM7QUFORCx5SEFBMkc7QUFFM0csU0FBZ0IsZUFBZSxDQUFDLE1BQWM7SUFDNUMsTUFBTSxlQUFlLEdBQ25CLDBCQUEwQixDQUFDLGdDQUFnQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RFLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUMifQ==