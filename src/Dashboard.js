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
    this.state = { hover: -1 };
    this.recreateState = this.recreateState.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  recreateState(checkins){
    var cardreader_statuses = [];
    for(var i = 0; i < 52; ++i){
      cardreader_statuses.push({
        cardreaderid: i,
        status: 'unoccupied',
        name: ''
      });
    }
    for(i = 0; i < this.props.checkins.length; ++i){
      cardreader_statuses[this.props.checkins[i].CardReaderID] = {
        cardreaderid: this.props.checkins[i].CardReaderID,
        status: this.state.hover === this.props.checkins[i].CardReaderID ? 'selected' : 'occupied',
        name: this.props.checkins[i].Student.Name
      };
    }
    return cardreader_statuses;
  }

  handleHover(cardreaderid, hover){
    if(cardreaderid < 0 || cardreaderid >= 52 || !hover){
      this.setState({ hover: -1 });
      return;
    }
    this.setState({ hover: cardreaderid });
  }

  render() {
    var cardreader_statuses = this.recreateState(this.props.checkins);
    return (
      <div className="container-fluid">
        <div className="row">
          <ClassroomMap cardreader_statuses={cardreader_statuses} handleHover={this.handleHover}/>
          <Spacer/>
          <AttendeeList cardreader_statuses={cardreader_statuses} handleHover={this.handleHover}/>
          <Spacer/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
