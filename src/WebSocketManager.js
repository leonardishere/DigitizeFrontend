class WebSocketManager{
  constructor(app){
    this.app = app;
    this.onmessage = this.onmessage.bind(this);
    this.handle_data = this.handle_data.bind(this);
    this.add_students = this.add_students.bind(this);
    this.move_students = this.move_student.bind(this);
    this.checkin = this.checkin.bind(this);
    this.checkout = this.checkout.bind(this);
    this.checkout_all = this.checkout_all.bind(this);
    this.openSocket();
  }

  openSocket(){
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    var connection = new WebSocket('wss://digitize-api2.aleonard.dev/');
    connection.onopen = () => {}
    connection.onerror = (error) => {}
    connection.onmessage = this.onmessage;
    connection.onclose = () => { this.openSocket(); }
  }

  onmessage(message){
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.error('Invalid JSON: ', message.data);
      return;
    }
    for(var i = 0; i < json.length; ++i){
      var row = json[i];
      this.app.showNotification(row.msgType, row.msg);
      if(row.hasOwnProperty('data')){
        this.handle_data(row['data']);
      }
    }
  }

  handle_data(data){
    if(data.hasOwnProperty('students_added')){
      this.add_students(data['students_added']);
    }
    if(data.hasOwnProperty('move')){
      this.move_student(data['move']);
    }
    if(data.hasOwnProperty('checkout')){
      this.checkout(data['checkout']);
    }
    if(data.hasOwnProperty('checkin')){
      this.checkin(data['checkin']);
    }
    if(data.hasOwnProperty('checkout_all')){
      this.checkout_all(data['checkout_all']);
    }
  }

  add_students(students){
    var new_students = this.app.state['students'];
    for(var i = 0; i < students.length; ++i){
      new_students.push(students[i]);
    }
    new_students.sort((student1,student2)=>{
      if(student1['Name'] > student2['Name']) return 1;
      if(student1['Name'] < student2['Name']) return -1;
      return 0;
    });
    this.app.setState({'students': new_students});
  }

  move_student(student){
    var new_checkins = this.app.state['active_checkins'];
    new_checkins.filter(checkin => checkin['CardReaderID'] !== student['NewCardReaderID']);
    for(var i = 0; i < new_checkins.length; ++i){
      if(new_checkins[i]['CardReaderID'] === student['OldCardReaderID']){
        new_checkins[i]['CardReaderID'] = student['NewCardReaderID'];
        break;
      }
    }
    new_checkins.sort((checkin1, checkin2) => {
      if(checkin1['CardReaderID'] > checkin2['CardReaderID']) return 1;
      if(checkin1['CardReaderID'] < checkin2['CardReaderID']) return -1;
      return 0;
    });
    this.app.setState({'active_checkins': new_checkins});
  }

  checkin(checkin){
    var new_checkins = this.app.state['active_checkins'];
    new_checkins.push(checkin);
    new_checkins.sort((checkin1, checkin2) => {
      if(checkin1['CardReaderID'] > checkin2['CardReaderID']) return 1;
      if(checkin1['CardReaderID'] < checkin2['CardReaderID']) return -1;
      return 0;
    });
    this.app.setState({'active_checkins': new_checkins});
  }

  checkout(checkout){
    var new_active_checkins = this.app.state['active_checkins'];
    var new_inactive_checkins = this.app.state['inactive_checkins'];
    checkout['CardReaderID'] = parseInt(checkout['CardReaderID']);
    var active_checkin_index = new_active_checkins.findIndex(checkin => checkin['CardReaderID'] === checkout['CardReaderID']);
    if(active_checkin_index < 0) return;
    var new_inactive_checkin = new_active_checkins[active_checkin_index];
    new_inactive_checkin['CheckoutTime'] = checkout['CheckoutTime']
    new_inactive_checkin['StudentID'] = new_inactive_checkin['Student']['StudentID']
    new_inactive_checkins.unshift(new_inactive_checkin);
    new_active_checkins.splice(active_checkin_index, 1);
    new_active_checkins.sort((checkin1, checkin2) => {
      if(checkin1['CardReaderID'] > checkin2['CardReaderID']) return 1;
      if(checkin1['CardReaderID'] < checkin2['CardReaderID']) return -1;
      return 0;
    });
    // no need to sort checkouts, new checkouts go in front
    this.app.setState({
      'active_checkins': new_active_checkins,
      'inactive_checkins': new_inactive_checkins
    });
  }

  checkout_all(checkout){
    var active_checkins = this.app.state['active_checkins'];
    var inactive_checkins = this.app.state['inactive_checkins'];
    for(var i = 0; i < active_checkins.length; ++i){
      active_checkins[i]['CheckoutTime'] = checkout['CheckoutTime'];
      active_checkins[i]['StudentID'] = active_checkins[i]['Student']['StudentID'];
      inactive_checkins.unshift(active_checkins[i]);
    }
    this.app.setState({
      'active_checkins': [],
      'inactive_checkins': inactive_checkins
    });
  }
}

export default WebSocketManager;
