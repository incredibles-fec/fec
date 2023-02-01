import React from 'react';

export default function ProgressBar({ value }) {
  return <progress value={value} max="100" />;
}
