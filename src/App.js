import React, { Component } from 'react';
import './App.css';
import { beaches } from './utils.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentBeach: beaches.rockaway,
      beach: {},
      error: {}
    };

    this.toggleBeach = this.toggleBeach.bind(this);
    this.renderLiveStream = this.renderLiveStream.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  componentDidMount() {
    this.callAPI()
      .then(res => {
        this.setState({ response: res.express })
      })
      .catch(err => console.log(err));
  }

  callAPI = async () => {
    const response = await fetch('/msw');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  toggleBeach() {
    console.log('toggle beach');
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

  render() {
    const { currentBeach } = this.state;

    const conditionsText = 'Rip the pit barny solid hit board tide stale wonk drainer. Lil ripper carve fins free offshore ridin the foam ball nuggets of heaven, one wave set. Slab rookie bro, waves fat, full rote above the lip. Kerrzy, Ano Nuevo rookie lined up air reverse wax the stick capped out.'

    console.log(this.state.response ? JSON.parse(this.state.response)[0] : 'no response', 'from api');
    return (
      <div className="nycsurf">
        <header className="nycsurf-header">
          <h1 className="nycsurf-title">{currentBeach.name}</h1>
        </header>
        <aside className="nycsurf-aside">
          <button type="button" id="beachToggle" onClick={this.toggleBeach}>Toggle Beach</button>
        </aside>
        <aside className="nycsurf-aside nycsurf-aside--alt">
          <a href="https://magicseaweed.com"><img alt="Link to Magic Seaweed" src="https://im-1-uk.msw.ms/msw_powered_by.png" /></a>
        </aside>
        <div className="nycsurf-main">

          {/* {data} */}

          <section>
            <h2>Today</h2>
            <p>{conditionsText}</p>
            {this.renderLiveStream()}

          </section>
          <section>
            <h2>Tomorrow</h2>
            <p>{conditionsText}</p>

          </section>
        </div>
      </div>
    );
  }
};

export default App;
