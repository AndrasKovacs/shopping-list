
import React from 'react';
import { observable, action, computed } from 'mobx';

// type Entry = {name: String, active: Bool}
// type Catgory = {name : String, entries: [Entry]}
// type ShoppingList = {name: String, categories: [Category]}

const initLists = [
  {name: "My shopping list no. 1", categories: [
    {name: "General things", entries: [
      {name:"Screwdriver", active:true},
      {name:"Apple", active:true},
      {name:"Mutton chop", active:true},
      {name:"Crankshaft", active:true},
      {name:"Thorium hexafluride", active:true},
      {name:"Chewing gum", active:true}
      ]}, 
    {name: "Misc. things", entries:[
      {name:"Travel insurance", active:true},
      {name:"Horse 2x", active:true},
      {name:"Printing paper", active:true},
      {name:"Vegetables", active:true},
      {name:"Detergent", active:true}
    ]}]},
  {name: "Other list", categories: []}
]

export class Store {
  @observable lists   = initLists
  @observable focus   = null   // null | int : the list we're currently focusing on
  @observable editing = false  

  @computed get focusedList(){
    return this.focus === null ? null : this.lists[this.focus];
  }

  @action
  removeList = i => {
    this.lists = this.lists.filter((e, j) => j !== i)
  }

  @action
  resetList = () => {
    this.focusedList.categories.forEach(category => category.entries.forEach(entry => entry.active = true))
  }

  @action
  removeCategory = i => {
    this.focusedList.categories = this.focusedList.categories.filter((e, j) => j !== i)
  }

  @action
  removeEntry = (catIx, entryIx) => {
    this.focusedList.categories[catIx].entries = 
      this.focusedList.categories[catIx].entries.filter((e, j) => j !== entryIx)
  }

  @action
  toggleEntry = (catIx, entryIx) => {
    this.focusedList.categories[catIx].entries[entryIx].active = !
      this.focusedList.categories[catIx].entries[entryIx].active
  }

  getCategory = i => this.focusedList.categories[i]
}