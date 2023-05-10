import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../../Utils/AuthService";
import {Button, Form, Input, InputNumber, Upload, UploadFile, UploadProps} from "antd";
import Password from "antd/es/input/Password";
import {IRegisterData} from "../../types/IRegisterData";
import IResponse from "../../types/IResponse";
import {IUser} from "../../types/IUser";
import "./../../styles/form.css"

const RegisterPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [file, setFile] = useState<UploadFile | null>(null)
    function register(data: IRegisterData) {
        if (file !== undefined && file !== null) {
            data.avatar = file
            setFile(null)
        } else {
            data.avatar = undefined
        }
        AuthService.register(data).then((response:IResponse<IUser>) => {
            if (response.error === null) {
                navigate("../login");
            } else {
                setError(response.error);
            }
        }).catch(console.log);

    }
    const handleRemove: UploadProps['onRemove'] = () => {
        setFile(null);
    }
    return (
        <Form className="form" name="login-page" initialValues={{remember: false}} onFinish={register} autoComplete="off"
              labelCol={{span: 2}} wrapperCol={{span: 8}}>
            <Form.Item className="form-item" name="username" rules={[
                {required: true, message: "Please, input name!"}
            ]} wrapperCol={{ sm: 24 }}>
                <Input placeholder="name"/>
            </Form.Item>
            <Form.Item className="form-item" name="city" rules={[
                {required: true, message: "Please, input city!"}
            ]} wrapperCol={{ sm: 24 }}>
                <Input placeholder="city"/>
            </Form.Item>
            <Form.Item className="form-item" name="university" rules={[
                {required: true, message: "Please, input university!"}
            ]} wrapperCol={{ sm: 24 }}>
                <Input placeholder="university"/>
            </Form.Item>
            <Form.Item className="form-item" name="age" rules={[
                {required: true, message: "Please, input age!"}
            ]} wrapperCol={{ sm: 24 }}>
                <InputNumber placeholder="age"/>
            </Form.Item>
            <Form.Item className="form-item" name="login" rules={[
                {required: true, message: "Please, input login!"}
            ]} wrapperCol={{ sm: 24 }}>
                <Input placeholder="login"/>
            </Form.Item>
            <Form.Item className="form-item" name="password" rules={[
                {required: true, message: "Please, input password!"}
            ]} wrapperCol={{ sm: 24 }}>
                <Password placeholder="password"/>
            </Form.Item>
            <Form.Item className="form-upload" name="avatar">
                <Upload
                    action="/"
                    listType="picture"
                    accept="image/png,image/jpeg,image/jpg"
                    maxCount={1}
                    beforeUpload={(file) => {
                        if(file.size && file.size > 1097152){
                            alert("File is too big!");
                            return true;
                        }
                        setFile(file);
                        return false;
                    }}
                    onRemove={handleRemove}
                >
                    <Button>Click Upload avatar</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2}} >
                <Button type="primary" htmlType="submit" className="form-button">
                    Register
                </Button>
                <div>{error}</div>
            </Form.Item>

        </Form>

    );
};

export default RegisterPage;