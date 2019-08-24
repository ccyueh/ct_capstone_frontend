import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Form from '../../../components/form';
import BottleForm from '../../../components/bottleForm';

class AddBottle extends Component {
  constructor() {
    super();

    this.state = {
      token: '',
      user_id: '',
      party_id: '',
      bottle: {}
    }
  }

  getDetails = async(e) => {
    let token = this.props.token;
    let user_id = JSON.parse(atob(token.split('.')[1])).user_id;
    let party_id = this.props.history.location.state.party_id;

    return [token, user_id, party_id];
  }

  addBottle = async(e) => {
    e.preventDefault();

    let data_json = {};

    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['user_id'] = this.state.user_id;
    data_json['party_id'] = this.state.party_id;

    if (this.state.bottle.bottle_id) {
      data_json['bottle_id'] = this.state.bottle.bottle_id;
    }

    const URL = 'http://localhost:5000/api/bottles/save';

    let response = await fetch(URL, {
      'method': 'POST',
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(data_json)
    })

    let data = await response.json();

    if (data.success) {
      alert(`${data.success}`);
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  retrieveBottle = async(user_id, party_id) => {
    let URL = 'http://localhost:5000/api/bottles/retrieve?party_id=';
    URL += party_id;
    URL += '&user_id=' + user_id;

    let response = await fetch(URL, {
      'method': 'GET',
      'headers': { 'Content-Type': 'application/json' }
    })

    let data = await response.json();
    if (data.success) {
      if (data.bottles.length > 0) {
        return data.bottles[0];
      } else {
        return {};
      }
    } else if (data.error) {
      alert(`${data.error}`);
    } else {
      alert('Sorry, try again.');
    }
  }

  async componentDidMount() {
    let details = await this.getDetails();
    let bottle = await this.retrieveBottle(details[1], details[2]);
    this.setState({
      'token': details[0],
      'user_id': details[1],
      'party_id': details[2],
      'bottle': bottle
    });
  }

  render() {
    if (this.state.token) {
      return (
        <Form title="">
          <BottleForm addBottle={this.addBottle} bottle={this.state.bottle} />
        </Form>
      );
    } else {
        return (
          <div>You must be logged in to view this page.</div>
        );
    }
  }
}


export default withRouter(AddBottle);
