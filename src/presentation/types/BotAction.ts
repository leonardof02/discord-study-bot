import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { Command } from "../CommandManage";

export type BotActionRouter = Record<
  Command,
  (message: OmitPartialGroupDMChannel<Message<boolean>>, args: string[]) => void
>;
