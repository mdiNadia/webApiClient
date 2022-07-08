import { useState } from "react";
import { Container } from "react-bootstrap";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextArea = ({ value, setValue, name, lable }) => {
  const handleChange = (e) => {
    console.log(e);
    setValue(e);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],

      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "link",
    "image",
  ];
  return (
    <div className="form-group">
      <label> {lable} </label>
      <ReactQuill
        id={`${name}`}
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
};

export default TextArea;
