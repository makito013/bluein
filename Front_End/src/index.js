import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , Route, Switch, Redirect } from 'react-router-dom';
import LoginTemplate from './template/login'
import Login from './login'
import Cadastro from './cadastro'

class Index extends Component{
    constructor(props) {
        super(props);
    }

    login(){

    }


    render(){
        return(
            <BrowserRouter basename="">
                <Switch>
                    <Route path="/login" render={props => <LoginTemplate page={<Login/>}/>} />
                    <Route path="/cadastro" render={props => <LoginTemplate page={<Cadastro/>}/>} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
