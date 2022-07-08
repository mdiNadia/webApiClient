import React, { useState, useEffect } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Static_Source_Url } from "../../../../api/api";

const ImageUploadSimple = ({ lable, defaultUrl, setFile, name,prevImage }) => {
  const [fileUrl, setfileUrl] = useState(defaultUrl);

  const onChangeFunction = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setfileUrl([reader.result]);
    }.bind(this);
  };
  useEffect(() => {
    setfileUrl(defaultUrl);
  }, [defaultUrl]);
  return (
    <Row>
      <Col xs={12} md={6}>
        <div className="form-group">
          <label> {lable} </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              setFile(e.target.files[0]);
              onChangeFunction(e.target.files[0]);
            }}
          />
        </div>
      </Col>
      <Col xs={12} md={6}>
        <Row>
        <Col xs={12} md={6}>
          <span>تصویر فعلی:</span>
          <span></span>
          {prevImage && <Image src={`${Static_Source_Url}` + `${prevImage}`} fluid />}
        </Col>
        <Col xs={12} md={6}>
          <span>تصویر جدید:</span>
          <span></span>
          {fileUrl && <Image src={fileUrl} fluid />}
        </Col>
        </Row>
       
      </Col>
    </Row>
  );
};

export default ImageUploadSimple;
