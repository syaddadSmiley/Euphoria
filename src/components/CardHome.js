import React from 'react';
import './CardHome.css';

const CardHome = ({ imageUrl, title, description }) => {
  return (
    <div className="card-home">
      <div className="card-home-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-home-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardHome;