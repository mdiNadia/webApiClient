import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import api, { ROOT_URL, _User_Login } from "../../../api/api";
import { _USER_LOGIN } from "../../../store/user/userAction";
import loginbg from "../../../assets/images/loginbg.jpg";
import { Row } from "react-bootstrap";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        پر کردن این فیلد اجباری است!
      </div>
    );
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post(
        `${ROOT_URL}${_User_Login}`,

        {
          email: username,
          passWord: password,
        }
      )
      .then((res) => {
        debugger;
        dispatch(_USER_LOGIN(res.data));
        if (!res.data.token) {
          swal({
            title: "خطا!",
            text: res.data,
            icon: "error",
            buttons: {
              confirm: "بستن",
            },
          });
        } else {
          localStorage.setItem("token", res.data.token);
          window.location.href = "/";
        }
      });
  };

  return (
    <Row className="login_wrapper">
      <div className="col-md-6 login_right_img">
       <img src={loginbg} alt="پویان سایت" />
      </div>
      <div className="col-md-6">
        <div className="card-container login_box">
          <a href="#" className="logo_text">
            <span className="pb-2">نواندیشان</span>پویان سایت
          </a>
          <div className="login_form_inner">
            <h3>مدیریت فروشگاه اینترنتی</h3>
            <Form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">نام</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">رمزعبور</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="remember">
                <a href="#" className="forget-pass">
                  فراموشی رمزعبور
                </a>
              </div>
              <div className="form-group-btn pt-4">
                <button type="submit" className="btn btn-block">
                  <span>ورود</span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default Login;
