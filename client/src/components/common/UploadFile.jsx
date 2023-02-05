import React from 'react';

export default function UploadFile({ files, fileError, setError, setFiles }) {
  const selectFiles = (e) => {
    if (e.target.files.length + files.length > 5) {
      return setError('You uploaded more than 5 files');
    }
    setFiles([...files, ...Array.from(e.target.files)]);
    setError('');
  };
  return (
    <div>
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
    </div>
  );
}
