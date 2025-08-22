import { useState } from 'react';

const HamMenu = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="ham-menu">
      <label htmlFor="nav-toggle">
        <i className="fa-solid fa-bars" onClick={handleToggle} />
      </label>
    </div>
  );
};

export default HamMenu;