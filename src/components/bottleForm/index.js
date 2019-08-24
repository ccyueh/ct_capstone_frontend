import React, { Component } from 'react';
import './index.css';

class BottleForm extends Component {
  constructor() {
    super();

    this.state = {
      producer: '',
      bottle_name: '',
      vintage: '',
      label_img: ''
    }
  }

  async componentDidMount() {
    let bottle = await this.props.bottle;

    if (bottle.bottle_id) {
      this.setState({
        'producer': bottle.producer,
        'bottle_name': bottle.bottle_name,
        'vintage': bottle.vintage,
        'label_img': bottle.label_img
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.props.addBottle}>
        <div className="form-group">
          <label>Producer</label>
          <input type="text" className="form-control" name="producer" defaultValue={this.state.producer}/>
          <label>Name/Varietal</label>
          <input type="text" className="form-control" name="bottle_name" defaultValue={this.state.bottle_name} />
          <label>Vintage</label>
          <input type="number" className="form-control" name="vintage" defaultValue={this.state.vintage} />
          <label>Label Image</label>
          <input type="text" className="form-control" name="label_img" defaultValue={this.state.label_img} />
        </div>
        <button type="submit" className="btn btn-danger">
          {this.state.label_img ? "Edit" : "Add" } Bottle
        </button>
      </form>
    );
  }
}

export default BottleForm;
