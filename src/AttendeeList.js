import React from 'react';
import './App.css';

class AttendeeList extends React.Component {
  render() {
    return (
      <div className="card card-nav-tabs col-lg-mod-3 col-md-12 col-sm-12">
        <div className="card-header card-header-danger">
          <p style={{marginBottom:'0px'}}>Attendees</p>
        </div>
        <ul id="attendee_list" className="list-group list-group-flush">
          {
            this.props.cardreader_statuses
            .filter(status => status.status !== 'unoccupied')
            .map(status => {
              return (
                <li
                  key={status.cardreaderid}
                  className="list-group-item"
                  onMouseEnter={e=>this.props.handleHover(status.cardreaderid,true)}
                  onMouseLeave={e=>this.props.handleHover(status.cardreaderid,false)}
                  style={status.status === 'selected' ? {backgroundColor:'lightgray'} : {}}
                >
                  {status.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default AttendeeList;
