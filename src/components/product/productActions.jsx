import { useHistory, useParams } from "react-router-dom";
import SliderForm from "./sliderForm";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductActions = () => {
  const param = useParams();
  const history = useHistory();
  const sliderStore = useSelector((state) => state.Slider.payload);

  const [sData, setSData] = useState(
    sliderStore &&
      sliderStore?.find((c) => c.shopSliders_ID.toString() === param.id)
  );

  return (
    <div>
      <SliderForm slider={sData} goBack={history.goBack} />
    </div>
  );
};

export default ProductActions;
