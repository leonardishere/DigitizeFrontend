import React from 'react';

class MySidebar extends React.Component {
  render() {
    return (
      <div className="sidebar" data-background-color="white">
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
                <i className="material-icons">calendar_today</i>
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
            <li id="dismiss_class_btn" className="nav-item active" onClick={()=>console.log('clicked checkin')}>
              {/*eslint-disable-next-line*/}
              <a className="nav-link">
                <i className="material-icons">exit_to_app</i>
                <p>Checkin</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MySidebar;
