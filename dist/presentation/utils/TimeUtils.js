"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTimeStringToSeconds = parseTimeStringToSeconds;
exports.formatDuration = formatDuration;
exports.generateSecondsBetween = generateSecondsBetween;
function parseTimeStringToSeconds(timeString) {
    // Llevar cadena timeString en formato "xxh xxm xxs" a segundos UNIX
    // Ejemplo: "1h 30m 10s" -> 3780
    let totalSeconds = 0; // Total de segundos
    let timePattern = /(\d+)([hms])/g; // Expresión regular para buscar el tiempo en horas, minutos y segundos
    let match;
    while ((match = timePattern.exec(timeString)) !== null) {
        // Buscar cada ocurrencia de la expresión regular en la cadena
        const value = parseInt(match[1]); // Obtener el valor de la ocurrencia
        const unit = match[2]; // Obtener la unidad de tiempo
        switch (unit // Dependiendo de la unidad de tiempo, sumar el valor correspondiente a la unidad
        ) {
            case "h": // Si es hora, sumar el valor multiplicado por 3600 segundos
                totalSeconds += value * 3600;
                break;
            case "m": // Si es minuto, sumar el valor multiplicado por 60 segundos
                totalSeconds += value * 60;
                break;
            case "s": // Si es segundo, sumar el valor directamente
                totalSeconds += value;
                break;
            default:
                throw new Error("Unidad de tiempo no reconocida");
                break;
        }
    } // Fin del bucle
    if (!timePattern.test(timeString)) {
        throw new Error("Unidad de tiempo no reconocida");
    }
    return totalSeconds; // Retornar el total de segundos
}
function formatDuration(timestamp) {
    const totalSeconds = Math.floor(timestamp);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (hours > 0)
        parts.push(`${hours}h`);
    if (minutes > 0)
        parts.push(`${minutes}m`);
    if (seconds > 0)
        parts.push(`${seconds}s`);
    return parts.join(" ") || "0s";
}
function generateSecondsBetween(start, end) {
    const randomNumber = Math.floor(Math.random() * (end - start + 1) + start);
    return randomNumber;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ByZXNlbnRhdGlvbi91dGlscy9UaW1lVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFpQ0M7QUFFRCx3Q0FjQztBQUVELHdEQUdDO0FBdERELFNBQWdCLHdCQUF3QixDQUFDLFVBQWtCO0lBQ3pELG9FQUFvRTtJQUNwRSxnQ0FBZ0M7SUFFaEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsb0JBQW9CO0lBQzFDLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxDQUFDLHVFQUF1RTtJQUUxRyxJQUFJLEtBQUssQ0FBQztJQUNWLE9BQU8sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3ZELDhEQUE4RDtRQUM5RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7UUFDdEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQ3JELFFBQ0UsSUFBSSxDQUFDLGlGQUFpRjtVQUN0RixDQUFDO1lBQ0QsS0FBSyxHQUFHLEVBQUUsNERBQTREO2dCQUNwRSxZQUFZLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDN0IsTUFBTTtZQUNSLEtBQUssR0FBRyxFQUFFLDREQUE0RDtnQkFDcEUsWUFBWSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLEdBQUcsRUFBRSw2Q0FBNkM7Z0JBQ3JELFlBQVksSUFBSSxLQUFLLENBQUM7Z0JBQ3RCLE1BQU07WUFDUjtnQkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBQ2xELE1BQU07UUFDVixDQUFDO0lBQ0gsQ0FBQyxDQUFDLGdCQUFnQjtJQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsT0FBTyxZQUFZLENBQUMsQ0FBQyxnQ0FBZ0M7QUFDdkQsQ0FBQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxTQUFpQjtJQUM5QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdkQsTUFBTSxPQUFPLEdBQUcsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUVsQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFFakIsSUFBSSxLQUFLLEdBQUcsQ0FBQztRQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksT0FBTyxHQUFHLENBQUM7UUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUMzQyxJQUFJLE9BQU8sR0FBRyxDQUFDO1FBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFM0MsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBZ0Isc0JBQXNCLENBQUMsS0FBYSxFQUFFLEdBQVc7SUFDL0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzNFLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMifQ==