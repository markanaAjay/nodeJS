import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* *****Understanding the react elements*****

### creating element with JSX****************
const element = <h1 className="testClass">Welcome to React Programmig..</h1>;

ReactDOM.render(element,document.getElementById("root"));

const newElement = <h1 className="testClass">UnderStanding react element</h1>;

ReactDOM.render(newElement,document.getElementById("root"));

const element=(
  <div className="testClass">
    <h1>Welcome to React...</h1>
    <h1>learning the react element</h1>
  </div>
);

ReactDOM.render(element,document.getElementById("root"));

### creating element without JSX*************


const element=React.createElement("h1",null,"welcome to react");

ReactDOM.render(element,document.getElementById("root"));


const element=React.createElement("div",{className:"testClass"},
React.createElement("h1",null,"welcome to react"),
React.createElement("h1",null,"understanding react")
);

ReactDOM.render(element,document.getElementById("root"));

*/

/*

### Function components***************

var DisplayEmployeeInfo=(employee)=>{
  return <div>
      <h1>Employee Information...</h1>
      <p>
        <label>Employee ID : <b>{employee.Id}</b></label>
      </p>
      <p>
        <label>Employee Name : <b>{employee.Name}</b></label>
      </p>
      <p>
        <label>Employee Location : <b>{employee.Location}</b></label>
      </p>
      <p>
        <label>Employee Salary : <b>{employee.Salary}</b></label>
      </p>
      <Department deptName={employee.deptName} 
      headName={employee.headName}>
      </Department>
    </div>;
}; 

const Department=(deptInfo)=>{
  return <div>
    <p>Dept Name is : <b>{deptInfo.deptName}</b></p>
    <p>Dept Head is : <b>{deptInfo.headName}</b></p>    
  </div>

}

const element = <DisplayEmployeeInfo Id="101"
 Name="Ajay" Location="Rajkot" Salary="120000" 
 deptName="Computer" headName="Abcd">
</DisplayEmployeeInfo>

ReactDOM.render(element,document.getElementById("root"));


*/



/*  ### class cpmponents***************


class Employee extends React.Component{
  render(){
    return <div>
        <h2>Employee Details....</h2>
        <p>
          <label>Employee Id : <b>{this.props.Id}</b></label>
        </p>
        <p>
          <label>Employee Name : <b>{this.props.Name}</b></label>
        </p><p>
          <label>Employee Location : <b>{this.props.Location}</b></label>
        </p><p>
          <label>Employee Salary : <b>{this.props.Salary}</b></label>
        </p>
        <Department deptName={this.props.deptName}
        deptHead={this.props.deptHead}>
        </Department>
      </div>
  };
};

class Department extends React.Component{
  render(){
    return <div>
    <p>Dept Name is : <b>{this.props.deptName}</b></p>
    <p>Dept Head is : <b>{this.props.deptHead}</b></p>    
  </div>

  }
}
const element = <Employee Id="101" Name="Ajay" 
Location="Rajkot" Salary="1200000" deptName="Computer"
deptHead="Abcd">
</Employee>;
 
ReactDOM.render(element,document.getElementById("root"));

*/


/*  #### state in react components*************


class CountCharacter extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message:""
    };
  }
  onMessageChange(text){
    this.setState({
      message:"Message has "+text.length+" number of characters"
    });
  }
  render(){
    return <div>
        <h2>Welcome to countCharacter Component..</h2>
        <p>
            <label>Enter Message : <input type="text" 
            onChange={e=>this.onMessageChange(e.target.value)}></input></label>
        </p>
        <p>
          <label>{this.state.message}</label>
        </p>

      </div>
  };
}

class Employee extends React.Component{
  state={counter:0};
  addEmployee=() => {
    this.setState({counter:this.state.counter+1});  
    //alert("Adding a new employee");
    //alert("add employee button is clicked " + this.counter +" times");
  }
  render(){
    return <div>
        <h2>Welcome to Employee component..</h2>
        <p>
          <button onClick={this.addEmployee}>Add Employee</button>
        </p>  
        <p>
          <label>add employee button is clicked <b>{this.state.counter}</b> times</label>
        </p>  
      </div>
  }
}

const element = <CountCharacter></CountCharacter>

ReactDOM.render(element,document.getElementById("root"));

*/

/* ###  interaction between react components*****************

class Employee extends React.Component{
  constructor(props){
    super(props);
    this.state={
      updatedSalary:null
    };
  }

  getUpdatedSalary=(salary)=>{
    this.setState({updatedSalary:salary});
  }
  render(){
    return <div>
        <h2>Employee Details....</h2>
        <p>
          <label>Employee Id : <b>{this.props.Id}</b></label>
        </p>
        <p>
          <label>Employee Name : <b>{this.props.Name}</b></label>
        </p><p>
          <label>Employee Location : <b>{this.props.Location}</b></label>
        </p><p>
          <label>Total Salary : <b>{this.props.Salary}</b></label>
        </p>
        <p>
          <label>Updated total salary : <b>{this.state.updatedSalary}</b></label>
        </p>
        <Salary BasicSalary={this.props.BasicSalary} 
        Hra={this.props.Hra} 
        SpecialAllowance={this.props.SpecialAllowance}
        onSalaryChanged={this.getUpdatedSalary}>
        </Salary>
      </div>
  };
};


class Salary extends React.Component{
  constructor(props){
    super(props);
    this.state={
      basic:this.props.BasicSalary,
      hra:this.props.Hra,
      sa:this.props.SpecialAllowance
    };
  }

  updatedSalary=()=>{
    let salary=parseInt(this.refs.basic.value) 
    + parseInt(this.refs.hra.value) 
    + parseInt(this.refs.sa.value);

    this.props.onSalaryChanged(salary);
  }

  render(){
    return <div>
        <h1>Salary Details...</h1>
        <p>
          <label>Basis Salary : <input tyoe="text" ref="basic" defaultValue={this.state.basic}></input> </label>
        </p>
        <p>
          <label>Hra : <input type="text" ref="hra" defaultValue={this.state.hra}></input></label>
        </p>
        <p>
          <label>Special Allowance : <input type="text" ref="sa" defaultValue={this.state.sa}></input></label>
        </p>
        <button onClick={this.updatedSalary}>Update</button>
        
      </div>
  };
}

const element=<Employee id="101" Name="Ajay" 
Location="Rajkot" Salary="1200000" 
BasicSalary="120000" Hra="25000"
 SpecialAllowance="10000"></Employee>

ReactDOM.render(element,document.getElementById("root"));


*/

/* ### comunication using contex*************


const employeeContext = React.createContext();

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      Id:101,
      Name:"Ajay",
      Location:"Rajkot",
      Salary:15000
    };
  }

  changeEmployeeData=()=>{
    this.setState({Id:102});
  }

  render(){
    return <div>
        <h2>Welcome to App Component..</h2>
        <p>
          <label>Employee Id : <b>{this.state.Id}</b></label>
        </p>
      
        <employeeContext.Provider value={this.state}>
          <Employee></Employee>
        </employeeContext.Provider>
        <p>
          <button onClick={this.changeEmployeeData}>Update</button>
        </p>
      </div>
  }
}

class Employee extends React.Component{

  static contextType = employeeContext;
  render(){
    return <div>
        <h2>Welcome to Employee Component..</h2>
        <p>
          <label>Employee Id : <b>{this.context.Id}</b></label>
        </p>
        <Salary></Salary>
      </div>
  }
}
class Salary extends React.Component{
  static contextType = employeeContext;
  render(){
    return <div>
        <h2>Welcome to Salary Component..</h2>
        <p>
          <label>Employee Id : <b>{this.context.Id}</b></label>
        </p>

      </div>
  }
}


const element = <App></App>

ReactDOM.render(element,document.getElementById("root"));

*/

/* ### interaction between react components*******************



const EmployeeContext = React.createContext({
  data: '',
  changeEmployeeInfo: () => {},
});

class App extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      data: {Id:101},
      changeEmployeeInfo:  this. updateEmployeeDetails,
    };
  }

  updateEmployeeDetails = () => {
    this.setState({ data:{Id:102} });
  };
  render() {
    return <div>
      <h2>Welcome to App Component</h2>
      <p>
        <label>Employee Id : <b>{this.state.data.Id}</b></label>
      </p>
      <EmployeeContext.Provider value={this.state}>
      <Employee />
        </EmployeeContext.Provider>      
        </div>
  }
}

class Employee extends React.Component {
  static contextType = EmployeeContext;
  render() {
    return <div>
      <h2>Welcome to Employee Component...</h2>
      <p>
        <label>Employee Id : <b>{this.context.data.Id}</b></label>
      </p>
      <p>
        <button onClick={this.context.changeEmployeeInfo}>Change</button>
      </p>

      </div>
  }
}

const element=<App/>
ReactDOM.render(element,document.getElementById('root'));

*/

function Employee(props){
  return <div style={{border:"3px solid red"}}>
       <p>
          <label>Employee Id : <b>{props.data.Id}</b></label>
        </p>
        <p>
          <label>Employee Name : <b>{props.data.Name}</b></label>
        </p><p>
          <label>Employee Location : <b>{props.data.Location}</b></label>
        </p><p>
          <label>Employee Salary : <b>{props.data.Salary}</b></label>
        </p>
    </div>
}

function DisplayEmployee(props){
  const empList = props.employeeList;
  );

  const listElements = empList.map((emp) =>
    <Employee key={emp.Id} data={emp}></Employee>

  );

  return (
    <div>
      {listElements}
    </div>
  );

}

const employees = [

  {Id:101,Name:'Abhinav',Location:'Bangalore',Salary:12345},

  {Id:102,Name:'Abhishek',Location:'Chennai',Salary:23456},

  {Id:103,Name:'Ajay',Location:'Bangalore',Salary:34567}

];

const element = <DisplayEmployee employeeList={employees}></DisplayEmployee>

ReactDOM.render(element,document.getElementById("root"));