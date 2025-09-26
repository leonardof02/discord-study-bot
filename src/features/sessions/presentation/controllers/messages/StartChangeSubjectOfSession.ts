import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { GetActiveStudySessionQueryHandlerToken } from "../../../application/queries/GetActiveStudySessionQuery";

export function startChangeSubjectOfSession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const getActiveStudySessionQueryHandler = DependencyContainer.resolve(
    GetActiveStudySessionQueryHandlerToken
  );

  try {
    const userId = message.author.id;
    const studySession = getActiveStudySessionQueryHandler.handle({ userId });
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
