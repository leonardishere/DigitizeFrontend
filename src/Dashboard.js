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
        status: 'occupied',
        name: this.props.checkins[i].Student.Name
      };
    }
    this.state = { cardreader_statuses: cardreader_statuses };
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(cardreaderid, hover){
    if(0 <= cardreaderid && cardreaderid < 52){
      var cardreader_statuses = this.state.cardreader_statuses;
      cardreader_statuses[cardreaderid].status = hover ? 'selected' : 'occupied';
      this.setState({cardreader_statuses:cardreader_statuses});
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <ClassroomMap cardreader_statuses={this.state.cardreader_statuses} handleHover={this.handleHover}/>
          <Spacer/>
          <AttendeeList cardreader_statuses={this.state.cardreader_statuses} handleHover={this.handleHover}/>
          <Spacer/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
