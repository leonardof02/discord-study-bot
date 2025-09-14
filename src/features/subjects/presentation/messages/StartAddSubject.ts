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

export async function startAddSubject(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const subjectName = args.join(" ").trim();
  if (subjectName == null || subjectName == "") {
    message.reply("No se ha especificado una asignatura");
    return;
  }

  const colors = [
    {
      label: "Rojo",
      value: "🟥",
    },
    {
      label: "Naranja",
      value: "🟧",
    },
    {
      label: "Amarillo",
      value: "🟨",
    },
    {
      label: "Verde",
      value: "🟩",
    },
    {
      label: "Azul",
      value: "🟦",
    },
    {
      label: "Violeta",
      value: "🟪",
    },
    {
      label: "Gris",
      value: "🟫",
    },
    {
      label: "Negro",
      value: "⬛️",
    },
    {
      label: "Blanco",
      value: "⬜️",
    },
  ];

  const subjectColorSelect =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`${SubjectSelectActions.AddSubject}@${subjectName}`)
        .setPlaceholder("Elige un color")
        .addOptions(
          colors.map((color) => {
            return {
              label: color.value + " " + color.label,
              value: color.value,
            };
          })
        )
    );

  const cancelButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`${SubjectButtonActions.OperationCanceled}`)
      .setLabel("Cancelar")
      .setStyle(ButtonStyle.Danger)
  );

  await message.reply({
    content:
      "Nombre de la nueva asignatura: " +
      subjectName +
      "\nSelecciona un color:",
    components: [subjectColorSelect, cancelButton],
  });
}
