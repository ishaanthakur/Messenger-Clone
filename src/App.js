import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input} from '@material-ui/core';
import Message from './Message';
import "./App.css";
import db from './firebase';
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState(''); 
  const [messages, setMessages] = useState([]); //need object messages
  const [username, setUsername] = useState('');
  //useEffect loads after component which in this case is App
  //useEffect snippet of code that gets executed after a condition

  useEffect(() => {
  //run when app component loads
  db.collection('messages')
  .orderBy('timestamp', 'desc')
  .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])


  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])

  const sendMessage = (ev) =>{
      //logic for sending messages
      ev.preventDefault(); //prevent automatic reresh of browser insode of form 

      db.collection('messages').add({
        message: input,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
   
      setInput('');

  }
  return (
    <div className="App">

      <img src = "https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1> Facebook Messenger </h1>
      {/* <h5><em> Welcome {username}</em></h5> */}
      <form className="app_form"> 
        <FormControl className="app_formControl">
          <Input className="app_input" placeholder= "Type a message ..."value = {input} onChange = {ev => setInput(ev.target.value)} />
          <IconButton className="app_iconButton" disabled={!input} variant="contained" color = "primary" type = 'submit' onClick = {sendMessage} >
            <SendIcon />
          </IconButton>


          {/* <Button disabled={!input} variant="contained" color = "primary" type = 'submit' onClick = {sendMessage}> Send message</Button> */}
        </FormControl> 
      </form>


      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key= {id} username = {username} message = {message}  />
       
        ))
      }
      </FlipMove>
  
    </div>
  );
}

export default App;
