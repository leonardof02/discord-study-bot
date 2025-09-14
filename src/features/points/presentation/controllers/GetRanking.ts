import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { getRankingCommandHandler } from "../../DependencyInjection";

export async function getRanking(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const results = await getRankingCommandHandler.handle({});

  const ranking: string[] = results.map((result, index) => {
    return `${index + 1} - <@${result.userId}> | ${result.totalPoints} Puntos`;
  });

  ranking[0] ? (ranking[0] = "🥇 " + ranking[0]) : "";
  ranking[1] ? (ranking[1] = "🥈 " + ranking[1]) : "";
  ranking[2] ? (ranking[2] = "🥉 " + ranking[2]) : "";

  message.channel.send(
    `🏆 Hall of fame\n------------------------------------\n${ranking.join(
      "\n"
    )}`
  );
}
