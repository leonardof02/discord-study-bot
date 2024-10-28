import { ButtonInteraction } from "discord.js";
import { stopCustomChallenge } from "./controllers/ChallengeController";
import ButtonActions from "./constants/ButtonActions";
import {
  acceptSessionWithChallenge,
  acceptSessionWithoutChallenge,
} from "./controllers/StudySessionController";

export function manageInteraction(interaction: ButtonInteraction) {
  // Respond to dynamic commands
  const [command] = interaction.customId.split("@");
  switch (command) {
    case ButtonActions.DeleteChallenge:
      stopCustomChallenge(interaction);
      break;
    case ButtonActions.StartStudySessionWithChallenge:
      acceptSessionWithChallenge(interaction);
      break;
    case ButtonActions.StartStudySessionWithoutChallenge:
      acceptSessionWithoutChallenge(interaction);
      break;
    default:
      break;
  }
}
