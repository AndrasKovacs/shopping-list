
import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider, inject} from 'mobx-react';
import { observable, useStrict, action } from 'mobx';

import { Button, Grid, Row, Col, PageHeader, OverlayTrigger, Tooltip,
         Glyphicon, FormGroup, InputGroup, FormControl} from 'react-bootstrap';

import {overlaid, HRule} from './Presentation.jsx';

// The view for a concrete shopping list





