import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getQA } from '../../state/qa';
import UploadFile from '../common/UploadFile.jsx';
import { handleErrors, formValidator, debounce } from '../../utils/helpers';
import { formMappings } from '../../utils/mappings';
import { submitForm } from '../../api/qa';

export default function AddQAForm({
  type = 'question',
  question,
  questionId,
  close,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    body: '',
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    body: '',
    name: '',
    email: '',
  });

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [errorKeys, setErrorKeys] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setErrorKeys([]);
    setFileError('');
    const checkErrors = debounce(() => {
      const res = handleErrors(name, value);
      setErrors({ ...errors, [name]: value ? res.error : '' });
    }, 500);
    checkErrors();
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = formValidator(errors, form);
    if (res.length || fileError) return setErrorKeys(res);
    await submitForm({
      form,
      type,
      questionId,
      files,
    });
    await dispatch(getQA());
    close();
  };

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

      {type === 'answer' && (
        <UploadFile
          files={files}
          fileError={fileError}
          setError={(v) => setFileError(v)}
          setFiles={(uploads) => setFiles(uploads)}
        />
      )}

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
