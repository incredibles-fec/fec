import React, { useState, useEffect } from 'react';
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
  const {
    metaData: { characteristics },
  } = useSelector((store) => store.rr);

  const [form, setForm] = useState({
    rating: 0,
    summary: '',
    body: '',
    recommend: '',
    name: '',
    email: '',
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
  const metaDataCharKeys = Object.keys(characteristics).map((char) =>
    char.toLowerCase()
  );

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
    const res = formValidator(errors, form, true);
    if (res.length || fileError) return setErrorKeys(res);
    await submitForm(form, productId, files, characteristics);
    await Promise.all([dispatch(getReviews()), dispatch(getMetaData())]);
    close();
  };

  useEffect(() => {
    Object.keys(characteristics).forEach((char) =>
      setForm((prev) => ({ ...prev, [char.toLowerCase()]: '' }))
    );
  }, [productId]);

  return (
    <div className="review-form">
      <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>
        About the {productName}
      </div>
      <div style={{ fontWeight: 'bold' }}>Your Rating</div>
      <RatingsSelector handleInput={handleInput} />
      <RadioGroup
        name="recommend"
        options={radioGroupOptions.recommend}
        handleInput={handleInput}
      />
      <div style={{ display: 'flex' }}>
        {charRadioGroup
          .filter((char) => metaDataCharKeys.includes(char[0]))
          .map(([key, options]) => (
            <div key={key} style={{ width: '25%' }}>
              <RadioGroup
                name={key}
                options={options}
                handleInput={handleInput}
              />
            </div>
          ))}
      </div>

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
      <div style={{ textAlign: 'center' }}>
        <div className="form-submit-button" onClick={handleSubmit}>
          <div id="submit-translate" />
          Submit
        </div>
      </div>
    </div>
  );
}
