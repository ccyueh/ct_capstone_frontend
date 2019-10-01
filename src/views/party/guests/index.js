import React, { Component } from 'react';
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import Format from '../../../components/format';
import { getBottles } from '../../../utils';

class PartyGuests extends Component {
  constructor(props) {
    super();

    this.state = {
      bottles: []
    }
  }

  async componentDidMount() {
    let party_id = this.props.history.location.state.party_id;
    let bottles = await getBottles(party_id);
    this.setState({ bottles });
  }

  render() {
    if (!this.props.history.location.state) {
      this.props.history.push('/');
    }

    return (
      <Format token={this.props.token} title="Guest List">
        <table className="table table-sm guest-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bottles.map((bottle, index) =>
              <tr key={index}>
                <td>{bottle.first_name + ' ' + bottle.last_name}</td>
                <td>{bottle.email}</td>
                <td>
                  <Link to={{
                    pathname: "../bottle/rate",
                    state: {
                      bottle: bottle,
                      avg_rating: '',
                      stars: '',
                      description: '',
                    }
                  }}>
                    <span className="bottle-link">{index + 1}</span>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Format>
    );
  }
}

export default withRouter(PartyGuests);
