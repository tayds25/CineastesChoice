import React from 'react';
import Chatbot from './Chatbot';

const Recommendations = () => {
  return (
    <div className="recommendations-page">
      <h1>Recommendations</h1>
      <p>Here are some recommendations based on your preferences.</p>

      {/* Add the chatbot component */}
      <Chatbot />
    </div>
  );
};

export default Recommendations;