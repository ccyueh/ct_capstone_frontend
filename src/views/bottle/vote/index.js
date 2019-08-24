import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
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

  retrieveBottle = async(party_id) => {
    let URL = 'http://localhost:5000/api/bottles/retrieve?party_id=';
    URL += party_id;
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
    let party_id = this.props.history.location.state.party_id;
    console.log(party_id);
    let party = await this.retrieveDetails(party_id);
    let bottles = await this.retrieveBottle(party_id);

    this.setState({ party, bottles });
    console.log(this.state);
  }

  render() {
    return (
      <div className="row">
        {this.state.bottles.map(bottle =>
          <BottleButton
            key={bottle.bottle_id}
            bottle={bottle}
            num={this.bottleNum(bottle)}
            guest={this.userStatus()}
            />
        )}
      </div>
    );
  }
}

export default withRouter(VoteBottle);
