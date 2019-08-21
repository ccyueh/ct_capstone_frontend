import React, { Component } from 'react';
import './index.css';
import BottleButton from '../../../components/bottleButton';

class VoteBottle extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      party: {},
      bottles: []
    }
  }

  retrieveDetails = async(party_id) => {
    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    this.setState({ user_id });

    let URL = 'http://localhost:5000/api/parties/retrieve?party_id=';
    URL += party_id;

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      return data.parties[0];
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  retrieveBottle = async(e) => {
    let URL = 'http://localhost:5000/api/bottles/retrieve?party_id=';
    URL += this.state.party['party_id'];
    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      return data.bottles;
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  bottleNum = bottle => {
    let bottles = this.state.bottles;
    let num = bottles.indexOf(bottle) + 1;
    return num;
  }

  userStatus = () => {
    if (this.state.user_id == this.state.party.host_id) {
      return false;
    } else {
      return this.state.user_id;
    }
  }

  async componentDidMount() {
    let party_id = localStorage.getItem('party_id');
    let party = await this.retrieveDetails(party_id);
    this.setState({ party });

    let bottles = await this.retrieveBottle();
    this.setState({ bottles });
  }

  render() {
    return (
      <div className="row">
        {this.state.bottles.map(bottle =>
          <BottleButton
            key={bottle.bottle_id}
            bottle_id={bottle.bottle_id}
            num={this.bottleNum(bottle)}
            guest={this.userStatus()}
            />
        )}
      </div>
    );
  }
}

export default VoteBottle;
