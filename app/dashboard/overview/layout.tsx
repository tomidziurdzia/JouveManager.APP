import React from "react";

const layout = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>123-456-7890</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default layout;
