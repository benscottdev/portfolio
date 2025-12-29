import React, { useEffect, useState } from "react";

function SydneyTime() {
	const [time, setTime] = useState("");

	useEffect(() => {
		const updateTime = () => {
			const formatter = new Intl.DateTimeFormat("en-AU", {
				timeZone: "Australia/Sydney",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			});

			setTime(formatter.format(new Date()));
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="clockWrapper">
			<div className="clock">SYD {time}</div>
		</div>
	);
}

export default SydneyTime;
