import React from 'react';

class Students extends React.Component {
  render(){
    return (
      <div className="card card-nav-tabs col-lg-12 col-md-12 col-sm-12">
        <div className="card-header card-header-danger">
          <p style={{marginBottom:'0px'}}>Students</p>
        </div>
        <div className="container">
          {
            this.props.students.length === 0 ? <h3>No students</h3> :
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Card ID</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.students.map((student,i)=>{
                    return (
                      <tr key={student.StudentID}>
                        <td>{student.Name}</td>
                        <td>{student.StudentID}</td>
                        <td>{student.CardID}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          }
        </div>
      </div>
    )
  }
}

export default Students;
