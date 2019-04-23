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

//7. 有状态的组件渲染

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


//9. 列表和key
//普通渲染
const number =[1,2,3,4,5];
const number2 = number.map(r=>r*2);
console.log(number+" map: "+number2);

//普通元素的嵌套
const number3 = [1,2,3,4,5];
const number4 = number3.map((p)=><li key={p.toString()}>{p}</li>);

ReactDOM.render(<ul>{number4}</ul>,document.getElementById("root9"));
//组件化渲染列表（指定Key）
function NumberList(props) {
    const number_1 = props.number;
    const number_2 = number_1.map(p=><li key={p.toString()}>{p}</li>);
    return ( <ul>{number_2}</ul> );
}
ReactDOM.render(<NumberList number={number3}/>,document.getElementById("root9"));

//组件化渲染列表 (使用key提取Item)
function ListItem(props) {
    return <li>{props.value}</li>
}

function Numberlist2(props) {
    const number = props.number;
    const number_1=number.map(p=><ListItem key={p.toString()}
    value={p}/>);
    return (<ul>{number_1}</ul>);
}
ReactDOM.render(<Numberlist2 number={number3}/>,document.getElementById("roo12"));



//10 受控的表单元素,使用唯一的state来控制状态
class Form_exam extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleCommit(event){
        alert("the commit name："+ this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleCommit}>
                name: <input type="text" onChange={this.handleChange} value={this.state.value}/>
                <input type="submit" value="提交"/>
            </form>
        )
    }
}

ReactDOM.render(<Form_exam/>,document.getElementById("roo13"));


//11 select选择框
class FlavorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:'c'};
        this.handleChange = this.handleChange.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleCommit(event){
        alert("the commit name："+ this.state.value);
        event.preventDefault();
    }
   render() {
       return (
         <form onSubmit={this.handleCommit}>
             <label>
                 your choose
             <select value={this.state.value} onChange={this.handleChange}>
                 <option value="a">a</option>
                 <option value="b">b</option>
                 <option value="c">c</option>
                 <option value="d">d</option>
             </select>
             </label>
             <input type="submit" text="提交"/>
         </form>
       );
   }
}
ReactDOM.render(<FlavorForm/>,document.getElementById("roo14"));


class MulitForms extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isGoing: true,
            offSet:2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
         const target = event.target;
         const value = target.type === 'checkbox'?target.checked:target.value;
         const name = target.name;
         console.log(name);
         this.setState({
             //[name] 自动在name数组中做匹配
             [name]:value})
    }
    render() {
        return (
            <form>
                <label>
                    the first label:
                    <input name='isGoing' checked={this.state.isGoing} type='checkbox' onChange={this.handleInputChange}/>
                    the second label:
                    <input name='offSet' value={this.state.offSet} type='number' onChange={this.handleInputChange}/>
                </label>
            </form>
        );
    }
}

ReactDOM.render(<MulitForms/>,document.getElementById("roo15"));


//11.状态提升
function BoilingVerdict(props){
     if(props.celsius >=100) return <p>the water would boil.</p>;
    return <p>the water not boil.</p>;
}

class Calculator  extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature:''};
    }
    handleChange(event){
        this.setState({temperature:event.target.value})
    }
    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <input value={temperature}
                onChange={this.handleChange}/>
                <BoilingVerdict celsius={temperature}/>
            </fieldset>
        );
    }
}

ReactDOM.render(<Calculator/>,document.getElementById("roo16"));


//12 状态提升 多个组件
const  scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
class CalculatorInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature:''}
    }
    handleChange(event){
        this.setState({temperature:event.target.value})
    }
    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (<fieldset>
             <legend>your input temperature is {scaleNames[scale]}:</legend>
             <input value={temperature}
                   onChange={this.handleChange}/>
        </fieldset>);
    }
}
class CalculatorSpan extends React.Component{
    render() {
        return (
            <div>
                <CalculatorInput scale='c'/>
                <CalculatorInput scale='f'/>
            </div>
        )
    }
}

ReactDOM.render(<CalculatorSpan/>,document.getElementById("roo17"));


//12 状态提升最终结果，状态提升含义：将子组件的state提升到父组件中，供所有子组件共用
//华氏度转摄氏度
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
//摄氏度转华氏度
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
//温度数据转换和校验
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const  scaleNames2 = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
class CalculatorInput2 extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature:''}
    }
    handleChange(event){
        //this.setState({temperature:event.target.value})
        this.props.onTemperatureChange(event.target.value);
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (<fieldset>
            <legend>your input temperature is {scaleNames[scale]}:</legend>
            <input value={temperature}
                   onChange={this.handleChange}/>
        </fieldset>);
    }
}
class CalculatorSpan2 extends React.Component{
    constructor(props){
        super(props);
        this.handleCelsius = this.handleCelsius.bind(this);
        this.handleFahrenheit = this.handleFahrenheit.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
    handleCelsius(temperature){
         this.setState({state:'c',temperature})
    }
    handleFahrenheit(temperature){
         this.setState({state:'f',temperature})
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <CalculatorInput2 scale='c' onTemperatureChange={this.handleCelsius} temperature={celsius}/>
                <CalculatorInput2 scale='f' onTemperatureChange={this.handleFahrenheit} temperature={fahrenheit}/>
                <BoilingVerdict celsius={temperature}/>
            </div>
        )
    }
}

ReactDOM.render(<CalculatorSpan2/>,document.getElementById("roo17"));