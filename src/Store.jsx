
import React from 'react';
import { observable, action } from 'mobx';

export class Store {
  @observable lists = []  //
  @observable focus         // null | int : the list we're currently focusing on
  @observable editing       // bool : 
  @action
  newEntry = text => {this.lists.push(text)}
  remove = i => action("remove", (e) => {
    e.target.blur();
    this.lists = this.lists.filter((e, j) => j !== i)
  })
}