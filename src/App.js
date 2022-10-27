import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import axios from 'axios';

import './sass/main.scss';
import {Title, Subtitle, Button, Card, Paragraph} from './components/export.js';
import HomePage from './pages/home_page';
import JoinRoom from './pages/join_room';

const base_url = window.location.origin;
const serverType = base_url.includes("localhost") ? "http://localhost:3000" : "https://animeya.herokuapp.com"

function App() {
  const [username, setUsername] = useState("")
  const [stateObj, setStateObj] = useState({
    stateStatus: "initial",
    user: {},
    anime: {}
  });


  useEffect(() => {
    if (stateObj.stateStatus === 'creating owner') {
      axios
      .post(`${serverType}/owner`, username)
      .then((res) => {
        setStateObj(prevState => ({...prevState, stateStatus: 'joining room'}))
        setStateObj(prevState => ({...prevState, user: res.data}))
      });
    }
  
  }, [stateObj.stateStatus, username]);
  
  return (
    <Router>
      <div className='app'>
      <Routes>
        <Route exact path="/" element={<HomePage setStateObj={setStateObj}/>}/>
        <Route exact path="/join_room" element={<JoinRoom token={stateObj.user.token}/>}/>
        <Route path="/card" element={<div className="page card_page">
            <Title title="Animeya"></Title>
            <Card></Card>
            <Subtitle subtitle="One Piece"></Subtitle>
            <div className='gap'>
              <Button title="Dislike"></Button>
              <Button title="Like"></Button>
            </div>
          </div>}/>
        <Route path="/waiting" element={<div className="page waiting_page">
            <Title title="Animeya"></Title>
            <Subtitle subtitle="Please Wait"></Subtitle>
            <Paragraph text="Please wait until the members of your party have finished liking or disliking their anime"></Paragraph>
          </div>}/>
        <Route path="/failed" element={          <div className="page failed_page">
            <Title title="Animeya"></Title>
            <Subtitle subtitle="Match Failed"></Subtitle>
            <Paragraph text="Sorry no one could agree on any anime"></Paragraph>
            <Button title="Restart"></Button>
            <Paragraph text="OR"></Paragraph>
            <Paragraph text="Check out these anime that people did like!"></Paragraph>
            <div>
              <Card></Card>
              <Subtitle subtitle="One Piece"></Subtitle>
              <Paragraph text="1 like"></Paragraph>
            </div>
          </div>}/>
        <Route path="/found" element={          <div className="page found_page">
            <Title title="Animeya"></Title>
            <Subtitle subtitle="Match Found"></Subtitle>
            <Card></Card>
            <Subtitle subtitle="One Piece"></Subtitle>
          </div>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
