import React, { useState } from 'react';

export default function ShareSocialMedia({ product }) {
  return (
    <div>
      <a href="#" className="fa fa-facebook" data-testid='fb' />
      <a href="#" className="fa fa-twitter" data-testid='twt' />
      <a href="#" className="fa fa-pinterest" data-testid='pnt' />
    </div>
  );
}
