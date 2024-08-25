import React, { useState } from 'react';
import { parseImports } from 'parse-imports';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await fetch('https://your-backend-url.herokuapp.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: parsedInput.data }),
            });
            const data = await response.json();
            setResponseData(data);
        } catch (error) {
            alert('Invalid JSON input');
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions((prevOptions) =>
            checked ? [...prevOptions, value] : prevOptions.filter((option) => option !== value)
        );
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <div>
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>
                )}
            </div>
        );
    };

  //   const response = fetch('https://bfhl-backend.vercel.app/bfhl', { // Replace with your backend URL
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ data: parsedInput.data }),
  // });
  

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter JSON" />
            <button onClick={handleSubmit}>Submit</button>
            <div>
                <label>
                    <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} />
                    Highest lowercase alphabet
                </label>
            </div>
            {renderResponse()}
        </div>
    );
}

export default App;

