import React from 'react';

const DashboardPage: React.FC = () => {
  const staticData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {staticData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
