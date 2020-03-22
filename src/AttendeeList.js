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
        </CardBody>
      </Card>
    )
  }
}

export default AttendeeList;
