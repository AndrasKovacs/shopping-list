
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App.jsx';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {Store} from './Store.jsx';

useStrict(true);

ReactDOM.render(
    <Provider store={new Store()}><App/></Provider>, 
    document.getElementById('app'));