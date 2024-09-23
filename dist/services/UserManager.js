"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
exports.createUser = createUser;
exports.users = [];
function createUser(message) {
    const userId = message.author.id;
    if (exports.users.some((user) => user.userId == userId)) {
        message.channel.send(`❌ <@${userId}> ya te registraste anteriormente!`);
        return;
    }
    const newUser = {
        name: message.author.username,
        userId: message.author.id,
        points: 0,
    };
    exports.users.push(newUser);
    message.channel.send(`✅ <@${userId}> te has registrado satisfactoriamente!`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvVXNlck1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBc0JTLGdDQUFVO0FBcEJOLFFBQUEsS0FBSyxHQUFXLEVBQUUsQ0FBQztBQUVoQyxTQUFTLFVBQVUsQ0FBQyxPQUFvRDtJQUN0RSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUVqQyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLE1BQU0sb0NBQW9DLENBQUMsQ0FBQztRQUN4RSxPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFTO1FBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVE7UUFDN0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN6QixNQUFNLEVBQUUsQ0FBQztLQUNWLENBQUM7SUFFRixhQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQyxDQUFDO0FBQy9FLENBQUMifQ==