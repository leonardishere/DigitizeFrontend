import React from 'react';

import Card from './components/Card/Card.jsx';
import CardHeader from './components/Card/CardHeader.jsx';
import CardBody from './components/Card/CardBody.jsx';

class AttendeeList extends React.Component {
  render() {
    return (
      <Card className="col-lg-mod-3 col-md-12 col-sm-12">
        <CardHeader color="danger">
          <p style={{marginBottom:'0px'}}>Attendees</p>
        </CardHeader>
        <CardBody>
          <ul id="attendee_list" className="list-group list-group-flush">
            {
              this.props.checkins.map(checkin => {
                return (
                  <li
                    key={checkin.CardReaderID}
                    className="list-group-item"
                    onMouseEnter={e=>this.props.handleHover(checkin.CardReaderID,true)}
                    onMouseLeave={e=>this.props.handleHover(checkin.CardReaderID,false)}
                    style={checkin.CardReaderID > 0 && this.props.selected === checkin.CardReaderID ? {backgroundColor:'lightgray'} : {}}
                  >
                    {checkin.Student.Name}
                  </li>
                )
              })
            }
          </ul>
        </CardBody>
      </Card>
    )
  }
}

export default AttendeeList;
