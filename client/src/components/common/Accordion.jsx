import React, { useState, useEffect } from 'react';

export default function Accordion({ title, children, isCollapsed }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(isCollapsed);
  }, [isCollapsed]);

  return (
    <div>
      <div className="accordion">
        <div>{title}</div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => setIsActive(!isActive)}
        >
          <i
            className={
              isActive ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'
            }
          />
        </div>
      </div>

      <div className={isActive ? 'expanded' : 'collapsed'}>
        {isActive && children}
      </div>
    </div>
  );
}
