import React from 'react';
import Authentication from './Authentication';
import Tasks from './Tasks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Manager App</h1>
      </header>
      <main>
        <Authentication />
        <Tasks />
      </main>
    </div>
  );
}

export default App;
