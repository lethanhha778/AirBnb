import React, { useState } from "react";
import "./style.scss";
import { Form, Input, Button, Radio, DatePicker, Upload, Avatar } from "antd";
import dayjs from "dayjs";
import { USER_INFO } from "../../util/setting";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_AVATAR, EDIT_INFO } from "../../redux/actions/AuthAction";

const getProfileFromLocalStorage = () => {
  const data = localStorage.getItem(USER_INFO);
  const objectData = JSON.parse(data || "{}");

  return objectData;
};

const Profile = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [dataEdit, setDataEdit] = useState({});

  const onFormLayoutChange = (data) => {
    setDataEdit(data);
  };
  const { avatar, birthday, email, gender, name, phone } =
    getProfileFromLocalStorage();

  const userData = useSelector((state) => state.AuthReducer?.user);
  const urlavatar = useSelector((state) => state.AuthReducer?.user?.avatar);

  const [fields, setFields] = useState([
    {
      name: ["email"],
      value: email,
    },
    {
      name: ["name"],
      value: name,
    },
    {
      name: ["phone"],
      value: phone,
    },
    {
      name: ["gender"],
      value: gender,
    },
    {
      name: ["birthday"],
      value: dayjs(birthday, "DD/MM/YYYY"),
    },
  ]);

  const [fileList, setFileList] = useState([]);
  const onChangeImg = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const footerProfile = componentDisabled ? (
    <Button
      type="primary"
      size="large"
      onClick={(e) => setComponentDisabled(!componentDisabled)}
    >
      Edit
    </Button>
  ) : (
    <>
      <Button type="" size="large" onClick={(e) => setComponentDisabled(true)}>
        Cancel
      </Button>

      <Button type="primary" size="large" onClick={(e) => handleSubmitChange()}>
        Submit
      </Button>
    </>
  );
  const dispatch = useDispatch();

  const handleSubmitChange = async () => {
    if (fileList.length) {
      await dispatch(UPLOAD_AVATAR(fileList?.[0]?.originFileObj));
      setFileList([]);
    }
    await dispatch(EDIT_INFO({ ...userData, ...dataEdit }));
  };
  return (
    <div className="wrap-profile">
      {JSON.stringify(fileList)}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        fields={fields}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
      >
        <Form.Item label="Gender" name="gender">
          <Radio.Group>
            <Radio value={true}> Male </Radio>
            <Radio value={false}> FeeMale </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="BirthDay" name="birthday">
          <DatePicker format='DD/MM/YYYY'/>
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <Avatar size={100} src={urlavatar || avatar} />
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList}
            onChange={onChangeImg}
            onPreview={onPreview}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </Form.Item>
      </Form>
      <div className="wrap-profile__wrap-action">{footerProfile}</div>
    </div>
  );
};
export default Profile;
