import { OmitPartialGroupDMChannel, Message } from "discord.js";
import {
  changeSessionSubjectCommandHandler,
  getActiveStudySessionQueryHandler,
} from "../../../DependencyInjection";

export function startChangeSubjectOfSession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  try {
    const userId = message.author.id;
    const studySession = getActiveStudySessionQueryHandler.handle({ userId });
    
    
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
