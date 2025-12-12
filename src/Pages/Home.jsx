import React from "react";
import Header from "../Components/Header";
import Orb from "../Components/Orb";

function Home() {
	return (
		<div className="border">
			<Header />
			<div className="homeMain headerAdjustment">
				<div className="copyWrapper">
					<div className="copy leftSide">
						<p>
							I AM A 25 YEAR OLD GUY AND <br /> I WANT TO CREATE COOL SH*T
						</p>
					</div>
					<div className="copy rightSide">
						<p>WEB DESIGN</p>
						<p className="break"> / </p>
						<p>WEB DEVELOPMENT</p>
						<p className="break"> / </p>
						<p>2D & 3D ANIMATION</p>
						<p className="break"> / </p>
						<p>UNITY GAME DEVELOPMENT</p>
						<p className="break"> / </p>
						<p>APP DEVELOPMENT</p>
					</div>
				</div>
			</div>
			<Orb />
		</div>
	);
}

export default Home;
