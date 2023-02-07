import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews, getMetaData } from '../../state/rr';
import InputField from '../common/InputField.jsx';
import RadioGroup from '../common/RadioGroup.jsx';
import UploadFile from '../common/UploadFile.jsx';
import RatingsSelector from './RatingsSelector.jsx';
import { radioGroupOptions } from '../../utils/mappings';
import { debounce, handleErrors, formValidator } from '../../utils/helpers';
import { submitForm } from '../../api/rr';

export default function AddReviewForm({ close }) {
  const dispatch = useDispatch();
  const {
    currentProduct: { name: productName, id: productId },
  } = useSelector((store) => store.pd);

  const [form, setForm] = useState({
    rating: 0,
    summary: '',
    body: '',
    recommend: '',
    name: '',
    email: '',
    size: 0,
    width: 0,
    comfort: 0,
    quality: 0,
    length: 0,
    fit: 0,
  });
  const [errors, setErrors] = useState({
    summary: '',
    name: '',
    email: '',
  });

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [errorKeys, setErrorKeys] = useState([]);

  const charRadioGroup = Object.entries(radioGroupOptions.characteristics);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setErrorKeys([]);
    setFileError('');
    const checkErrors = debounce(() => {
      const res = handleErrors(name, value);
      setErrors({
        ...errors,
        [name]: value && name !== 'body' ? res.error : '',
      });
    }, 500);
    checkErrors();
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = formValidator(errors, form);
    if (res.length || fileError) return setErrorKeys(res);
    await submitForm(form, productId, files);
    await Promise.all([dispatch(getReviews()), dispatch(getMetaData())]);
    close();
  };

  return (
    <div className="review-form">
      <div>About the {productName}</div>
      <RatingsSelector handleInput={handleInput} />
      <RadioGroup
        name="recommend"
        options={radioGroupOptions.recommend}
        handleInput={handleInput}
      />
      {charRadioGroup.map(([key, options]) => (
        <div key={key}>
          <RadioGroup name={key} options={options} handleInput={handleInput} />
        </div>
      ))}

      <InputField
        name="summary"
        label="Summary:"
        error={errors.summary}
        placeholder="Example: Best purchase ever!"
        onChange={handleInput}
      />

      <InputField
        type="long"
        name="body"
        label="Body:"
        error={errors.body}
        hint={
          form.body.length > 49
            ? 'Minimum reached'
            : `Minimum required characters left: ${50 - form.body.length}`
        }
        onChange={handleInput}
      />

      <InputField
        name="name"
        label="Nickname:"
        error={errors.name}
        placeholder="Example: jackson11!"
        hint="For privacy reasons, do not use your full name or email address"
        onChange={handleInput}
      />

      <InputField
        name="email"
        label="Email:"
        placeholder="Example: jackson11@email.com"
        error={errors.email}
        hint="For authentication reasons, you will not be emailed"
        onChange={handleInput}
      />

      <UploadFile
        files={files}
        fileError={fileError}
        setError={(v) => setFileError(v)}
        setFiles={(uploads) => setFiles(uploads)}
      />

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
        Submit
      </button>
    </div>
  );
}
