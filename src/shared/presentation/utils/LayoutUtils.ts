import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

/**
 * Genera un layout balanceado de botones
 */
export function createBalancedGridLayoutOfButtons(
  items: { buttonAction: string; label: string; value: string }[]
) {
  const total = items.length;
  const cols =
    Math.ceil(Math.sqrt(total)) > 5 ? 5 : Math.ceil(Math.sqrt(total)); // columnas "ideales"

  const rows: ActionRowBuilder<ButtonBuilder>[] = [];

  for (let i = 0; i < total; i += cols) {
    const rowItems = items.slice(i, i + cols);
    const row = new ActionRowBuilder<ButtonBuilder>();

    row.addComponents(
      rowItems.map((item) =>
        new ButtonBuilder()
          .setCustomId(`${item.buttonAction}@${item.value}`)
          .setLabel(item.label)
          .setStyle(ButtonStyle.Secondary)
      )
    );

    rows.push(row);
  }

  return rows;
}
