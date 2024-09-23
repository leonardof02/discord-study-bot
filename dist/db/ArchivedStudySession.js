"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivedStudySession = void 0;
const sequelize_1 = require("sequelize");
const DbConnection_1 = __importDefault(require("./DbConnection"));
exports.ArchivedStudySession = DbConnection_1.default.define("StudySession", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
    },
    subjectName: {
        type: sequelize_1.DataTypes.STRING,
    },
    startTime: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    totalTime: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    points: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    humanReadableTotalTime: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    tableName: "studySessions",
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTdHVkeVNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGIvQXJjaGl2ZWRTdHVkeVNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUNBQWtFO0FBQ2xFLGtFQUEwQztBQVE3QixRQUFBLG9CQUFvQixHQUFHLHNCQUFZLENBQUMsTUFBTSxDQUdyRCxjQUFjLEVBQ2Q7SUFDRSxFQUFFLEVBQUU7UUFDRixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO1FBQ3ZCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtLQUN2QjtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07S0FDdkI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNO0tBQ3ZCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTTtLQUN2QjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07S0FDdkI7SUFDRCxzQkFBc0IsRUFBRTtRQUN0QixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNO0tBQ3ZCO0NBQ0YsRUFDRDtJQUNFLFNBQVMsRUFBRSxlQUFlO0NBQzNCLENBQ0YsQ0FBQyJ9