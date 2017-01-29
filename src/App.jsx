
import React from 'react';
import ReactDOM from 'react-dom';
import { observer, Provider, inject} from 'mobx-react';
import { observable, action } from 'mobx';
import { Button, Grid, Row, Col, PageHeader,
         Glyphicon, FormGroup, InputGroup, FormControl} from 'react-bootstrap';

import {overlaid, HRule, xsBaseWidth, lgBaseWidth} from './Presentation.jsx';
import {Store} from './Store.jsx';

const InputForm = observer(({update, placeholder, submitText, xsWidth, lgWidth}) => {
  let input;
  const submit = () => {
    if (input.value !== ""){
      update(input.value);
      input.value= ""
    }
  };
  return (
      <Col xs = {xsWidth} lg={lgWidth}>
        <FormGroup>
          <InputGroup>
            <FormControl 
              ref={node => {input = ReactDOM.findDOMNode(node);}} 
              type="text" 
              placeholder={placeholder}
              onKeyUp={e => {if (e.keyCode == 13){submit()}}}
              />
            <InputGroup.Button>
              <Button onClick={e => {e.target.blur(); submit()}}>{submitText}</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Col>
  )
})

const NewListForm = inject("store")(observer(({store}) => 
   <InputForm 
    update={action(text => store.lists.push({name: text, categories:[]}))} 
    placeholder="Add new list"
    submitText="Add"
    xsWidth={xsBaseWidth}
    lgWidth={lgBaseWidth}
    />
))

const NewCategoryForm = inject("store")(observer(({store}) => 
   <InputForm 
    update={action(text => {store.focusedList.categories.push({name: text, entries:[]})})} 
    placeholder="Add new category"
    submitText="Add"
    xsWidth={xsBaseWidth}
    lgWidth={lgBaseWidth}
    />
))

const NewEntryForm = inject("store")(observer(({store, categoryIx}) => 
   <InputForm 
    update={action(text => {store.getCategory(categoryIx).entries.push({name: text, active:true})})} 
    placeholder="Add new entry"
    submitText="Add"
    xsWidth={10}
    lgWidth={3}
    />
))

const ListList = inject("store")(observer(({store}) =>
  <div>
    {store.lists.map((list, i) => 
      <div key={i}>
      <Row  style={{'display':'flex', 'alignItems':'center'}}>
        <Col xs={xsBaseWidth-3} lg={lgBaseWidth-1}>
          {overlaid(700, "View or edit list", 
            <Button bsSize="small" onClick={action(e => {
              e.target.blur();
              store.focus = i;
            })}>{list.name}
            </Button> )}          
        </Col>
        <Col xs={2} lg={1}>
          {overlaid(700, "Delete list", 
            <Button bsSize="small" onClick={e => {e.target.blur(); store.removeList(i)}}>
              <Glyphicon glyph="remove" /> 
            </Button> )}         
        </Col>
     </Row>
     <HRule/>
     </div>)}
  </div>
))

const ListView = inject("store")(observer(({store}) => {

  const editButtonText = store.editing ? "Stop editing" : "Edit list"
  const newCategory    = store.editing ? <span><Row><NewCategoryForm/></Row><HRule/></span> : null

  const categoryDisplay = store.focusedList.categories.map((cat, catIx) => {

    const deleteEntry = entryIx =>
      <Col xs={1} lg={1}>
        {overlaid(700, "Delete entry", 
          <Button bsSize="small" onClick={e => {e.target.blur(); store.removeEntry(catIx, entryIx)}}>
            <Glyphicon glyph="remove" /> 
          </Button> )}         
      </Col>

    const deleteCategory =
      <Col xs={1} lg={1}>
        {overlaid(700, "Delete category", 
          <Button bsSize="small" onClick={e => {e.target.blur(); store.removeCategory(catIx)}}>
            <Glyphicon glyph="remove" /> 
          </Button> )}         
      </Col>

    const entriesDisplay = store.getCategory(catIx).entries.map((entry, ix) => 
      <div key = {ix}>
        <Row  style={{'display':'flex', 'alignItems':'center'}}>
          <Col xs={7} lg={3}>
              <span style={store.getCategory(catIx).entries[ix].active ? {} : {'textDecoration':'line-through'}}
                    className="entry" 
                    onClick={e => {store.toggleEntry(catIx, ix)}}>
                {entry.name}
              </span>
          </Col>
          {store.editing ? deleteEntry(ix) : null}
        </Row>
      </div>)

    const entries = store.getCategory(catIx).entries
    const activeCategory = entries.length == 0 || entries.some(({active}) => active)

    return (
      <div key={catIx}>
        <Row  style={{'display':'flex', 'alignItems':'center'}}>
          <Col xs={4} lg={2}>
            <h4 style={activeCategory ? {} : {'textDecoration':'line-through'}}>
              {store.getCategory(catIx).name}
            </h4>
          </Col>
          {store.editing ? <div><NewEntryForm categoryIx={catIx}/>{deleteCategory}</div> : null }
        </Row>
        {entriesDisplay}
        <HRule/>
      </div>
      )
  })
  
  return (
    <Grid fluid={false}>
      <HRule/>
      <Row style={{'display':'flex', 'alignItems':'center'}}>
        <Col xs={7} lg= {3}><h4><b>{store.focusedList.name}</b></h4></Col>
        <Col xs={2} lg= {1}>
          {overlaid(700, "Unmark all entries",
          <Button bsSize="small" onClick={action(e => {e.target.blur(); store.resetList()})}>Reset</Button>)}
        </Col>
        <Col xs={3} lg= {1}><Button bsSize="small" onClick={action(e => {e.target.blur(); store.editing = !store.editing})}>
          {editButtonText}</Button>
        </Col>
        <Col xs={2} lg= {1}><Button bsSize="small" onClick={action(e => {store.focus = null;store.editing=false})}>
          Back</Button>
        </Col>
      </Row>
      <HRule/>
      {newCategory}
      {categoryDisplay}
    </Grid>
  )
}))

const App = inject("store")(observer(({store}) => {

  const startPage = 
    <Grid fluid={false}>
      <HRule/>
      <Row><NewListForm/></Row>
      <HRule style={{'height':'3px'}}/>
      <ListList/>
    </Grid>

  return (store.focus !== null ? <ListView/> : startPage)
}))

export {App}
