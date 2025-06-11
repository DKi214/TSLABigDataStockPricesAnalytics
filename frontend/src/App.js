//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;

import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get('/api/records')
            .then(response => {
                setRecords(response.data); // <-- зберігаємо масив
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setRecords([]); // або setError(...) якщо хочеш окрему помилку
            });
    }, []);

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            {records.length === 0 ? (
                <p>Даних немає або помилка при завантаженні</p>
            ) : (
                <table border="1" cellPadding="10" style={{margin: '0 auto', borderCollapse: 'collapse'}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.date}</td>
                            <td>{record.open}</td>
                            <td>{record.high}</td>
                            <td>{record.low}</td>
                            <td>{record.close}</td>
                            <td>{record.volume.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;

