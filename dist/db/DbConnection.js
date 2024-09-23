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
    storage: "database.db",
});
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DbConnection.sync({
                alter: true
            });
            console.log("Database synced!");
        }
        catch (error) {
            console.error("Error syncing database:", error);
        }
    });
}
exports.default = DbConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGJDb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RiL0RiQ29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLG9DQVNDO0FBaEJELHlDQUFzQztBQUV0QyxNQUFNLFlBQVksR0FBRyxJQUFJLHFCQUFTLENBQUM7SUFDakMsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLGFBQWE7Q0FDdkIsQ0FBQyxDQUFDO0FBRUgsU0FBc0IsWUFBWTs7UUFDaEMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUN0QixLQUFLLEVBQUUsSUFBSTthQUNaLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELGtCQUFlLFlBQVksQ0FBQyJ9