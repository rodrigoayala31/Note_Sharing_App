import React from 'react';
import { db } from "./config/firebase-config";
import './Dashboard.css';
// import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: []
        };
    }

    componentDidMount(){
        db.collection("notes").get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data);
            this.setState({ notes: data });
        });
        
    }

    render() {

        // if (!this.props.loggedIn) {
        //     return <Redirect to='/' />
        //   }

        return (
            <div className='dashboard'>
                <h1>Notes</h1>
                {
                    this.state.notes && 
                    this.state.notes.map( note => {
                        if (note.pdfType === true){
                            return (
                                <div className='content'>
                                    <p>{note.collegeName}</p>
                                    <p>{note.courseName}</p>
                                    <p>{note.description}</p>
                                    <p>{note.topic}</p>
                                    <embed src={note.url} width= "500" height= "600"></embed>
                                </div>
                            )
                        } else {
                            return (
                                <div className='content'>
                                    <p>{note.collegeName}</p>
                                    <p>{note.courseName}</p>
                                    <p>{note.description}</p>
                                    <p>{note.topic}</p>
                                    <img src={note.url} alt='note' />
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

}

export default Dashboard;
