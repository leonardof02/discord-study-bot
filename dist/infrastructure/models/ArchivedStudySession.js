"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivedStudySession = void 0;
const DbConnection_1 = __importDefault(require("../DbConnection"));
const sequelize_1 = require("sequelize");
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
        type: sequelize_1.DataTypes.INTEGER,
    },
    totalTime: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    points: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    humanReadableTotalTime: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    challengeCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: "studySessions",
    paranoid: false,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJjaGl2ZWRTdHVkeVNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvbW9kZWxzL0FyY2hpdmVkU3R1ZHlTZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1FQUEyQztBQUMzQyx5Q0FBdUQ7QUFHMUMsUUFBQSxvQkFBb0IsR0FBRyxzQkFBWSxDQUFDLE1BQU0sQ0FHckQsY0FBYyxFQUNkO0lBQ0UsRUFBRSxFQUFFO1FBQ0YsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztRQUN2QixhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU07S0FDdkI7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNO0tBQ3ZCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLHFCQUFTLENBQUMsT0FBTztLQUN4QjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87S0FDeEI7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUMvQjtJQUNELHNCQUFzQixFQUFFO1FBQ3RCLElBQUksRUFBRSxxQkFBUyxDQUFDLE9BQU87S0FDeEI7SUFDRCxrQkFBa0IsRUFBRTtRQUNsQixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO1FBQ3ZCLFlBQVksRUFBRSxLQUFLO0tBQ3BCO0NBQ0YsRUFDRDtJQUNFLFNBQVMsRUFBRSxlQUFlO0lBQzFCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQ0YsQ0FBQyJ9