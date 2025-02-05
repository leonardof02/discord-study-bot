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
const DotenvVars_1 = require("../config/DotenvVars");
const sequelize_1 = require("sequelize");
const DbConnection = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: DotenvVars_1.env.DB_HOST,
    port: parseInt(DotenvVars_1.env.DB_PORT),
    username: DotenvVars_1.env.DB_USERNAME,
    password: DotenvVars_1.env.DB_PASSWORD,
    database: DotenvVars_1.env.DB_NAME,
    logging: false,
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000,
    },
});
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            DbConnection.authenticate();
            yield DbConnection.sync({ alter: true });
            console.log("Database synced!");
        }
        catch (error) {
            console.error("Error syncing database:", error);
        }
    });
}
exports.default = DbConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGJDb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL0RiQ29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW1CQSxvQ0FRQztBQTNCRCxxREFBMkM7QUFDM0MseUNBQXNDO0FBRXRDLE1BQU0sWUFBWSxHQUFHLElBQUkscUJBQVMsQ0FBQztJQUNqQyxPQUFPLEVBQUUsVUFBVTtJQUNuQixJQUFJLEVBQUUsZ0JBQUcsQ0FBQyxPQUFPO0lBQ2pCLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQUcsQ0FBQyxPQUFPLENBQUM7SUFDM0IsUUFBUSxFQUFFLGdCQUFHLENBQUMsV0FBVztJQUN6QixRQUFRLEVBQUUsZ0JBQUcsQ0FBQyxXQUFXO0lBQ3pCLFFBQVEsRUFBRSxnQkFBRyxDQUFDLE9BQU87SUFDckIsT0FBTyxFQUFFLEtBQUs7SUFDZCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxDQUFDO1FBQ04sT0FBTyxFQUFFLEtBQUs7UUFDZCxJQUFJLEVBQUUsS0FBSztLQUNaO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsU0FBc0IsWUFBWTs7UUFDaEMsSUFBSSxDQUFDO1lBQ0gsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzVCLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELGtCQUFlLFlBQVksQ0FBQyJ9