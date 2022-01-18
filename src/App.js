import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';
import GameScreen from './pages/GameScreen';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ GameScreen } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}
