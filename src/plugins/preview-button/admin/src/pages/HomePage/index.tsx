/*
 *
 * HomePage
 *
 */

import React from 'react';
import pluginId from '../../pluginId';

const HomePage: React.FC = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
  };
  const titleStyle = {
    marginTop: '15%'
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Page du plugin "{pluginId}" développé pour l'admin du Gai Savoir.</h1>
    </div>
  );
};

export default HomePage;
