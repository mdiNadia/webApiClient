import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  _Add_SliderAction,
  _Edit_SliderAction,
} from "../../store/slider/sliderAction";
import { Col } from "react-bootstrap";
import { _Add_Slider, _Slider, _Update_Slider } from "../../api/api";
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

const SliderForm = ({ slider, goBack }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const [sliderId, setSliderId] = useState(slider?.id ?? 0);
  const [sliderTitle, setSliderTitle] = useState(
    slider?.title ?? ""
  );
  const [sliderSubTitle, setSliderSubTitle] = useState(
    slider?.subTitle ?? ""
  );
  const [sliderFile, setSliderFile] = useState(
    slider?.image ?? null
  );
  const [sliderDesc, setSliderDesc] = useState(slider?.description ?? "");
  const [sliderLink1, setSliderLink1] = useState(slider?.link1 ?? "");
  const [sliderLink2, setSliderLink2] = useState(slider?.link2 ?? "");

  const [sliderEnable, setSliderEnable] = useState(
    slider?.isActive ?? false
  );

  /////////////////////////////////////////////
  // var obj;
  // if (slider) {
  //   obj = JSON.parse(slider?.slider_Settings);
  // } else {
  //   obj = null;
  // }
  // const [sliderTitleColor, setSliderTitleColor] = useState(
  //   obj?.Slider_TitleColor ?? "#000"
  // );

  // const [sliderDescColor, setSliderDescColor] = useState(
  //   obj?.Slider_DescColor ?? "#000"
  // );

  // const [sliderSubColor, setSliderSubColor] = useState(
  //   obj?.Slider_SubTitleColor ?? "#000"
  // );

  ////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    var frm = new FormData();
    frm.append("image", sliderFile);
    frm.append("id", sliderId);
    frm.append("title", sliderTitle);
    frm.append("subTitle", sliderSubTitle);
    frm.append("description", sliderDesc);
    frm.append("link1", sliderLink1);
    frm.append("link2", sliderLink2);
    frm.append("isActive", sliderEnable)
    //
    if (sliderId === 0) {
      PostData({
        url: _Add_Slider,
        form: frm,
        action: _Add_SliderAction,
        dispatch: dispatch,
        goBack: goBack,
        setErrors: setErrors,
      });
    } else {
      debugger;
      PutData({
        url: _Update_Slider,
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
              name="image"
              defaultUrl={sliderFile}
              setFile={setSliderFile}
              prevImage={slider?.image ?? null}
            />
          </Col>
          <Col md={11} sm={9} xs={12} className="mb-4">
            <Input
              lable="عنوان"
              type="text"
              name="title"
              value={sliderTitle}
              setValue={setSliderTitle}
              required={true}
              error={errors?.title}
            />
          </Col>
          <Col md={11} sm={9} xs={12} className="mb-4">
            <Input
              lable="عنوان کوتاه"
              type="text"
              name="subTitle"
              value={sliderSubTitle}
              setValue={setSliderSubTitle}
              required={true}
              error={errors?.subTitle}
            />
          </Col>


          {/* نحوه‌ی استفااده از ادیتور متن */}
          {/* <Col md={12} sm={12} xs={12} className="mb-4">
            <TextArea
              lable="توضیحات"
              name="description"
              value={sliderDesc}
              setValue={setSliderDesc}
            />
          </Col> */}
          <Col md={11} sm={9} xs={12} className="mb-4">
            <SimpleTextArea
              lable="توضیحات"
              name="description"
              value={sliderDesc}
              setValue={setSliderDesc}
              rows={3}
              required={false}
              error={errors?.description}
            />
          </Col>
  
          <Col md={12} sm={12} xs={12} className="mb-4">
            <Input
              lable="لینک"
              type="text"
              name="link1"
              value={sliderLink1}
              setValue={setSliderLink1}
            />
          </Col>
          <Col md={12} sm={12} xs={12} className="mb-4">
            <Input
              lable="لینک"
              type="text"
              name="link2"
              value={sliderLink2}
              setValue={setSliderLink2}
            />
          </Col>
          <Col md={12} className="mb-4">
            <InputCheckBox
              lable="فعال است؟"
              type="checkbox"
              name="isEnable"
              value={sliderEnable}
              setValue={setSliderEnable}
            />
          </Col>

        </div>
      </form>
    </>
  );
};

export default SliderForm;
