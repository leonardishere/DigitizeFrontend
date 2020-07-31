import React from 'react';
import picture from './img/kenna6.png';

import Card from './components/Card/Card.jsx';
import CardHeader from './components/Card/CardHeader.jsx';
import CardBody from './components/Card/CardBody.jsx';

import './ClassroomMap.css';

const chair_coords = [[135,255],[149,222],[171,194],[200,170],[232,154],[271,143],[87,214],[102,188],[121,165],[141,143],[166,124],[192,108],[221,96],[251,86],[281,82],[36,191],[55,154],[83,122],[109,95],[137,75],[167,53],[203,42],[239,29],[277,25],[34,88],[65,56],[339,139],[375,150],[410,165],[439,189],[463,216],[481,247],[336,81],[369,88],[400,97],[426,109],[452,125],[475,143],[496,166],[515,190],[529,216],[339,26],[379,33],[416,43],[451,58],[480,75],[509,99],[535,123],[560,155],[579,189],[545,55],[581,85]];

const desk_paths = [
  "M 56 124 C 71 106 89 88 111 70 L 100 55 C 78 72 58 91 41 113 Z",
  "M 51 207 C 94 113 174 57 296 39 L 296 60 C 181 76 107 128 67 218 Z",
  "M 296 97 C 206 105 142 150 102 231 L 118 242 C 162 164 220 124 296 117 Z",
  "M 296 173 C 237 180 194 214 166 272 L 149 263 C 175 203 224 164 296 153 Z",

  "M 507 68 C 528 84 547 103 564 124 L 580 114 C 562 91 542 72 519 54 Z",
  "M 327 39 C 440 51 521 107 570 207 L 553 215 C 504 120 429 68 327 60 Z",
  "M 327 96 C 422 109 485 154 517 232 L 500 239 C 463 164 405 123 327 117 Z",
  "M 327 153 C 403 165 451 205 472 272 L 455 277 C 435 219 393 185 327 174 Z",

  "M 271 272 L 348 273 L 348 238 L 271 238 Z"
];

class ClassroomMap extends React.Component {
  render(){
    var cardreader_statuses = [];
    for(var i = 0; i < 52; ++i){
      cardreader_statuses.push({
        cardreaderid: i,
        status: 'unoccupied',
        name: ''
      });
    }
    for(i = 0; i < this.props.checkins.length; ++i){
      if(this.props.checkins[i].CardReaderID < 0 || this.props.checkins[i].CardReaderID >= 52) continue;
      cardreader_statuses[this.props.checkins[i].CardReaderID] = {
        cardreaderid: this.props.checkins[i].CardReaderID,
        status: this.props.selected === this.props.checkins[i].CardReaderID ? 'selected' : 'occupied',
        name: this.props.checkins[i].Student.Name
      };
    }

    return (
      <Card className="col-lg-mod-9 col-md-12 col-sm-12 classroom_map">
        <CardHeader color="danger">
          <p className="card_title_text">Kenna 104</p>
        </CardHeader>
        <CardBody>
          <img src={picture} alt="A map of Kenna 104" className="background_img"/>
          <div className="overlay">
            <svg viewBox="0 0 612 320" id="svg">
              <g className="desks">
                {
                  desk_paths.map((path,i) => <path d={path} key={i}></path>)
                }
              </g>
              <g className="chairs">
                {
                  cardreader_statuses.map((status,i)=>{
                    if(status.status === 'unoccupied') return (
                      <circle
                        key={status.cardreaderid}
                        cx={chair_coords[i][0]}
                        cy={chair_coords[i][1]}
                        r="10" stroke="black" strokeWidth="1" fill="white"
                      />
                    )
                    else {
                      var transform = "translate(" + (chair_coords[i][0]-10) + " " + (chair_coords[i][1]-10) + ") scale(0.0403 0.0391)"
                      return (
                        <g
                          key={i}
                          onMouseEnter={e=>this.props.handleHover(status.cardreaderid,true)}
                          onMouseLeave={e=>this.props.handleHover(status.cardreaderid,false)}>
                          <circle
                            key={status.cardreaderid}
                            cx={chair_coords[i][0]}
                            cy={chair_coords[i][1]}
                            r="9" stroke="black" strokeWidth="1"
                            fill={ status.status === 'occupied' ? 'yellow' : 'green' }
                          />
                          <path transform={transform} d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.1 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-235.9-72.9c3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3zm160 0c3.5 1.1 7.4-.5 9.3-3.7l9.5-17c7.7-13.7 19.2-21.6 31.5-21.6s23.8 7.9 31.5 21.6l9.5 17c2.1 3.7 6.2 4.7 9.3 3.7 3.6-1.1 6-4.5 5.7-8.3-3.3-42.1-32.2-71.4-56-71.4s-52.7 29.3-56 71.4c-.3 3.7 2.1 7.2 5.7 8.3z"></path>
                        </g>
                      )
                    }
                  })
                }
              </g>
            </svg>
          </div>
        </CardBody>
      </Card>
    )
  }
}

export default ClassroomMap;
