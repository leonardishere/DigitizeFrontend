import React from 'react';
import './material-dashboard.min.css';
import './App.css';

import MySidebar from './MySidebar.js';
import MyNav from './MyNav.js';
import Dashboard from './Dashboard.js';
import History from './History.js';
import Students from './Students.js';

const axios = require('axios');

function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid"></div>
    </footer>
  )
}

function Loading() {
  return (
    <center><h1>Loading...</h1></center>
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: 'loading',
      checkins: [],
      students: []
    };
    this.loadData = this.loadData.bind(this);
    this.clickDashboard = this.clickDashboard.bind(this);
    this.clickHistory = this.clickHistory.bind(this);
    this.clickStudents = this.clickStudents.bind(this);
    this.dismissClass = this.dismissClass.bind(this);
    this.loadData();
  }

  loadData(){
    var get_checkins_url = "https://digitize-api1.aleonard.dev/checkins/active/";
    axios.get(get_checkins_url)
    .then(res => {
      this.setState({
        selected: 'dashboard',
        checkins: res.data
      });
    })
    .catch(err => console.error(err));

    var get_students_url = "https://digitize-api1.aleonard.dev/students/";
    axios.get(get_students_url)
    .then(res => {
      this.setState({
        students: res.data
      });
    })
    .catch(err => console.error(err));
  }

  clickDashboard(){
    this.setState({selected: 'dashboard'});
  }

  clickHistory(){
    this.setState({selected: 'history'});
  }

  clickStudents(){
    this.setState({selected: 'students'});
  }

  dismissClass(){
    var dismiss_class_url = "https://digitize-api1.aleonard.dev/checkout/";
    axios.post(dismiss_class_url)
    .then(res => {
      for(var i = 0; i < res.data.length; ++i){
        console.log(res.data[i].msgType + ': ' + res.data[i].msg);
      }
      console.log(this.state);
      this.setState({ checkins: [] });
      console.log(this.state);
    })
    .catch(err => console.error(err));
  }

  render() {
    var element = null;
    if(this.state.selected === 'loading') element = <Loading/>;
    else if(this.state.selected === 'dashboard') element = <Dashboard checkins={this.state.checkins}/>;
    else if(this.state.selected === 'history') element = <History checkins={this.state.checkins}/>;
    else if(this.state.selected === 'students') element = <Students students={this.state.students}/>;

    return (
      <div>
        <div className="wrapper menu-on-left">
          <MySidebar
            clickDashboard={this.clickDashboard}
            clickHistory={this.clickHistory}
            clickStudents={this.clickStudents}
            dismissClass={this.dismissClass}
          />
          <div className="main-panel">
            <MyNav/>
            <div className="content">
              {element}
            <Footer/>
            </div>
          </div>
        </div>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"/>
      </div>
    )
  }
}

export default App;
