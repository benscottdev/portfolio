import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function SkillRadar() {
	const data = {
		labels: ["React", "JavaScript", "CSS / SCSS", "HTML", "PHP", "Unity", "Three.js", "Blender", "Figma"],
		datasets: [
			{
				data: [70, 80, 75, 90, 69, 40, 60, 75, 85],
				backgroundColor: "rgba(155, 0, 200, 0.4)",
				borderColor: "white",
				borderWidth: 1,
				pointBackgroundColor: "white",
				pointRadius: 3,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			r: {
				min: 0,
				max: 100,
				ticks: {
					display: false,
				},
				grid: {
					color: "rgba(255,255,255,0.2)",
				},
				angleLines: {
					color: "rgba(255,255,255,0.2)",
				},
				pointLabels: {
					color: "#ffffff",
					font: {
						size: 16,
						family: "monospace",
					},
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			// tooltip: {
			// 	backgroundColor: "#000",
			// 	titleFont: { family: "monospace" },
			// 	bodyFont: { family: "monospace" },
			// },
		},
	};

	return (
		<div className="radarWrapper">
			<Radar data={data} options={options} />
		</div>
	);
}
