import React, { Component } from 'react';
import './App.css';
import { beaches } from './utils.js';
import logo from './msw_powered_by.png';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentBeach: beaches.rockaway,
      forecastToday: {},
      forecastTomorrow: {},
      error: {}
    };

    this.toggleBeach = this.toggleBeach.bind(this);
    this.renderLiveStream = this.renderLiveStream.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.setForecast = this.setForecast.bind(this);
  }

  componentDidMount() {
    this.callAPI(this.state.currentBeach.beachId)
      .then(res => {
        const forecast = res.express;
        this.setState({
          // picking 
          forecastToday: JSON.parse(forecast)[2],
          forecastTomorrow: JSON.parse(forecast)[10]
        });
      })
      .catch(err => console.log(err));
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
      forecastToday: JSON.parse(forecast)[2],
      forecastTomorrow: JSON.parse(forecast)[10]
    });
  }

  toggleBeach() {
    this.setState(
      { currentBeach: this.state.currentBeach.beachId === beaches.rockaway.beachId ? beaches.long : beaches.rockaway },
      this.getForecast
    );
  }

  renderLiveStream() {
    // if (this.state.currentBeach === beaches.rockaway) {
    //   return (<div>
    //     <iframe title="rockaway-beach-feed" width="640" height="360" src="http://e.cdn-surfline.com/syndication/embed/v1/player.html?id=137586" frameBorder="0" scrolling="no" allowFullScreen></iframe>
    //     <div>
    //       <a href="https://www.surfline.com/surf-report/77th-st-rockaways-long-island_137586/"  title="77th St. Rockaways Surf Report and HD Surf Cam">77th St. Rockaways</a> Live HD Surf Cam. Check out more Surf Cams at <a href="https://www.surfline.com" title="Surfline.com - Global Surf Reports, Surf Forecasts, Live Surf Cams and Coastal Weather">Surfline.com</a>
    //     </div>
    //   </div>
    //   )
    // } else {
    //   return (<div>
    //     <iframe title="long-beach-feed" width="640" height="360" src="http://e.cdn-surfline.com/syndication/embed/v1/player.html?id=4269" frameBorder="0" scrolling="no" allowFullScreen></iframe>
    //     <div>
    //       <a href="https://www.surfline.com/surf-report/lincoln-blvd-long-island_4269/" title="Lincoln Blvd. Surf Report and HD Surf Cam">Lincoln Blvd.</a> Live HD Surf Cam. Check out more Surf Cams at <a href="https://www.surfline.com" title="Surfline.com - Global Surf Reports, Surf Forecasts, Live Surf Cams and Coastal Weather">Surfline.com</a>
    //     </div>
    //   </div>);

    // }
  }

  renderInfo() {
    const { forecastToday, forecastTomorrow } = this.state;
    console.log(this.state);
    return (
      <div className="nycsurf-main">
        <section>
          <h2>6am Today</h2>
          <ul>
            <ul>time: {forecastToday.localTimestamp}</ul>
            <ul>swell: {forecastToday.swell.absMaxBreakingHeight} ft</ul>

          </ul>
        </section>
        <section>
        <h2>6am Tomorrow</h2>
          <ul>
            <ul>time: {forecastTomorrow.localTimestamp}</ul>
            <ul>swell: {forecastTomorrow.swell.absMaxBreakingHeight} ft</ul>
          </ul>
        </section>
      </div>
    );
  }

  render() {
    const { currentBeach, forecastToday } = this.state;

    console.log(this.state.forecastToday.localTimestamp);
    console.log(this.state.forecastTomorrow.localTimestamp);
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

        {Boolean(forecastToday.timestamp) ? this.renderInfo() : ''}
      </div>
    );
  }
};

export default App;
