
import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider, inject} from 'mobx-react';
import { observable, action } from 'mobx';
import { Button, Grid, Row, Col, PageHeader,
         Glyphicon, FormGroup, InputGroup, FormControl} from 'react-bootstrap';

import {overlaid, HRule, xsBaseWidth, lgBaseWidth} from './Presentation.jsx';
import {Store} from './Store.jsx';

// The list of shopping lists, displayed on startup

const NewList = inject("store")(observer(({store}) => {
  let input;
  const submit = () => {
    if (input.value !== ""){
      store.newEntry(input.value)
      input.value= ""
    }
  };
  return (
    <Row>
      <Col xs = {xsBaseWidth} lg={lgBaseWidth}>
        <FormGroup>
          <InputGroup>
            <FormControl 
              ref={node => {input = ReactDOM.findDOMNode(node);}} 
              type="text" 
              placeholder="Add new shopping list"
              onKeyUp={e => {if (e.keyCode == 13){submit()}}}
              />
            <InputGroup.Button>
              <Button onClick={e => {e.target.blur(); submit()}} >Add</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Col>
    </Row>
  )
}))


const List = inject("store")(observer(({store}) =>
  <div>
    {store.lists.map((text, i) => 
      <div key={i}>
      <Row  style={{'display':'flex', 'alignItems':'center'}}>
        <Col xs={xsBaseWidth-3} lg={lgBaseWidth-1}>
          {overlaid(1000, "Click to start shopping or edit list", 
            <Button bsSize="small">{text}</Button> )}          
        </Col>
        <Col xs={2} lg={1}>
          {overlaid(1000, "Delete list", 
            <Button bsSize="small" onClick={store.remove(i)}><Glyphicon style={{'color':'red'}} glyph="remove" /> </Button> )}         
        </Col>
     </Row>
     <HRule/>
     </div>)}
  </div>
))

const ListList = inject("store")(observer(({store}) =>
  <Grid fluid={false}>
    <HRule/>
    <NewList/>
    <List/>
  </Grid>
))

export {ListList}
