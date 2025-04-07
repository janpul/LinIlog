import React from 'react';

const RiverStats = () => {
  const stats = [
    { name: 'Length of Rivers', value: '227,000 km' },
    { name: 'Number of Major Rivers', value: '421' },
    { name: 'Endangered River Species', value: '15' },
    { name: 'Rivers with Pollution Issues', value: '30%' },
  ];

  return (
    <div className="river-stats">
      <h2>River Statistics in the Philippines</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={index}>
            <strong>{stat.name}:</strong> {stat.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiverStats;