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

const radioGroupOptions = {
  recommend: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
  characteristics: {
    size: [
      { label: 'A size too small', value: 1 },
      { label: '1/2 a size too small', value: 2 },
      { label: 'Perfect', value: 3 },
      { label: '1/2 a size too big', value: 4 },
      { label: 'A size too big', value: 5 },
    ],
    width: [
      { label: 'Too narrow', value: 1 },
      { label: 'Slightly narrow', value: 2 },
      { label: 'Perfect', value: 3 },
      { label: 'Slightly wide', value: 4 },
      { label: 'Too wide', value: 5 },
    ],
    comfort: [
      { label: 'Uncomfortable', value: 1 },
      { label: 'Slightly uncomfortable', value: 2 },
      { label: 'Ok', value: 3 },
      { label: 'Comfortable', value: 4 },
      { label: 'Perfect', value: 5 },
    ],
    quality: [
      { label: 'Poor', value: 1 },
      { label: 'Below average', value: 2 },
      { label: 'What I expected', value: 3 },
      { label: 'Pretty great', value: 4 },
      { label: 'Perfect', value: 5 },
    ],
    length: [
      { label: 'Runs short', value: 1 },
      { label: 'Runs slightly short', value: 2 },
      { label: 'Perfect', value: 3 },
      { label: 'Runs slightly long', value: 4 },
      { label: 'Runs long', value: 5 },
    ],
    fit: [
      { label: 'Runs tight', value: 1 },
      { label: 'Runs slightly tight', value: 2 },
      { label: 'Perfect', value: 3 },
      { label: 'Runs slightly loose', value: 4 },
      { label: 'Runs loose', value: 5 },
    ],
  },
};

export { formMappings, radioGroupOptions };
