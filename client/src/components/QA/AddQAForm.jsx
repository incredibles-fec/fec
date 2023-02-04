import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getQA } from '../../state/qa';
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
    const checkErrors = debounce(() => {
      const res = handleErrors(name, value);
      setErrors({ ...errors, [name]: value ? res.error : '' });
    }, 500);
    checkErrors();
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const selectFiles = (e) => {
    if (e.target.files.length + files.length > 5) {
      return setFileError('You uploaded more than 5 files');
    }
    setFiles([...files, ...Array.from(e.target.files)]);
    setFileError('');
  };

  const handleSubmit = async () => {
    const res = formValidator(errors, form);
    if (res.length || fileError) return setErrorKeys(res);
    await submitForm({ form, type, questionId, files });
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
        <div style={{ display: 'flex' }}>
          <input
            type="file"
            id="files"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            className="hidden-input-file"
            onChange={selectFiles}
          />
          <label htmlFor="files" className="choose-file-button">
            Choose files
          </label>
          <span>{files.length > 0 && ` ${files.length} files chosen`}</span>
        </div>
      )}
      {fileError && <span className="errorMessage">{fileError}</span>}
      {files.length > 0 && (
        <div style={{ gap: '0.3rem' }}>
          {files.map((file) => (
            <div key={file.name}>
              {file.name}{' '}
              <i
                className="fa-solid fa-trash"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const newFiles = files.filter(
                    (item) => item.name !== file.name
                  );
                  setFiles(newFiles);
                }}
              />
            </div>
          ))}
        </div>
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
