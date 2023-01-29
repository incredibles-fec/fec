import { useState, useEffect } from 'react';
import {
  formMappings,
  handleErrors,
  clearErrors,
  formValidator,
} from '../../utils/qaHelpers.js';

const AddQAForm = ({ type = 'question' }) => {
  const [form, setForm] = useState({
    question: '',
    nickname: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    question: '',
    nickname: '',
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
      <label>
        Your {type}:
        <textarea
          name="question"
          value={form.question}
          maxLength="1000"
          onChange={handleInput}
        />
      </label>
      <span className="errorMessage">{errors.question}</span>
      <label>
        Nickname:
        <input
          name="nickname"
          type="text"
          placeholder={formMappings[type].nicknamePH}
          value={form.nickname}
          maxLength="60"
          onChange={handleInput}
        />
      </label>
      {errors.nickname ? (
        <span className="errorMessage">{errors.nickname}</span>
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

      {errorKeys.length ? (
        <span className="errorMessage">
          You must enter the following:{' '}
          {errorKeys.map((err, idx) => {
            const field = err[0].toUpperCase() + err.substring(1);
            return idx !== errorKeys.length - 1 ? `${field}, ` : field;
          })}
        </span>
      ) : null}
      <button onClick={handleSubmit}>Submit {type}</button>
    </div>
  );
};

export default AddQAForm;
