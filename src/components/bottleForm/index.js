import React from 'react';
import './index.css';

function BottleForm(props) {
  return (
    <form onSubmit={props.addBottle}>
      <div className="form-group">
        <label>Producer</label>
        <input type="text" className="form-control" name="producer" />
        <label>Name/Varietal</label>
        <input type="text" className="form-control" name="bottle_name" />
        <label>Vintage</label>
        <input type="number" className="form-control" name="vintage" />
        <label>Label Image</label>
        <input type="test" className="form-control" name="label_img" />
        <label>Party ID</label>
        <input type="number" className="form-control" name="party_id" />
        <label>User ID</label>
        <input type="number" className="form-control" name="user_id" />
      </div>
      <button type="submit" className="btn btn-primary">Add Bottle</button>
    </form>
  );
}

export default BottleForm;
