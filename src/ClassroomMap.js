import React from 'react';
import picture from './img/kenna6.png';

import Card from './components/Card/Card.jsx';
import CardHeader from './components/Card/CardHeader.jsx';
import CardBody from './components/Card/CardBody.jsx';

import StudentIcon from './StudentIcon.js';

import './ClassroomMap.css';



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
        name: '',
        cardid: ''
      });
    }
    for(i = 0; i < this.props.checkins.length; ++i){
      if(this.props.checkins[i].CardReaderID < 0 || this.props.checkins[i].CardReaderID >= 52) continue;
      cardreader_statuses[this.props.checkins[i].CardReaderID] = {
        cardreaderid: this.props.checkins[i].CardReaderID,
        status: this.props.selected === this.props.checkins[i].CardReaderID ? 'selected' : 'occupied',
        name: this.props.checkins[i].Student.Name,
        cardid: this.props.checkins[i].CardID
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
                  cardreader_statuses.map((status,i) => <StudentIcon status={status} key={i} handleHover={this.props.handleHover}/>)
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
