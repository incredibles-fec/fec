import React, { useState, useEffect } from 'react';
import {
  formMappings,
  handleErrors,
  clearErrors,
  formValidator,
} from '../../utils/qaHelpers';
import { submitForm } from '../../api/qa';

export default function AddQAForm({ type = 'question', question, questionId }) {
  const [form, setForm] = useState({
    body: '12345678910',
    name: 'lalalalala',
    email: '123@123.com',
  });
  const [errors, setErrors] = useState({
    body: '',
    name: '',
    email: '',
  });
  const [errorKeys, setErrorKeys] = useState([]);

  const handleInput = (e) => {
    setErrorKeys([]);
    const res = handleErrors(e);
    setErrors({ ...errors, [res.name]: res.error });
    setForm((prev) => ({ ...prev, [res.name]: res.value }));
  };

  const handleSubmit = () => {
    const res = formValidator(errors, form);
    if (res.length) {
      return setErrorKeys(res);
    }
    submitForm(form, type, questionId);
  };

  useEffect(() => {
    clearErrors(form, (key) => {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    });
  }, [form]);

  return (
    <div className="question-form">
      <div>{formMappings[type].header}</div>
      {/* subheader -> About the [product name] for adding question */}
      {/* subheader -> [product name]: [question] for adding answer */}
      <div>{type === 'answer' ? question : ''}</div>
      <label>
        Your {type}:
        <textarea
          name="body"
          value={form.body}
          maxLength="1000"
          onChange={handleInput}
        />
      </label>
      <span className="errorMessage">{errors.body}</span>
      <label>
        Nickname:
        <input
          name="name"
          type="text"
          placeholder={formMappings[type].nicknamePH}
          value={form.name}
          maxLength="60"
          onChange={handleInput}
        />
      </label>
      {errors.name ? (
        <span className="errorMessage">{errors.name}</span>
      ) : (
        <span>
          For privacy reasons, do not use your full name or email address
        </span>
      )}
      <label>
        Email:
        <input
          name="email"
          type="text"
          placeholder={formMappings[type].emailPH}
          value={form.email}
          onChange={handleInput}
        />
      </label>
      {errors.email ? (
        <span className="errorMessage">{errors.email}</span>
      ) : (
        <span>For authentication reasons, you will not be emailed</span>
      )}

      {/* NEED UPLOAD PHOTO SECTION */}
      {/* {type === 'answer' && <input type="file" />} */}

      {errorKeys.length ? (
        <span className="errorMessage">
          You must enter the following:
          {errorKeys.map((err, idx) => {
            const field = err[0].toUpperCase() + err.substring(1);
            return idx !== errorKeys.length - 1 ? `${field}, ` : field;
          })}
        </span>
      ) : null}
      <button type="button" onClick={handleSubmit}>
        Submit {type}
      </button>
    </div>
  );
}
