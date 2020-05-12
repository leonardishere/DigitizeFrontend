import React from 'react';
import './material-dashboard.min.css';
import './App.css';

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
//core components
import Snackbar from "./components/Snackbar/Snackbar.jsx";

import MySidebar from './MySidebar.js';
import MyNav from './MyNav.js';
import Dashboard from './Dashboard.js';
import History from './History.js';
import Students from './Students.js';
import WebSocketManager from './WebSocketManager.js';

const axios = require('axios');

const Footer = () => <footer className="footer"><div className="container-fluid"></div></footer>

const Loading = () => <center><h1>Loading...</h1></center>

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: 'loading',
      active_checkins: [],
      inactive_checkins: [],
      students: [],
      mobileOpen: false,
      notificationOpen: false,
      notificationType: 'info',
      notificationText: ''
    };
    this.loadData = this.loadData.bind(this);
    this.clickDashboard = this.clickDashboard.bind(this);
    this.clickHistory = this.clickHistory.bind(this);
    this.clickStudents = this.clickStudents.bind(this);
    this.dismissClass = this.dismissClass.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.loadData();
    this.websocketmanager = new WebSocketManager(this);
  }

  loadData(){
    var get_active_checkins_url = "https://digitize-api1.aleonard.dev/checkins/active/";
    axios.get(get_active_checkins_url)
    .then(res => {
      this.setState({
        selected: 'dashboard',
        active_checkins: res.data
      });
    })
    .catch(err => console.error(err));

    var get_inactive_checkins_url = "https://digitize-api1.aleonard.dev/checkins/inactive/";
    axios.get(get_inactive_checkins_url)
    .then(res => {
      this.setState({
        inactive_checkins: res.data
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
    this.setState({selected: 'dashboard', mobileOpen: false});
  }

  clickHistory(){
    this.setState({selected: 'history', mobileOpen: false});
  }

  clickStudents(){
    this.setState({selected: 'students', mobileOpen: false});
  }

  dismissClass(){
    var dismiss_class_url = "https://digitize-api1.aleonard.dev/checkout/";
    axios.post(dismiss_class_url)
    .then(res => {
      this.setState({ checkins: [], mobileOpen: false });
    })
    .catch(err => console.error(err));
  }

  showNotification(msgType, msg){
    if(!(["info","success","warning","danger","primary"].includes(msgType))) msgType='info'
    this.setState({
      notificationOpen: true,
      notificationType: msgType,
      notificationText: msg
    });
    setTimeout(function(){
        this.setState({notificationOpen: false});
    }.bind(this),4000);
  }

  handleDrawerToggle(){
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    var element = null;
    if(this.state.selected === 'loading') element = <Loading/>;
    else if(this.state.selected === 'dashboard') element = <Dashboard checkins={this.state.active_checkins}/>;
    else if(this.state.selected === 'history') element = <History active_checkins={this.state.active_checkins} inactive_checkins={this.state.inactive_checkins}/>;
    else if(this.state.selected === 'students') element = <Students students={this.state.students}/>;

    return (
      <div>
        <div className="wrapper menu-on-left">
          <MySidebar
            clickDashboard={this.clickDashboard}
            clickHistory={this.clickHistory}
            clickStudents={this.clickStudents}
            dismissClass={this.dismissClass}
            showNotification={this.showNotification}
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
          />
          <div className="main-panel">
            <MyNav handleDrawerToggle={this.handleDrawerToggle}/>
            <div className="content">
              {element}
            <Footer/>
            </div>
          </div>
        </div>
        <Snackbar
            place='tr'
            color={this.state.notificationType}
            icon={AddAlert}
            message={this.state.notificationText}
            open={this.state.notificationOpen}
            closeNotification={() => this.setState({notificationOpen:false})}
            close
        />
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"/>
      </div>
    )
  }
}

export default App;
