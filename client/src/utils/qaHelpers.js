import validator from 'validator';

const formMappings = {
  question: {
    header: 'Ask Your Question',
    nicknamePH: 'Example: jackson11!',
    emailPH: 'jackson@email.com',
  },
  answer: {
    header: 'Submit Your Answer',
    nicknamePH: 'Example: jack5!',
    emailPH: 'jack@email.com',
  },
};

const handleErrors = (e) => {
  const { name, value } = e.target;
  let error;

  if (name === 'question') error = value.length < 10 ? 'Question error' : '';
  if (name === 'nickname') error = value.length < 8 ? 'Nickname error' : '';
  if (name === 'email') error = !validator.isEmail(value) ? 'Email error' : '';

  return { error, name, value };
};

const clearErrors = (form, callback) => {
  Object.entries(form).forEach(([key, val]) => {
    if (!val) callback(key);
  });
};

const formValidator = (errorObj, formObj) => {
  const errorKeys = {};
  Object.entries(formObj).forEach(([key, val]) => {
    if (!val) errorKeys[key] = key;
  });
  Object.values(errorObj).forEach((field) => {
    if (field && field.length) errorKeys[field] = field;
  });
  return Object.values(errorKeys);
};

const transformDate = (date) => {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const newDate = new Date(date);
  return `${formatter.format(
    newDate
  )}, ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

export {
  formMappings,
  handleErrors,
  clearErrors,
  formValidator,
  transformDate,
};
