import React from 'react';

import Card from './components/Card/Card.jsx';
import CardHeader from './components/Card/CardHeader.jsx';
import CardBody from './components/Card/CardBody.jsx';
import Table from './components/Table/Table.jsx';

function ActiveCheckinTable(props){
  return (
    <Card className="col-12">
      <CardHeader color="danger">
        <p style={{marginBottom:'0px'}}>Active Checkins</p>
      </CardHeader>
      <CardBody>
        {
          props.checkins.length === 0 ? <p style={{paddingLeft:"8px",paddingTop:"12px"}}>No active checkins</p> :
          <Table
            tableHeaderColor="primary"
            tableHead={['Name', 'Cardreader', 'Time']}
            tableData={
              props.checkins.map(checkin=>{
                return [
                  checkin.Student.Name,
                  checkin.CardReaderID.toString(),
                  new Date(checkin.CheckinTime).toLocaleTimeString()
                ];
              })
            }
          />
        }
      </CardBody>
    </Card>
  )
}

function InactiveCheckinTable(props){
  return (
    <Card className="col-12">
      <CardHeader color="danger">
        <p style={{marginBottom:'0px'}}>Inactive Checkins</p>
      </CardHeader>
      <CardBody>
        {
          props.checkins.length === 0 ? <p style={{paddingLeft:"8px",paddingTop:"12px"}}>No inactive checkins</p> :
          <Table
            tableHeaderColor="primary"
            tableHead={['Name', 'Time In', 'Time Out']}
            tableData={
              props.checkins.map(checkin=>{
                return [
                  checkin.Student.Name,
                  new Date(checkin.CheckinTime).toLocaleTimeString(),
                  new Date(checkin.CheckoutTime).toLocaleTimeString()
                ];
              })
            }
          />
        }
      </CardBody>
    </Card>
  )
}

function Spacer(){
  return (
    <div style={{height:'8px'}}/>
  )
}

class History extends React.Component {
  render(){
    return (
      <div>
        <ActiveCheckinTable checkins={this.props.checkins}/>
        <Spacer/>
        <InactiveCheckinTable checkins={[]}/>
      </div>
    )
  }
}

export default History;
