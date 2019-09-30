import React from 'react';
import './index.css';
import Format from '../format';

function BottleTable(props) {
  let bottle = props.bottle;
  return (
    <Format token={props.token} title="">
      <div className="img-container">
        <img src={bottle.label_img} alt="Bottle Label" />
      </div>
      <div className="mw-table">
        <p>
          <span className="table-label">Brought by:</span>
          {bottle.first_name + " " + bottle.last_name}
        </p>
        <p>
          <span className="table-label">Producer:</span>
          {bottle.producer ? bottle.producer : "N/A"}
        </p>
        <p>
          <span className="table-label">Name/Varietal:</span>
          {bottle.bottle_name ? bottle.bottle_name : "N/A"}
        </p>
        <p>
          <span className="table-label">Vintage:</span>
          {bottle.vintage ? bottle.vintage : "N/A"}
        </p>
        { props.avg_rating &&
          <p>
          <span className="table-label">Average Rating:</span>
          <span className="star-text">
          {props.avg_rating.toFixed(3)} &#9733;
          </span>
          </p>
        }
        { props.stars &&
            <p>
              <span className="table-label">Your Rating:</span>
              <span className="star-text">
                {props.stars.toFixed(1)} &#9733;
              </span>
            </p>
        }
        { props.description &&
          <div>
            <p><span className="table-label">Your Tasting Notes:</span></p>
            <p>{props.description}</p>
          </div>
        }
      </div>
    </Format>
  );
}

export default BottleTable;
