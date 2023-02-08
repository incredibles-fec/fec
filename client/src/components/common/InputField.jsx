import React from 'react';

export default function InputField({
  type = 'input',
  name,
  label,
  placeholder,
  error,
  hint,
  onChange,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label>
        {label ?? name.charAt(0).toUpperCase() + name.slice(1)}
        {type === 'long' && (
          <textarea
            className="form-textarea-field"
            type="text"
            name={name}
            placeholder={placeholder ?? ''}
            maxLength={1000}
            onChange={onChange}
          />
        )}
        {type === 'input' && (
          <input
            className="form-input-field"
            type="text"
            name={name}
            placeholder={placeholder ?? ''}
            maxLength={60}
            onChange={onChange}
          />
        )}
      </label>
      {error ? (
        <span className="errorMessage">{error}</span>
      ) : (
        <span>{hint ?? ''}</span>
      )}
    </div>
  );
}
