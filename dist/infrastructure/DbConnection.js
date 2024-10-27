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
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = syncDatabase;
const sequelize_1 = require("sequelize");
const DbConnection = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./database.db",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DbConnection.sync({
                alter: true,
            });
            console.log("Database synced!");
        }
        catch (error) {
            console.error("Error syncing database:", error);
        }
    });
}
exports.default = DbConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGJDb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL0RiQ29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVlBLG9DQVNDO0FBckJELHlDQUFzQztBQUV0QyxNQUFNLFlBQVksR0FBRyxJQUFJLHFCQUFTLENBQUM7SUFDakMsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGVBQWU7SUFDeEIsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxLQUFLO0tBQ1o7Q0FDRixDQUFDLENBQUM7QUFFSCxTQUFzQixZQUFZOztRQUNoQyxJQUFJLENBQUM7WUFDSCxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBRUQsa0JBQWUsWUFBWSxDQUFDIn0=