import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { stopChallenge } from "./controllers/ChallengeController";
import ButtonActions from "./constants/ButtonActions";
import {
  acceptSessionWithChallenge,
  acceptSessionWithoutChallenge,
} from "./controllers/StudySessionController";

export function manageInteraction(
  interaction: ButtonInteraction | ModalSubmitInteraction
) {
  
  // Respond to dynamic commands
  const [command] = interaction.customId.split("@");
  switch (command) {
    case ButtonActions.DeleteChallenge:
      stopChallenge(interaction as ButtonInteraction);
      break;
    case ButtonActions.StartStudySessionWithChallenge:
      acceptSessionWithChallenge(interaction as ButtonInteraction);
      break;
    case ButtonActions.StartStudySessionWithoutChallenge:
      acceptSessionWithoutChallenge(interaction as ButtonInteraction);
      break;
    default:
      break;
  }
}
