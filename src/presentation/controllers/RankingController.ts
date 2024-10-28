import { OmitPartialGroupDMChannel, Message } from "discord.js";

// use cases
import { GetDetailedStudyRanking } from "../../application/useCases/GetDetailedRanking";
import { GetStudyRankingByUser } from "../../application/useCases/GetStudyRanking";

export async function getRanking(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const results = await GetStudyRankingByUser();

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

export async function getDetailedRanking(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const result = await GetDetailedStudyRanking();

  const ranking: string[] = Object.entries(result)
    .sort(([, subjectsA], [, subjectsB]) => {
      const totalPointsA = Object.values(subjectsA).reduce((a, b) => a + b, 0);
      const totalPointsB = Object.values(subjectsB).reduce((a, b) => a + b, 0);
      return totalPointsB - totalPointsA;
    })
    .map(([userId, subjects], index) => {
      const totalPoints = Object.values(subjects).reduce((a, b) => a + b, 0);

      const pointsString = `${totalPoints} puntos`;

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
