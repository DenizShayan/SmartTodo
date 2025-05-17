import { useState } from 'react';
function App() {
  const [task, setTask] = useState('');
  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2x1 font-bold mb-4'>Smart Todo</h1>
    </div>
  );
}

export default App;
