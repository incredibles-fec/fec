import React, { useState } from 'react';

export default function Accordion({ title, children, onToggle, canToggle }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div
        className="accordion"
        style={{ boxShadow: isActive && '5px 5px #a30f07' }}
      >
        <div
          style={{
            color: isActive ? '#a30f07' : '#6c6c75',
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (!canToggle) return;
            onToggle();
            setIsActive(!isActive);
          }}
        >
          <i
            className={
              isActive ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'
            }
            style={{ color: isActive ? '#a30f07' : '#6c6c75' }}
          />
        </div>
      </div>

      <div className={isActive ? 'expanded' : 'collapsed'}>
        {isActive && children}
      </div>
    </div>
  );
}
