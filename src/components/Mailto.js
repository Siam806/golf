import React from 'react';

const Mailto = ({ email, text }) => {
  const handleClick = () => {

    window.location.href = `mailto:${email}?body=${encodeURIComponent("Hallo " + text)}`;
  };

  return (
    <button onClick={handleClick}>
      Send Email
    </button>
  );
};

export default Mailto;
