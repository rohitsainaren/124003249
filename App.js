import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [numbers, setNumbers] = useState('');
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    setError('');
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data && data.numbers) {
          const numbersArray = data.numbers;
          setNumbers(numbersArray.join(', '));
          console.log(numbersArray); // You can log here if needed
        } else {
          setError('No numbers found in the response');
        }
      } else {
        setError('Error fetching data');
      }
    } catch (error) {
      setError('Error fetching numbers');
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL..."
        />
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      <div>
        {numbers && (
          <div>
            <h2>Numbers</h2>
            <p>{numbers}</p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
