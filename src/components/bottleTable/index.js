import React from 'react';
import './index.css';
import Format from '../format';
import ReactStars from 'react-stars';

function BottleTable(props) {
  let bottle = props.bottle;
  return (
    <Format token={props.token} title="">
      <div className="img-container">
        <img src={'https://sipper-backend.herokuapp.com/' + bottle.label_img} />
      </div>
      <div>
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
        <p><span className="table-label">Average Rating:</span></p>
        <div className="star-container">
          <ReactStars
            value={Number(props.avg_rating)}
            color1="lightgray"
            size={60}
            edit={false}
          />
        </div>
        { props.stars &&
          <div>
            <p><span className="table-label">Your Rating:</span></p>
            <div className="star-container">
              <ReactStars
                value={Number(props.stars)}
                color1="lightgray"
                size={60}
                edit={false}
              />
            </div>
          </div>
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
