import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { GetDetailedStudyRankingQueryHandler } from "../../application/queries/GetDetailedRankingQuery";
import { getDetailedRankingQueryHandler } from "../../DependencyInjection";

export async function getRankingDetailed(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const result = await getDetailedRankingQueryHandler.handle({});

  const ranking: string[] = Object.entries(result)
    .sort(([, subjectsA], [, subjectsB]) => {
      const totalPointsA = Object.values(subjectsA).reduce((a, b) => a + b, 0);
      const totalPointsB = Object.values(subjectsB).reduce((a, b) => a + b, 0);
      return totalPointsB - totalPointsA;
    })
    .map(([userId, subjects], index) => {
      const totalPoints = Object.values(subjects).reduce((a, b) => a + b, 0);

      const pointsString = `${totalPoints.toFixed(2)} puntos`;

      const pointsBySubjectString = Object.entries(subjects)
        .map(([subject, points]) => {
          return subject !== "de forma general"
            ? `\t\t\t▫️ ${subject}: ${points} puntos`
            : `\t\t\t▫️ Extras: ${points} puntos`;
        })
        .join("\n");

      console.log(subjects);
      console.log(pointsBySubjectString);
      

      return `${
        index + 1
      } - <@${userId}> (${pointsString})\n${pointsBySubjectString}`;
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
