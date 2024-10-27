import { OmitPartialGroupDMChannel, Message } from "discord.js";

export async function sendHelp(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  args: string[]
) {
  const helpMessage = `
    **Comandos del Bot de Estudio:**
\`\`\`
1.     !estudiar <asignatura>         - Comienza a estudiar una asignatura.
2.     !terminar                     - Termina la sesión de estudio y gana puntos.
3.     !ranking                      - Muestra el ranking de los 10 usuarios con más puntos.
4.     !sesiones                     - Muestra las últimas sesiones de estudio.
\`\`\``;

  message.channel.send(helpMessage);
}

/**
 * const helpMessage = `
    **Comandos del Bot de Estudio:**
    \`\`\`
1.     !estudiar <asignatura>         - Comienza a estudiar una asignatura.
2.     !terminar                     - Termina la sesión de estudio y gana puntos.
3.     !ranking                      - Muestra el ranking de los 10 usuarios con más puntos.
4.     !retopersonalizado <duración> - Crea un reto de estudio personalizado. (3h, 45m, 23m...)
5.     !retos                        - Te da un reto de estudio aleatorio entre 1 y 5 horas.
6.     !terminarReto                 - Termina el reto de estudio actual.
7.     !rankingDetallado             - Muestra un ranking detallado por asignatura.
8.     !misPuntos                    - Muestra tus puntos actuales.
9.     !misPuntosDetallado           - Muestra tus puntos desglosados por asignatura.
10.     !eliminarAsignatura <asignatura> - Elimina una asignatura.
11.     !anadirPuntos <usuario> <asignatura> <puntos> - Añade puntos a una asignatura. (Admin)
12.     !quitarPuntos <usuario> <asignatura> <puntos> - Quita puntos de una asignatura. (Admin)
13.     !setPuntos <userId> <puntos> - Establece los puntos de un usuario. (Admin)
    \`\`\`
`;
 */
