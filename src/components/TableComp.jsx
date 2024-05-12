import React from 'react'


export default function TableComp(data) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{data.id}</td>
              <td>{data.id}</td>
              <td>{data.id}</td>
              <td>{data.id}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}