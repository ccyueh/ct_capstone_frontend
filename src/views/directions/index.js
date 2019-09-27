import React from 'react';
import './index.css';
import Format from '../../components/format';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

function Directions() {
  return (
    <Format token="token" title="How to Sip">
      <ol>
        <li>Click on <span className="footer-help">Home <HomeOutlinedIcon /></span> to view the current (or next upcoming) party.</li>
        <li>If you see a countdown timer, click on <span className="footer-help">Vote <StarBorderOutlinedIcon /></span> to vote on bottles!</li>
        <li>To vote on a bottle, click on a bottle #.</li>
        <li>Sip that wine, rate it, take notes, and click on <span className="footer-help">Vote <StarBorderOutlinedIcon /></span> to move onto the next bottle!</li>
        <li>After the host releases the results, click on <span className="footer-help">Results <FormatListNumberedIcon /></span> to see the winning bottles!</li>
      </ol>
    </Format>
  );
}

export default Directions;
