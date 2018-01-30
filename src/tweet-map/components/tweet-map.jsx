import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import geocoder from 'geocoder';

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
      tweet: 'hello',
      latlng: {lat: '' , lng: ''},
    };
    // TweetMap.getGecoder();

    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchString: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const tweetMap = this;
    geocoder.geocode(this.state.searchString, function(err, res) {
      if (!err) {
        tweetMap.setState({ latlng: res.results[0].geometry.location });
        console.log('from values', tweetMap.state);
      }
    });
  }

  render() {
    const { searchString, tweet, latlng } = this.state;
    // const marker = <Marker name={'Current location'} position={latlng} />;
    return(
      <div id="tweet-map">
        <h1>TweetMap</h1>
        <form onSubmit={this.handleSubmit}>
          <input className="tb" type="text" placeholder="Enter your search string" value={searchString} onChange={this.onSearchChange} />
          <br />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
        <Map google={this.props.google} zoom={14}>

          <Marker position={latlng} />

          <InfoWindow
          visible={true}
          >
            <h1>{tweet}</h1>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

TweetMap.displayName = 'TweetMap';

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDudKcRTkZ1idASKJKKeXA_cC3iDTXa-5I'
})(TweetMap)
