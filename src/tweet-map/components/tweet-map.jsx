import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import geocoder from 'geocoder';
import $ from "jquery";
import axios from "axios";

// var geocoder = null;

class TweetMap extends React.Component {
  // static getGecoder() {
  //   const options = {
  //     provider: 'google',
  //
  //     // Optional depending on the providers
  //     apiKey: 'AIzaSyDudKcRTkZ1idASKJKKeXA_cC3iDTXa-5I', // for Mapquest, OpenCage, Google Premier
  //   };
  //
  //   geocoder = NodeGeocoder(options);
  // }

  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      latlng: {lat: '' , lng: ''},
      tweets: [],
    };
    // TweetMap.getGecoder();

    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateMarkers = this.generateMarkers.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchString: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const tweetMap = this;
    let tweetLocations = [];

    axios.get('http://localhost:5000/tweets', {
      params: {
        searchString: this.state.searchString,
      }
    })
    .then((res) => {
      console.log('success', res);
      res.data.map((tweet) => {
        geocoder.geocode(tweet.userLocation, function(err, res) {
          if (!err && res.results) {
            // tweetMap.setState({ latlng: res.results[0].geometry.location });
            console.log('from values', res);
            tweetLocations.push(res.results[0].geometry.location);
          }
        });
      });
      tweetMap.setState({ tweets: tweetLocations }, () => {
        console.log(tweetMap.state);
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
  }

  generateMarkers() {
    return this.state.tweets.map((tweet) => {
      console.log(tweet);
      return <Marker position={tweet} />
    });
  }

  render() {
    const { searchString, tweet, latlng } = this.state;
    const markers = this.generateMarkers();
    // const marker = <Marker name={'Current location'} position={latlng} />;
    return(
      <div id="tweet-map">
        <h1>TweetMap</h1>
        <form onSubmit={this.handleSubmit}>
          <input className="tb" type="text" placeholder="Enter your search string" value={searchString} onChange={this.onSearchChange} />
          <br />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
        <Map google={this.props.google} zoom={2}>
          {markers}
        </Map>
      </div>
    );
  }
}

TweetMap.displayName = 'TweetMap';

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAAC1Ywo5pV5DxcHPBjykxnVuzUphxk_r4'
})(TweetMap)
