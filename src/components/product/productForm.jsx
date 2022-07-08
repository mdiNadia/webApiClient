import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  _Add_SliderAction,
  _Edit_SliderAction,
} from "../../store/slider/sliderAction";
import { Col } from "react-bootstrap";
import { _Slider } from "../../api/api";
import Input from "../common/form/Inputs/Input";
import ImageUploadSimple from "../common/form/Inputs/ImageUploadSimple";
import InputCheckBox from "../common/form/Inputs/InputCheckBox";
import SimpleTextArea from "../common/form/Inputs/SimpleTextArea";
import TextArea from "../common/form/Inputs/QuillTextArea";
import FromHeader from "../common/form/formHeader";
import PostData from "../../api/action/post";
import PutData from "../../api/action/put";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = ({ slider, goBack }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const [sliderId, setSliderId] = useState(slider?.shopSliders_ID ?? 0);
  const [sliderTitle, setSliderTitle] = useState(
    slider?.shopSliders_Title ?? ""
  );
  const [sliderFile, setSliderFile] = useState(
    slider?.shopSliders_Image ?? null
  );
  const [sliderSubTitle, setSliderSubTitle] = useState(
    slider?.shopSliders_SubTitle ?? ""
  );
  const [sliderDesc, setSliderDesc] = useState(slider?.shopSliders_Desc ?? "");
  const [sliderLink, setSliderLink] = useState(slider?.shopSliders_Link ?? "");
  const [sliderLevel, setSliderLevel] = useState(
    slider?.shopSliders_Level ?? 1
  );
  const [sliderOrder, setSliderOrder] = useState(
    slider?.shopSliders_Order ?? 0
  );
  const [sliderEnable, setSliderEnable] = useState(
    slider?.shopSliders_IsEnable ?? false
  );

  /////////////////////////////////////////////
  var obj;
  if (slider) {
    obj = JSON.parse(slider?.slider_Settings);
  } else {
    obj = null;
  }
  const [sliderTitleColor, setSliderTitleColor] = useState(
    obj?.Slider_TitleColor ?? "#000"
  );

  const [sliderDescColor, setSliderDescColor] = useState(
    obj?.Slider_DescColor ?? "#000"
  );

  const [sliderSubColor, setSliderSubColor] = useState(
    obj?.Slider_SubTitleColor ?? "#000"
  );

  ////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    var frm = new FormData();
    frm.append("shopSliders_Image", sliderFile);
    frm.append("shopSliders_ID", sliderId);
    frm.append("shopSliders_Title", sliderTitle);
    frm.append("shopSliders_SubTitle", sliderSubTitle);
    frm.append("shopSliders_Desc", sliderDesc);
    frm.append("shopSliders_Link", sliderLink);
    frm.append("shopSliders_IsEnable", sliderEnable);
    frm.append("shopSliders_Level", sliderLevel);
    frm.append("shopSliders_Order ", sliderOrder);
    //
    frm.append("slider_TitleColor", sliderTitleColor);
    frm.append("slider_SubTitleColor", sliderSubColor);
    frm.append("slider_DescColor", sliderDescColor);
    if (sliderId === 0) {
      PostData({
        url: _Slider,
        form: frm,
        action: _Add_SliderAction,
        dispatch: dispatch,
        goBack: goBack,
        setErrors: setErrors,
      });
    } else {
      PutData({
        url: _Slider,
        form: frm,
        action: _Edit_SliderAction,
        dispatch: dispatch,
        goBack: goBack,
        setErrors: setErrors,
      });
    }
  };
  useEffect(() => {
    const closeAfter5 = () => {
      toast.info("افزودن تصویر اجباری می‌باشد!", {
        type: "info",
        theme: "colored",
        autoClose: 5000,
        autoOpen: true,
        rtl: true,
      });
    };
    closeAfter5();
  }, []);

  ////////////////////////////////////////
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            overflow: "auto",
            background: "#fff",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          <FromHeader
            title={
              sliderId === 0 ? "افزودن اسلایدر" : `فرم ویرایش ${sliderTitle}`
            }
            btnMode={"success"}
            btnTitle={"ثبت"}
            btnType={sliderId === 0 ? "create" : "edit"}
            goBack={goBack}
            toCreate={`/Slider/Create`}
          />
        </div>
        <div
          className="d-flex"
          style={{
            flexWrap: "wrap",
            alignItems: "self-end",
            background: "#fff",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <input
            value={sliderId}
            onChange={(e) => setSliderId(e.target.value)}
            hidden
          />
          <Col md={12} sm={12} xs={12} className="mb-4">
            <ImageUploadSimple
              lable="تصویر"
              name="shopSliders_Image"
              defaultUrl={sliderFile}
              setFile={setSliderFile}
            />
          </Col>
          <Col md={11} sm={9} xs={12} className="mb-4">
            <Input
              lable="عنوان"
              type="text"
              name="shopSliders_Title"
              value={sliderTitle}
              setValue={setSliderTitle}
              required={true}
              error={errors?.shopSliders_Title}
            />
          </Col>
          <Col md={1} sm={3} xs={12} className="mb-4">
            <Input
              lable=""
              type="color"
              name="slider_TitleColor"
              value={sliderTitleColor}
              setValue={setSliderTitleColor}
            />
          </Col>
          <Col md={11} sm={9} xs={12} className="mb-4">
            <SimpleTextArea
              lable="موضوع"
              name="shopSliders_SubTitle"
              value={sliderSubTitle}
              setValue={setSliderSubTitle}
              rows={1}
              required={true}
              error={errors?.shopSliders_SubTitle}
            />
          </Col>
          <Col md={1} sm={3} xs={12} className="mb-4">
            <Input
              lable=""
              type="color"
              name="slider_SubTitleColor"
              value={sliderSubColor}
              setValue={setSliderSubColor}
            />
          </Col>
          {/* نحوه‌ی استفااده از ادیتور متن */}
          {/* <Col md={12} sm={12} xs={12} className="mb-4">
            <TextArea
              lable="توضیحات"
              name="shopSliders_Desc"
              value={sliderDesc}
              setValue={setSliderDesc}
            />
          </Col> */}
          <Col md={11} sm={9} xs={12} className="mb-4">
            <SimpleTextArea
              lable="توضیحات"
              name="shopSliders_Desc"
              value={sliderDesc}
              setValue={setSliderDesc}
              rows={3}
              required={false}
              error={errors?.shopSliders_Desc}
            />
          </Col>
          <Col md={1} sm={3} xs={12} className="mb-4">
            <Input
              lable=""
              type="color"
              name="slider_DescColor"
              value={sliderDescColor}
              setValue={setSliderDescColor}
            />
          </Col>
          <Col md={12} sm={12} xs={12} className="mb-4">
            <Input
              lable="لینک"
              type="text"
              name="shopSliders_Link"
              value={sliderLink}
              setValue={setSliderLink}
            />
          </Col>
          <Col md={12} className="mb-4">
            <InputCheckBox
              lable="فعال است؟"
              type="checkbox"
              name="shopSliders_IsEnable"
              value={sliderEnable}
              setValue={setSliderEnable}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              lable="سطح"
              type="number"
              name="shopSliders_Level"
              value={sliderLevel}
              setValue={setSliderLevel}
              style={{ width: "100px" }}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              lable="ترتیب"
              type="number"
              name="shopSliders_Order "
              value={sliderOrder}
              setValue={setSliderOrder}
              style={{ width: "100px" }}
            />
          </Col>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
