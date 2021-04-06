import React from 'react';

type DateProperty = {
  currentYear: number;
};

const Footer = ({ currentYear }: DateProperty) => {
  return (
    <div className="footer">
      <span>&copy; {currentYear}. Game Demo Inc</span>
    </div>
  );
};

export default Footer;
