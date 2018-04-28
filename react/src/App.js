import React, { Component } from 'react';
import moment from 'moment'
import './App.css';
import { beaches, evaluateRating } from './utils.js';
import logo from './msw_powered_by.png';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentBeach: beaches.rockaway,
      forecastToday: {},
      forecastTomorrow: {},
      error: {},
      dataIsLoaded: false
    };

    this.toggleBeach = this.toggleBeach.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.setForecast = this.setForecast.bind(this);
  }

  callAPI = async spotId => {
    const response = await fetch(`/msw/${spotId}`);
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  getForecast() {
    this.callAPI(this.state.currentBeach.beachId)
      .then(this.setForecast)
      .catch(err => console.log(err))
  }

  setForecast(res) {
    const forecast = res.express;
    
    this.setState({
      dataIsLoaded: true,
      forecastToday: JSON.parse(forecast)[4],
      forecastTomorrow: JSON.parse(forecast)[12]
    });
  }

  toggleBeach() {
    this.setState({
      currentBeach: 
        this.state.currentBeach.beachId === beaches.rockaway.beachId
         ? beaches.long
         : beaches.rockaway
      },
      this.getForecast
    );
  }

  get renderInfo() {
    const { forecastToday, forecastTomorrow } = this.state;
    const timeToday = moment(forecastToday.localTimestamp*1000).format("ddd, ha");
    const timeTomorrow = moment(forecastTomorrow.localTimestamp*1000).format("ddd, ha");

    const statusToday = evaluateRating(forecastToday.solidRating, forecastToday.fadedRating)
    const statusTomorrow = evaluateRating(forecastTomorrow.solidRating, forecastTomorrow.fadedRating)

    return (
      <div className="nycsurf-main">
        <section>
          <h2>{timeToday}</h2>
          <p>{statusToday}</p>
        </section>
        <section>
          <h2>{timeTomorrow}</h2>
          <p>{statusTomorrow}</p>
        </section>
      </div>
    );
  }

  render() {
    const { currentBeach, dataIsLoaded } = this.state;

    return (
      <div className="nycsurf">
        <header className="nycsurf-header">
          <h1 className="nycsurf-title">{currentBeach.name}</h1>
        </header>
        <aside className="nycsurf-aside">
          <button type="button" id="beachToggle" onClick={this.toggleBeach}>Toggle Beach</button>
        </aside>
        <aside className="nycsurf-aside nycsurf-aside--alt">
          <a href="https://magicseaweed.com"><img alt="Link to Magic Seaweed" src={logo} /></a>
        </aside>

        {Boolean(dataIsLoaded) ? this.renderInfo : <button type="button" id="getData" onClick={this.getForecast}>Get the Forecast</button>}
      </div>
    );
  }
};

export default App;
