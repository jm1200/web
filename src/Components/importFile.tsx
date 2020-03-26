import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      uploaded
      rangeStart
      rangeEnd
      account
      transactions {
        account
        type
        datePosted
        transId
        name
        memo
        amount
      }
    }
  }
`;

const ImportFile: React.FC = () => {
  const [uploadFile] = useMutation(uploadFileMutation);

  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } }).then(res => {});
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default ImportFile;
