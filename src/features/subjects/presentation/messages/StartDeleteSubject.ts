import {
  OmitPartialGroupDMChannel,
  Message,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import {
  SubjectSelectActions,
  SubjectButtonActions,
} from "../constants/SubjectInteractions";
import { createBalancedGridLayoutOfButtons } from "../../../../shared/presentation/utils/LayoutUtils";
import { GetAllSubjectsQueryHandler, GetAllSubjectsQueryHandlerToken } from "../../application/queries/GetAllSubjects";
import { DependencyContainer } from "../../../../shared/DependencyInjectionContainer";


export async function startDeleteSubject(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const getAllSubjectsQuery = DependencyContainer.resolve(
    GetAllSubjectsQueryHandlerToken
  );

  const allSubjects = await getAllSubjectsQuery.handle({});

  if (allSubjects.length === 0) {
    message.reply("No hay ninguna asignatura registrada");
    return;
  }

  const options = allSubjects.map((subject) => {
    return {
      buttonAction: SubjectButtonActions.DeleteSubject,
      label: subject.color + " " + subject.name,
      value: subject.id,
    };
  });

  const cancelButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`${SubjectButtonActions.OperationCanceled}`)
      .setLabel("Cancelar")
      .setStyle(ButtonStyle.Danger)
  );

  await message.reply({
    content: "Selecciona la asignatura a eliminar:",
    components: [...createBalancedGridLayoutOfButtons(options), cancelButton],
  });
}
