import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import './MySidebar.css';

class MySidebar extends React.Component {
  render() {
    var insides = (
      <div className="my_sidebar">
        <div className="logo">
          {/*eslint-disable-next-line*/}
          <a className="simple-text logo-normal">Digitize</a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active" onClick={this.props.clickDashboard}>
              {/*eslint-disable-next-line*/}
              <a className="nav-link">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item active" onClick={this.props.clickHistory}>
              {/*eslint-disable-next-line*/}
              <a className="nav-link">
                <i className="material-icons">calendar_today</i>
                <p>History</p>
              </a>
            </li>
            <li className="nav-item active" onClick={this.props.clickStudents}>
              {/*eslint-disable-next-line*/}
              <a className="nav-link">
                <i className="material-icons">face</i>
                <p>Students</p>
              </a>
            </li>
            <li id="dismiss_class_btn" className="nav-item active" onClick={this.props.dismissClass}>
              {/*eslint-disable-next-line*/}
              <a className="nav-link">
                <i className="material-icons">exit_to_app</i>
                <p>Dismiss Class</p>
              </a>
            </li>
            <li id="dismiss_class_btn" className="nav-item active" onClick={this.props.checkin}>
              {/*eslint-disable-next-line*/}
              <a className="nav-link">
                <i className="material-icons">exit_to_app</i>
                <p>Checkin</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );

    return (
      <div className="sidebar" data-background-color="white">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={this.props.mobileOpen}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {insides}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor={"left"}
            variant="permanent"
            open
          >
            {insides}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

export default MySidebar;
