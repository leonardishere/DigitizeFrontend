import React from 'react';

import Card from './components/Card/Card.jsx';
import CardHeader from './components/Card/CardHeader.jsx';
import CardBody from './components/Card/CardBody.jsx';
import Table from './components/Table/Table.jsx';

class Students extends React.Component {
  render(){
    return (
      <Card className="col-12">
        <CardHeader color="danger">
          <p className="card_title_text">Students</p>
        </CardHeader>
        <CardBody>
          {
            this.props.students.length === 0 ? <p style={{paddingLeft:"8px",paddingTop:"12px"}}>No students</p> :
            <Table
              tableHeaderColor="primary"
              tableHead={['Name', 'Student ID', 'Card ID']}
              tableData={
                this.props.students.map(student=>{
                  return [student.Name, student.StudentID, student.CardID];
                })
              }
            />
          }
        </CardBody>
      </Card>
    )
  }
}

export default Students;
