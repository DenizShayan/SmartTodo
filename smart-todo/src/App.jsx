import react, { useState } from 'react';
function App() {
  const [taskName, setTaskName] = useState('');
  return (
    <div className='p-4 max-w-md mx-auto grid'>
      <h1 className='mx-auto text-2x1 font-bold mb-4'>Smart Todo</h1>
      <label className='mx-auto'>Task Name:</label>
      <input type='text' id='task' className='mx-auto'/>
      <label className='mx-auto'>Time:</label>
      <input type='text' id='time' className='mx-auto'/>
    </div>
  );
}

export default App;
