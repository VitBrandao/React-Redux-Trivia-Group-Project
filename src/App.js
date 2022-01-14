import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import GameScreen from './pages/GameScreen';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ GameScreen } />
    </Switch>
  );
}
