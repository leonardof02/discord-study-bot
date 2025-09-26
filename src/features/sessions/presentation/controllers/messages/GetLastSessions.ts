import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { GetLastStudySessionsQueryHandlerToken } from "../../../application/queries/GetLastStudySessionsQuery";

export async function getLastSessions(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const getLastStudySessionsQueryHandler = DependencyContainer.resolve(
    GetLastStudySessionsQueryHandlerToken
  );

  let numberOfSessions = parseInt(args[0]);
  if (Number.isNaN(numberOfSessions)) numberOfSessions = 10;

  const lastSessions = await getLastStudySessionsQueryHandler.handle({
    numberOfSessions,
  });

  const response = (await lastSessions).map(
    (session, index) =>
      `${index + 1} - <@${session.userId}> estuvo estudiando \`${
        session.subjectId
      }\` por un tiempo de \`${session.humanReadableTotalTime}\` \`[${
        session.id
      }] \``
  );

  message.channel.send(
    `📌 Últimas sesiones de estudio\n------------------------------------\n${response.join(
      "\n"
    )}`
  );
}
