"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHelp = sendHelp;
function sendHelp(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const helpMessage = `
    **Comandos del Bot de Estudio:**
\`\`\`
1.     !estudiar <asignatura>         - Comienza a estudiar una asignatura.
2.     !terminar                     - Termina la sesión de estudio y gana puntos.
3.     !ranking                      - Muestra el ranking de los 10 usuarios con más puntos.
4.     !sesiones                     - Muestra las últimas sesiones de estudio.
\`\`\``;
        message.channel.send(helpMessage);
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJlc2VudGF0aW9uL2NvbnRyb2xsZXJzL0hlbHBDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsNEJBY0M7QUFkRCxTQUFzQixRQUFRLENBQzVCLE9BQW9ELEVBQ3BELElBQWM7O1FBRWQsTUFBTSxXQUFXLEdBQUc7Ozs7Ozs7T0FPZixDQUFDO1FBRU4sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUFBO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkcifQ==