import {
  ButtonInteraction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import SessionButtonActions from "../../features/sessions/presentation/constants/SessionInteractions";
import { acceptSessionWithChallenge } from "../../features/sessions/presentation/controllers/interactions/AcceptSessionWithChallenge";
import { acceptSessionWithoutChallenge } from "../../features/sessions/presentation/controllers/interactions/AcceptSessionWithoutChallenge";
import { cancelFinishStudySession } from "../../features/sessions/presentation/controllers/interactions/CancelFinishStudySession";
import { finishStudySession } from "../../features/sessions/presentation/controllers/interactions/FinishStudySession";
import { stopChallenge } from "../../features/sessions/presentation/controllers/interactions/StopChallenge";
import { cancelAddSubject } from "../../features/subjects/presentation/interactions/CancelAddSubject";
import {
  SubjectButtonActions,
  SubjectSelectActions,
} from "../../features/subjects/presentation/constants/SubjectInteractions";
import { addSubject } from "../../features/subjects/presentation/interactions/AddSubject";
import { deleteSubject } from "../../features/subjects/presentation/interactions/DeleteSubject";
import { cancelStartStudySession } from "../../features/sessions/presentation/controllers/interactions/CancelStartStudySession";
import { startGeneralStudySession } from "../../features/sessions/presentation/controllers/interactions/StartGeneralStudySession";
import { startStudySession } from "../../features/sessions/presentation/controllers/interactions/StartStudySession";

export function manageInteraction(
  interaction:
    | ButtonInteraction
    | ModalSubmitInteraction
    | StringSelectMenuInteraction
) {
  // Respond to dynamic commands
  const [command] = interaction.customId.split("@");
  switch (command) {
    case SessionButtonActions.DeleteChallenge:
      stopChallenge(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.StartStudySessionWithChallenge:
      acceptSessionWithChallenge(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.StartStudySessionWithoutChallenge:
      acceptSessionWithoutChallenge(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.ConfirmFinishStudySession:
      finishStudySession(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.CancelFinishStudySession:
      cancelFinishStudySession(interaction as ButtonInteraction);
      break;

    case SubjectButtonActions.OperationCanceled:
      cancelAddSubject(interaction as ButtonInteraction);
      break;

    case SubjectSelectActions.AddSubject:
      addSubject(interaction as StringSelectMenuInteraction);
      break;

    case SubjectButtonActions.DeleteSubject:
      deleteSubject(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.CancelStartStudySession:
      cancelStartStudySession(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.StartGeneralStudySession:
      startGeneralStudySession(interaction as ButtonInteraction);
      break;

    case SessionButtonActions.SelectSubject:
      startStudySession(interaction as StringSelectMenuInteraction);
      break;

    default:
      break;
  }
}
