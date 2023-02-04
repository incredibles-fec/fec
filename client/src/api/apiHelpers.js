import axios from 'axios';

const uploadCloudinary = (files) => {
  const uploads = [];
  for (let i = 0; i < files.length; i += 1) {
    const formData = new FormData();
    formData.append('file', files[i]);
    formData.append('upload_preset', 'q6mobdff');
    uploads.push(
      axios.post(
        'https://api.cloudinary.com/v1_1/dpwqi5o83/image/upload',
        formData
      )
    );
  }
  return Promise.all(uploads);
};

export { uploadCloudinary };
