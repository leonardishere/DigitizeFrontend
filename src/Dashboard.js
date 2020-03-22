import React from 'react';
import ClassroomMap from './ClassroomMap.js';
import AttendeeList from './AttendeeList.js';

function Spacer() {
  return (
    <div className="col-lg-mod-1"></div>
  )
}

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = { selected: -1 };
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(cardreaderid, hover){
    if(cardreaderid < 0 || cardreaderid >= 52 || !hover){
      this.setState({ selected: -1 });
      return;
    }
    this.setState({ selected: cardreaderid });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <ClassroomMap checkins={this.props.checkins} selected={this.state.selected} handleHover={this.handleHover}/>
          <Spacer/>
          <AttendeeList checkins={this.props.checkins} selected={this.state.selected} handleHover={this.handleHover}/>
          <Spacer/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
