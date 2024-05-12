import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // Removed unused variable `rowsPerPage`
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * 10; // Hardcoded rowsPerPage to 10
  const indexOfFirstRow = indexOfLastRow - 10;
  const currentView = data.slice(indexOfFirstRow, indexOfLastRow);

  const getData = async () => {
    try {
      let res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      setData(res.data);
    } catch (e) {
      console.error("Error fetching the data.", e);
      setError("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / 10); // Hardcoded rowsPerPage to 10
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  console.log(data);

  return (
    <div className="App">
      <h3>Employee Data Table</h3>
      {error && <div className="error">{error}</div>}
      <div className='table'>
        <table className='tableData'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentView.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='toggle'>
        <button className='toggleButton' onClick={handlePreviousPage}>Previous</button>
        <span className='pageNum' key={currentPage}>{currentPage}</span>
        <button className='toggleButton' onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
