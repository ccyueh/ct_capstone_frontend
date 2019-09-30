import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import BottleForm from '../../../components/bottleForm';
import UploadForm from '../../../components/uploadForm';
import callAPI from '../../../utils/api.js';
import getID from '../../../utils/getID.js';

class AddBottle extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      party_id: '',
      bottle: {},
      show_form: false
    }
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

    let data = await callAPI(
      'api/bottles/save',
      'POST',
      false,
      data_json
    );

    if (data) {
      this.props.history.push('../party/view');
    }
  }

  retrieveBottle = async(user_id, party_id) => {
    let data = await callAPI(
      'api/bottles/retrieve',
      'GET',
      {'user_id': user_id, 'party_id': party_id},
      false
    );

    if (data) {
      if (data.bottles.length > 0 ){
        return data.bottles[0];
      } else {
        return {};
      }
    }
  }

  retrieveParty = async(party_id) => {
    let data = await callAPI(
      'api/parties/retrieve',
      'GET',
      {'party_id': party_id},
      false
    );

    if (data) {
      return data.parties[0].voting;
    }
  }

  async componentDidMount() {
    let user_id = getID(this.props.token);
    let party_id = this.props.history.location.state.party_id;
    let bottle = await this.retrieveBottle(user_id, party_id);

    let party = await this.retrieveParty(party_id);
    if (party) {
      this.props.history.push('../bottle/party');
    }

    this.setState({ user_id, party_id, bottle});
  }

  render() {
    if (!this.props.history.location.state) {
      this.props.history.push('/');
    }

    let bottle = this.state.bottle;
    return (
      <Format token={this.props.token} title="">
        { this.state.show_form ? <h2>Bottle Details</h2> : <h2>Upload Label image</h2>
        }
        { bottle.label_img &&
          <div className="img-container my-5">
            <img
              className="mx-auto d-block"
              src={bottle.label_img}
              alt="Bottle Label"
            />
          </div>
        }
        { !this.state.show_form &&
          <UploadForm token={this.props.token} party_id={this.state.party_id} />
        }
        { Object.keys(bottle).length > 0 &&
          !this.state.show_form &&
          <button className="btn btn-danger" onClick={() => this.setState({ 'show_form': true })}>
            {bottle.vintage || bottle.bottle_name || bottle.producer ? "Edit" : "Add" } Bottle Details
          </button>
        }
        { this.state.show_form &&
          <BottleForm addBottle={this.addBottle} bottle={bottle} />
        }
      </Format>
    );
  }
}


export default withRouter(AddBottle);
