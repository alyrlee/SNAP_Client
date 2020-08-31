import React from 'react';


function ItemsTable({ items }) {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Store Name</th>
          <th>Address</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map(item => {
            return (
              <tr key={item.object.id}>
                <td>{item.store.name}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default ItemsTable;