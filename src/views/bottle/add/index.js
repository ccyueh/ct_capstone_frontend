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
      token: '',
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

  async componentDidMount() {
    let token = this.props.token;
    let user_id = getID(token);
    let party_id = this.props.history.location.state.party_id;
    let bottle = await this.retrieveBottle(user_id, party_id);
    this.setState({ token, user_id, party_id, bottle});
  }

  render() {
    if (!this.props.history.location.state.party_id) {
      this.props.history.push('/');
    }

    let bottle = this.state.bottle;
    return (
      <Format title="">
        { this.state.show_form ? <h2>Bottle Details</h2> : <h2>Upload Label image</h2>
        }
        { bottle.label_img &&
          <div className="my-5">
            <img className="mx-auto d-block" src={"http://localhost:5000/" + bottle.label_img} />
          </div>
        }
        { !this.state.show_form &&
          <UploadForm token={this.state.token} img_type="Bottle" party_id={this.state.party_id} />
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
