import React, { Component } from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import DisplayParty from '../display';
import { allParties } from '../../../utils';

class ViewParty extends Component {
  constructor() {
    super();

    this.state = {
      parties: [],
      past: false
    }
  }

  selectTime = value => {
    this.setState({ 'past': value });
  }

  async componentDidMount() {
    let parties = await allParties(this.props.token);
    this.setState({ parties });
  }

  render() {
    return (
      <Format token={this.props.token} title="Parties">
        <div className="col-md-12 text-center">
          <div className="btn-group">
            <button className="btn btn-danger"
              onClick={() => this.selectTime(false)}>
              Upcoming
            </button>
            <button className="btn btn-danger"
              onClick={() => this.selectTime(true)}>
              Past
            </button>
          </div>
        </div>
        <div className="container">
          <DisplayParty token={this.props.token} past={this.state.past} parties={this.state.parties} />
        </div>
        </Format>
    );
  }
}

export default withRouter(ViewParty);
