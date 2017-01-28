
import React from 'react';
import ReactDOM from 'react-dom';
import {ListList} from './ListList.jsx';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import {Store} from './Store.jsx';

useStrict(true);

ReactDOM.render(
    <Provider store={new Store()}><ListList/></Provider>, 
    document.getElementById('app'));