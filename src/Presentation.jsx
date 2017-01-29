
import React from 'react';
import { OverlayTrigger, Tooltip,Row, Col } from 'react-bootstrap';

const xsBaseWidth = 12
const lgBaseWidth = 6

const overlaid = (delay, text, component) => 
  <OverlayTrigger delay={delay} placement="top" overlay={<Tooltip id="tooltip">{text}</Tooltip>}>
    {component}
  </OverlayTrigger>

const HRule = () => <Row><Col xs = {xsBaseWidth} lg={lgBaseWidth}><hr></hr></Col></Row>

export {HRule, overlaid, xsBaseWidth, lgBaseWidth}