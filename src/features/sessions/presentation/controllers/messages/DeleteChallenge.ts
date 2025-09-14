import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { deleteChallengeCommandHandler } from "../../../DependencyInjection";

export async function deleteChallenge(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const userId = message.author.id;

  try {
    deleteChallengeCommandHandler.handle({ userId });
    message.channel.send(`⏲️ <@${userId}> ha eliminado correctamente su reto`);
  } catch (error: any) {
    message.channel.send(error.message);
  }
}
