// import React , { Component } from 'react';
// import './App.css';
// import fire from './fire';
// class App extends Component {

import { Outlet } from "react-router-dom"

//   state={
//     text : ""
//   }

//   handleText=e=>{
//     this.setState({
//       text : e.target.value
//     })
//   }

//   handleSubmit=e=>{
//     let messageRef = fire.database().ref('message').orderByKey().limitToLast(100);
//     fire.database().ref('message').push(this.state.text);
//     this.setState({
//       text : ""
//     })
//   }


//   render() {
//   return (
//     <div className="App">
//       <input type="text" onChange={this.handleText} id="inputText"></input>
//       <button onClick={this.handleSubmit}>Upload Notes</button>
//     </div>
//   );
//   }
// }

// export default App;
const App = () => {
  return <div>
    THIS IS THE APP COMPONENT
    <Outlet/>
  </div>
}
export default App
