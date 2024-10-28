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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = getUserInfo;
const discord_js_1 = require("discord.js");
const GetPointsByUser_1 = require("../../application/useCases/GetPointsByUser");
const node_fetch_1 = __importDefault(require("node-fetch"));
const GetStudySessionsFromUser_1 = require("../../application/useCases/GetStudySessionsFromUser");
function getUserInfo(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = message.author.id;
        const pointsBySubject = yield (0, GetPointsByUser_1.GetPointsByUser)(userId);
        const studySessions = yield (0, GetStudySessionsFromUser_1.GetStudySessionsFromUser)(userId);
        // Construir el URL del gráfico usando QuickChart API
        const barChartConfig = {
            type: "bar",
            backgroundColor: "#ffffff",
            data: {
                labels: pointsBySubject.map((item) => item.subjectName),
                datasets: [
                    {
                        label: "Puntos totales por asignatura",
                        data: pointsBySubject.map((item) => item.totalPoints),
                        backgroundColor: "#007bff",
                    },
                ],
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: "#000", // Color de la leyenda
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: "#fff" }, // Color de las etiquetas del eje x
                            grid: { color: "rgba(0,0,0,0.1)" }, // Color de las líneas de la cuadrícula
                        },
                        y: {
                            ticks: { color: "#fff" }, // Color de las etiquetas del eje y
                            grid: { color: "rgba(0,0,0,0.1)" },
                        },
                    },
                },
                backgroundColor: "#ffffff",
            },
        };
        const lineChartConfig = {
            type: "line",
            backgroundColor: "#ffffff",
            data: {
                labels: studySessions.map((item) => item.subjectName),
                datasets: [
                    {
                        label: "Todas las sesiones de estudio",
                        data: studySessions.map((item) => item.totalPoints),
                        backgroundColor: "#007bff",
                    },
                ],
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: "#000", // Color de la leyenda
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: "#fff" }, // Color de las etiquetas del eje x
                            grid: { color: "rgba(0,0,0,0.1)" }, // Color de las líneas de la cuadrícula
                        },
                        y: {
                            ticks: { color: "#fff" }, // Color de las etiquetas del eje y
                            grid: { color: "rgba(0,0,0,0.1)" },
                        },
                    },
                },
                backgroundColor: "#ffffff",
            },
        };
        const barChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(barChartConfig))}`;
        const lineChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(lineChartConfig))}`;
        // Descargar la imagen del gráfico
        const barChartresponse = yield (0, node_fetch_1.default)(barChartUrl);
        const barChartBuffer = yield barChartresponse.arrayBuffer();
        const barChartFileBuffer = Buffer.from(barChartBuffer);
        const lineChartresponse = yield (0, node_fetch_1.default)(lineChartUrl);
        const lineChartBuffer = yield lineChartresponse.arrayBuffer();
        const lineChartFileBuffer = Buffer.from(lineChartBuffer);
        const graphicBar = new discord_js_1.AttachmentBuilder(barChartFileBuffer, {
            name: "bar.png",
        });
        const graphicLine = new discord_js_1.AttachmentBuilder(lineChartFileBuffer, {
            name: "line.png",
        });
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`📊 Resumen de puntos por asignatura`)
            .setDescription(`Usuario: <@${userId}>`)
            .setImage("attachment://bar.png");
        const embedLine = new discord_js_1.EmbedBuilder()
            .setTitle(`📊 Resumen de puntos por sesión`)
            .setDescription(`Usuario: <@${userId}>`)
            .setImage("attachment://line.png");
        yield message.reply({
            embeds: [embed, embedLine],
            files: [graphicBar, graphicLine],
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckluZm9Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ByZXNlbnRhdGlvbi9jb250cm9sbGVycy9Vc2VySW5mb0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFVQSxrQ0FxSEM7QUEvSEQsMkNBS29CO0FBQ3BCLGdGQUE2RTtBQUM3RSw0REFBK0I7QUFDL0Isa0dBQStGO0FBRS9GLFNBQXNCLFdBQVcsQ0FDL0IsT0FBb0QsRUFDcEQsSUFBYzs7UUFFZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUEsaUNBQWUsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUEsbURBQXdCLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0QscURBQXFEO1FBQ3JELE1BQU0sY0FBYyxHQUFHO1lBQ3JCLElBQUksRUFBRSxLQUFLO1lBQ1gsZUFBZSxFQUFFLFNBQVM7WUFDMUIsSUFBSSxFQUFFO2dCQUNKLE1BQU0sRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN2RCxRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFLCtCQUErQjt3QkFDdEMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ3JELGVBQWUsRUFBRSxTQUFTO3FCQUMzQjtpQkFDRjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFO3dCQUNQLE1BQU0sRUFBRTs0QkFDTixNQUFNLEVBQUU7Z0NBQ04sS0FBSyxFQUFFLE1BQU0sRUFBRSxzQkFBc0I7NkJBQ3RDO3lCQUNGO3FCQUNGO29CQUNELE1B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