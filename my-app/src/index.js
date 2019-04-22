import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//js表达式必需写入{}中内

const name = 'lucas';


const user = {
    firstname: name,
    lastName: 'V'
};

function formatname(user) {
    return user.firstname + "." + user.lastName;
}

const element = <h3>hello,{tick(user)}</h3>;

function tick() {
    let interVar = <h3>this time is {new Date().toLocaleTimeString()} , {formatname(user)} </h3>;
    ReactDOM.render(interVar, document.getElementById('root'));
}

serviceWorker.unregister();

setInterval(tick, 1000);

//2. 以下两种是一样的
function Welcome(props) {
    return <h3>hello,{props.name}</h3>;
}

// class welcom extends React.Component {
//     render() {
//         return <h3>hello,{this.props.name}</h3>
//     }
// }
ReactDOM.render(<Welcome name="lucas"/>,document.getElementById("root2"));


//3. reactjs 组合组件

function APP() {
    return (
          <div>
              <Welcome name="Chris"/>
              <Welcome name="Lucas"/>
              <Welcome name="Fury"/>
          </div>
    );
}

ReactDOM.render(<APP/>,document.getElementById("root3"));


//4.1. Reactjs 生命周期 将定时器组件化
function Clock(props) {
    return(
        <div>
            <div>this is little clock</div>
            <div>{props.date.toLocaleTimeString()}</div>
        </div>
    );
}
function ticks() {
      ReactDOM.render(<Clock date={new Date()}/>,document.getElementById("root4"));
}

setInterval(ticks,1000);

//4.2. Reactjs 生命周期

class ClockClass extends React.Component {
    //构造方法，初始化数据
    constructor(props) {
        super(props);
        this.state={date:new Date()};
    }
    //继承而来的渲染的方法
    render() {
        return (
            <div>
                <div>this is little clock2</div>
                <div>{this.state.date.toLocaleTimeString()}</div>
            </div>
        );
    }
    //Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，
    // React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。
    // 这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。
    // React 也会相应的更新 DOM。
    tick(){
        this.setState({date:new Date()});
    }
    //方法会在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        this.timerID = setInterval(
            ()=>this.tick(),
            1000
        );
    }
    //我们会在 componentWillUnmount() 生命周期方法中清除计时器：
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
}
ReactDOM.render(<ClockClass/>,document.getElementById("root5"));


//5 reactjs的事件
//通过以下两种方法，向方法传递参数
/*<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>*/
/*<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>*/
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={isToggleOn:true};
        // 为了在回调中使用 `this`，这个绑定是必不可少的,将this绑定到自身
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state=>({
            isToggleOn: !state.isToggleOn
        }));
    }
    render() {
        return (<button onClick={this.handleClick}>
            {this.state.isToggleOn? 'NO':'OFF'}
        </button>);
    }
}
ReactDOM.render(<Toggle/>,document.getElementById("root6"));




//6. 条件渲染
function UserGreeting(props) {
    return <p> this is User Greeting </p>;
}
function GoodByeGreeting(props) {
    return <p> this is GoodBye Greeting </p>;
}

function Greeting(props) {
    const  UserIsLogion=  props.UserIsLogion;
    if(UserIsLogion){
        return <UserGreeting/>
    }
    return <GoodByeGreeting/>;
}

ReactDOM.render(<Greeting UserIsLogion={true}/>,document.getElementById("root7"));

//7. 有状态的渲染

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginController extends React.Component{
    constructor(props){
        super(props);
        this.handleLoginInClick = this.handleLoginInClick.bind(this);
        this.handleLoginOutClick = this.handleLoginOutClick.bind(this);
        this.state={isLoggedIn:false};
    }
    handleLoginInClick(){
        this.setState({isLoggedIn:true});
    }
    handleLoginOutClick(){
        this.setState({isLoggedIn:false});
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLoginOutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginInClick} />;
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}
ReactDOM.render(<LoginController/>,document.getElementById("root8"));






