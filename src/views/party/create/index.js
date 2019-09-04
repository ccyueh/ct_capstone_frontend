import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import CreatePartyForm from '../../../components/createPartyForm';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class CreateParty extends Component {
  constructor(props) {
    super();

    this.state = {
      party: {}
    }
  }

  createParty = async(e) => {
    e.preventDefault();

    let data_json = {};
    Object.values(e.target.elements).map(k => { if (k.name.length > 0) data_json[k.name] =  k.value } );
    data_json['host_id'] = getID(this.props.token);

    let data = await callAPI(
      'api/parties/save',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push('../party/view');
    }
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      let party = this.props.history.location.state.party;
      this.setState({ party });
    }
  }

  render() {
    return (
      <Format token={this.props.token} title="Party Details">
        <CreatePartyForm createParty={this.createParty} party={this.state.party} />
      </Format>
    );
  }
}

export default withRouter(CreateParty);
