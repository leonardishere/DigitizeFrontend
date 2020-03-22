import React from 'react';

function ActiveCheckinTable(props){
  return (
    <div className="card card-nav-tabs col-lg-12 col-md-12 col-sm-12">
      <div className="card-header card-header-danger">
        <p style={{marginBottom:'0px'}}>Active Checkins</p>
      </div>
      <div className="container">
        {
          props.checkins.length === 0 ? <h3>No active checkins</h3> :
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Card Reader</th>
              </tr>
            </thead>
            <tbody>
              {
                props.checkins.map((row,i)=>{
                  return (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
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

function InactiveCheckinTable(props){
  return (
    <div className="card card-nav-tabs col-lg-12 col-md-12 col-sm-12">
      <div className="card-header card-header-danger">
        <p style={{marginBottom:'0px'}}>Inactive Checkins</p>
      </div>
      <div className="container">
        {
          props.checkins.length === 0 ? <h3>No inactive checkins</h3> :
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Card Reader</th>
              </tr>
            </thead>
            <tbody>
              {
                props.checkins.map((row,i)=>{
                  return (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
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
