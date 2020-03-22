import React from 'react';
import './App.css';
import picture from './img/kenna6.png';

class ClassroomMap extends React.Component {
  render(){
    var coords = [[135,255],[149,222],[171,194],[200,170],[232,154],[271,143],[87,214],[102,188],[121,165],[141,143],[166,124],[192,108],[221,96],[251,86],[281,82],[36,191],[55,154],[83,122],[109,95],[137,75],[167,53],[203,42],[239,29],[277,25],[34,88],[65,56],[339,139],[375,150],[410,165],[439,189],[463,216],[481,247],[336,81],[369,88],[400,97],[426,109],[452,125],[475,143],[496,166],[515,190],[529,216],[339,26],[379,33],[416,43],[451,58],[480,75],[509,99],[535,123],[560,155],[579,189],[545,55],[581,85]];

    return (
      <div className="card card-nav-tabs col-lg-mod-9 col-md-12 col-sm-12">
        <div className="card-header card-header-danger">
          <p style={{marginBottom:'0px'}}>Kenna 104</p>
        </div>
        <div className="container">
          <img src={picture} alt="A map of Kenna 104" style={{width:'100%'}}/>
          <div className="overlay">
            <svg viewBox="0 0 612 320" id="svg">
              {
                this.props.cardreader_statuses.map((status,i)=>{
                  if(status.status === 'unoccupied') return (
                    <circle
                      key={status.cardreaderid}
                      cx={coords[i][0]}
                      cy={coords[i][1]}
                      r="10" stroke="black" strokeWidth="1" fill="white"
                    />
                  )
                  else return (
                    <circle
                      key={status.cardreaderid}
                      cx={coords[i][0]}
                      cy={coords[i][1]}
                      r="10" stroke="black" strokeWidth="1"
                      fill={ status.status === 'occupied' ? 'green' : 'blue' }
                      onMouseEnter={e=>this.props.handleHover(status.cardreaderid,true)}
                      onMouseLeave={e=>this.props.handleHover(status.cardreaderid,false)}
                    />
                  )
                })
              }
            </svg>
          </div>
          <div id="hidden_element" style={{display:'hidden',width:0,height:0}}></div>
        </div>
      </div>
    )
  }
}

export default ClassroomMap;
