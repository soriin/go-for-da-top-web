import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import AppState from '../states/appState'

@observer
export default class Login extends React.Component<{ appState: AppState }, {}> {
  render() {
    return (
      <input type='text'/>
    )
  }
    
}