import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { Command } from "./Command";

export type BotActionRouter = Record<
  Command,
  (message: OmitPartialGroupDMChannel<Message<boolean>>, args: string[]) => void
>;
