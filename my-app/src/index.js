import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



const name = 'lucas';


const user = {
    firstname:name,
    lastName:'V'
}

function formatname(user) {
     return user.firstname+"."+user.lastName;
  }
  const element = <h3>hello,{tick(user)}</h3>

function tick() {  
   let interVar =  <h3>this time is {new Date().toLocaleTimeString()} , formatname(user) </h3>;
   ReactDOM.render(interVar, document.getElementById('root'));
  }
  serviceWorker.unregister();

  setInterval(tick,1000);
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// test




