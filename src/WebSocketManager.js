class WebSocketManager{
  constructor(app){
    this.app = app;
    this.onmessage = this.onmessage.bind(this);
    this.handle_data = this.handle_data.bind(this);
    this.add_students = this.add_students.bind(this);
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
    console.log(message.data);
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
    }
    this.app.showNotification(json.msgType, json.msg);
    if(json.hasOwnProperty('data')){
      this.handle_data(json['data']);
    }
  }

  handle_data(data){
    if(data.hasOwnProperty('students_added')){
      this.add_students(data['students_added']);
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
    this.app.setState({students: new_students});
  }
}

export default WebSocketManager;
