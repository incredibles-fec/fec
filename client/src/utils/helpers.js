import validator from 'validator';

const handleErrors = (name, value) => {
  let error;
  if (name === 'body') {
    error = value.length < 2 ? 'You need to type more dude' : '';
  }
  if (name === 'name') error = value.length < 5 ? 'Nickname is too short' : '';
  if (name === 'email') {
    error = !validator.isEmail(value) ? 'That is not an email' : '';
  }
  if (name === 'summary') error = value.length < 10 ? 'Can you type more?' : '';

  return { error };
};

const clearErrors = (form, callback) => {
  Object.entries(form).forEach(([key, val]) => {
    if (!val) callback(key);
  });
};

const formValidator = (errorObj, formObj, review = false) => {
  const errorKeys = {};
  Object.entries(formObj).forEach(([key, val]) => {
    if (review && key === 'body' && formObj[key].length < 50) {
      errorKeys[key] = key;
    } else if (!val) errorKeys[key] = key;
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

const getRatings = (ratings) =>
  ratings.reduce(
    (acc, val) => {
      acc.reviews += Number(val[1]);
      acc.aggregate += val[0] * val[1];
      acc.average = acc.aggregate / acc.reviews;
      return acc;
    },
    { reviews: 0, aggregate: 0, average: 0 }
  );

const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export {
  handleErrors,
  clearErrors,
  formValidator,
  transformDate,
  debounce,
  getRatings,
};
