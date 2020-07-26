import './Add.css';
import { db } from "./config/firebase-config";
import React from "react";
import firebase from "./config/firebase-config"

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      topic: "",
      description: "",
      collegeName: "",
      courseName: "",
      pdfType: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const fileRef = this.inputRef.current.files[0]; 
    var date = new Date();
    var time = date.getTime();
    var storageRef = firebase.storage().ref();
    const fileName = fileRef.name + time;
    var uploadTask = storageRef.child('notes/' + fileName).put(fileRef);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        //progress function
      }, 
      (error) => {
        console.log(error);
      }, 
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        var pdfType = null;
        if (fileRef.name.indexOf("pdf") !== -1) {
          pdfType = true;
        }
        db.collection("notes").add({
          topic: this.state.topic,
          description: this.state.description,
          collegeName: this.state.collegeName,
          courseName: this.state.courseName,
          url: downloadURL,
          pdfType: pdfType,
        })
        this.setState({
          topic: "",
          description: "",
          collegeName: "",
          courseName: "",
       })
      });
    });
  }


  render() {
    return (
      <div className="add-page">
        <div className="add-form-wrapper">
        <h1>Add a Note</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>Select and image or a PDF</p>
            <input type="file" name="noteFile" accept="image/*, .pdf" className="inputFile" ref={this.inputRef} />
          </div>
          <div>
            <input type="text" name="topic" placeholder='Topic' className="topic, input-add" value={this.state.topic} onChange={event => this.handleChange(event, "topic")} />
          </div>
          <div>
            <input type="text" name="collegeName" placeholder='College Name' className="collegeName, input-add" value={this.state.collegeName} onChange={event => this.handleChange(event, "collegeName")} />
          </div>
          <div> 
            <input type="text" name="courseName" placeholder='Course Name' className="courseName, input-add" value={this.state.courseName} onChange={event => this.handleChange(event, "courseName")} />
          </div>
          <div>
            <textarea className='description, add-textarea' placeholder='Add a brief description of the note' value={this.state.description} onChange={event => this.handleChange(event, "description")}></textarea>
          </div>
          <div className="submit">
            <button type="submit">Add Your Note</button>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
  
  export default Add;