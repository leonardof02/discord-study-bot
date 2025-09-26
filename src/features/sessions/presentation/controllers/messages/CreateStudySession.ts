import {
  OmitPartialGroupDMChannel,
  Message,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import SessionButtonActions from "../../constants/SessionInteractions";
import { DependencyContainer } from "../../../../../shared/DependencyInjectionContainer";
import { GetAllSubjectsQueryHandlerToken } from "../../../../subjects/application/queries/GetAllSubjects";

export async function createStudySession(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const getAllSubjectsQuery = DependencyContainer.resolve(
    GetAllSubjectsQueryHandlerToken
  );

  const subjects = await getAllSubjectsQuery.handle({});
  console.log("AUTHOR que va a estudiar: ", message.author.id);

  const selectSubjectButtons =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(
          `${SessionButtonActions.SelectSubject}@${message.author.id}`
        )
        .setPlaceholder("Elige una asignatura")
        .addOptions(
          subjects.map((subject) => ({
            emoji: subject.color,
            label: subject.name,
            value: subject.id,
          }))
        )
    );

  const cancelButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`${SessionButtonActions.CancelStartStudySession}`)
      .setLabel("Cancelar")
      .setStyle(ButtonStyle.Danger)
  );

  const startGeneralStudySessionButton =
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(
          `${SessionButtonActions.StartGeneralStudySession}@${message.author.id}`
        )
        .setEmoji("📝")
        .setLabel("Estudiar general")
        .setStyle(ButtonStyle.Secondary)
    );

  message.reply({
    content: `<@${
      message.author.id
    }> Vas a comenzar a estudiar ahora (${new Date().toLocaleString()})\nEn cambio si no quieres una asigantura en concreto, pulsa estudiar general`,
    components: [
      selectSubjectButtons,
      startGeneralStudySessionButton,
      cancelButton,
    ],
  });
}
