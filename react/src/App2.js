
import React, { useState, useEffect } from 'react';
import moment from 'moment'
import './App.css';
import { beaches, evaluateRating } from './utils.js';
import logo from './msw_powered_by.png';

function useForecastData() {
	const [forecast, setForecast] = useState({});
	const [currentBeach, setCurrentBeach] = useState(beaches.rockaway);

	const fetchData = async () => {
		const json = await fetch(`/msw/${currentBeach.beachId}`)
			.then(res => res.json());
	
		setForecast(
			{
				...forecast,
				...JSON.parse(json.express)
			}
		);
	}

	useEffect(() => {
	  fetchData()
	}, [currentBeach]);


	return [forecast, currentBeach, setCurrentBeach];
}


function App() {
	const [forecast, currentBeach, setCurrentBeach] = useForecastData();

	if (Object.keys(forecast).length) {
		const forecastToday = forecast[4];
		const forecastTomorrow = forecast[12];
		var timeToday = moment(forecastToday.localTimestamp*1000).format("ddd, ha");
		var timeTomorrow = moment(forecastTomorrow.localTimestamp*1000).format("ddd, ha");
	
		var statusToday = evaluateRating(forecastToday.solidRating, forecastToday.fadedRating)
		var statusTomorrow = evaluateRating(forecastTomorrow.solidRating, forecastTomorrow.fadedRating)
	}
	
	return (
		<div className="nycsurf">
			<header className="nycsurf-header">
				<h1 className="nycsurf-title">{currentBeach.name}</h1>
			</header>
			<aside className="nycsurf-aside">
				<button type="button" id="beachToggle" onClick={() => setCurrentBeach(currentBeach === beaches.long ? beaches.rockaway : beaches.long)}>Toggle Beach</button>
			</aside>
			<aside className="nycsurf-aside nycsurf-aside--alt">
				<a href="https://magicseaweed.com"><img alt="Link to Magic Seaweed" src={logo} /></a>
			</aside>
			{
				!Object.keys(forecast).length
				? null
				: <div className="nycsurf-main">
						<section>
							<h2>{timeToday}</h2>
							<p>{statusToday}</p>
						</section>
						<section>
							<h2>{timeTomorrow}</h2>
							<p>{statusTomorrow}</p>
						</section>
					</div>
			}
		</div>
	);
}

export default App;