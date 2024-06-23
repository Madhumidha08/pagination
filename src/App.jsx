import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);

  const getFetchUsers = async () => {
    try {
      const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      window.alert('Failed to fetch data');
    }
  };

  useEffect(() => {
    getFetchUsers();
  }, []);

  // calculate the total num. of pages.
  const totalPage = Math.ceil(users.length / userPerPage);

  // get the user for current page.
  const getPaginatedUser = () => {
    const startIndex = (currentPage - 1) * userPerPage;
    const endIndex = startIndex + userPerPage;
    return users.slice(startIndex, endIndex);
  };

  return (
    <div className="w-[96%] m-auto mt-[1rem]">
      <table className="w-full shadow-sm shadow-green-900">
        <thead className="bg-green-700">
          <tr>
            <th className="py-2">Id</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users && getPaginatedUser().map((ele) => (
            <tr key={ele.id}>
              <td className="px-[1rem] py-2">{ele.id}</td>
              <td className="text-center px-[1rem] py-2">{ele.name}</td>
              <td className="text-center px-[1rem] py-2">{ele.email}</td>
              <td className="text-center px-[1rem] py-2">{ele.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-2 h-[5rem] mt-[2rem]">
        <button
          className="bg-green-900 px-3.5 py-1.5 rounded-md"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="bg-green-900 px-3.5 py-1.5 rounded-md">{currentPage}</button>
        <button
          className="bg-green-900 px-3.5 py-1.5 rounded-md"
          onClick={() => {
            if (currentPage < totalPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
