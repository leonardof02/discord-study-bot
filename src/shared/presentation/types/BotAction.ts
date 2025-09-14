import { Message, OmitPartialGroupDMChannel } from "discord.js";

export type BotActionRouter = Record<
  `!${string}`,
  (message: OmitPartialGroupDMChannel<Message<boolean>>, args: string[]) => void
>;
