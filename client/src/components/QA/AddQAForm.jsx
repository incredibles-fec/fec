import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQA } from '../../state/qa';
import InputField from '../common/InputField.jsx';
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
  const {
    currentProduct: { name: productName, id: productId },
  } = useSelector((store) => store.pd);
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
      productId,
    });
    await dispatch(getQA());
    close();
  };

  return (
    <div className="question-form">
      <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        {formMappings[type].header}
      </div>
      <div style={{ textAlign: 'center' }}>
        {type === 'question'
          ? `About the ${productName}`
          : `${productName}: ${question}`}
      </div>

      <InputField
        type="long"
        name="body"
        label={`Your ${type}:`}
        error={errors.body}
        onChange={handleInput}
      />

      <InputField
        name="name"
        label="Nickname:"
        placeholder={formMappings[type].nicknamePH}
        error={errors.name}
        hint="For privacy reasons, do not use your full name or email address"
        onChange={handleInput}
      />

      <InputField
        name="email"
        label="Email:"
        placeholder={formMappings[type].emailPH}
        error={errors.email}
        hint="For authentication reasons, you will not be emailed"
        onChange={handleInput}
      />

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
      <div style={{ textAlign: 'center' }}>
        <div className="form-submit-button" onClick={handleSubmit}>
          <div id="submit-translate" />
          Submit
        </div>
      </div>
    </div>
  );
}
