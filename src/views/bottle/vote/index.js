import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import BottleButton from '../../../components/bottleButton';

class VoteBottle extends Component {
  constructor(props) {
    super();

    this.state = {
      guest: '',
      bottles: [],
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
      return [];
    } else {
      alert('Sorry, try again.');
    }
  }

  bottleNum = bottle => {
    let bottles = this.state.bottles;
    let num = bottles.indexOf(bottle) + 1;
    return num;
  }

  async componentDidMount() {
    let params = this.props.history.location.state;
    if (params.party) {
      let token = params.token;
      let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
      let party_id = params.party.party_id;
      let bottles = await this.retrieveBottle(party_id);
      let guest = (user_id != params.party.host_id ? user_id : false);

      this.setState({
        'guest': guest,
        'bottles': bottles,
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="row">
        {this.state.bottles.map(bottle =>
          <BottleButton
            key={bottle.bottle_id}
            bottle={bottle}
            num={this.bottleNum(bottle)}
            guest={this.state.guest}
            />
        )}
      </div>
    );
  }
}

export default withRouter(VoteBottle);
