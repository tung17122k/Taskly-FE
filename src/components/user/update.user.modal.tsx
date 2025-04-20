import { Input, Modal, notification, Form, Radio, InputNumber, Select, FormProps } from "antd";
// @ts-ignore
import axios from '@/utils/axios.customize.ts';
import { useEffect, useState } from "react";
interface IProps {
    getData: () => void;
    dataUpdate: IUserData | null;
    setDataUpdate: (data: IUserData | null) => void;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (isOpen: boolean) => void;
}


const UpdateUserModal = (props: IProps) => {
    const { getData, dataUpdate, setDataUpdate, isUpdateModalOpen, setIsUpdateModalOpen } = props;
    // console.log("data update", dataUpdate);
    const [form] = Form.useForm();



    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                username: dataUpdate.username,
                role: dataUpdate.role
            })
        }
        console.log(dataUpdate);

    }, [dataUpdate])

    const handleCloseCreateModal = () => {
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        form.resetFields();
    }


    const onFinish: FormProps['onFinish'] = async (values) => {
        const { username, role } = values;

        if (dataUpdate) {
            const data = {
                userId: dataUpdate._id,
                username: username,
                role: role
            }
            try {
                const res = await axios.put(`http://localhost:8080/v1/api/user`, data)
                // console.log(">>>>check res", res);
                if (res.status === 200) {
                    await getData();
                    notification.success({
                        message: "Update user thành công",
                    })
                    handleCloseCreateModal();
                } else {
                    notification.error({
                        message: "Đã có lỗi xảy ra!",
                    })
                }
            } catch (error) {
                console.log("error", error);
                notification.error({
                    message: "Đã có lỗi xảy ra!",
                })
            }

        }
    }

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Update user"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseCreateModal()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Role" name="role">
                    <Select>
                        <Select.Option value="admin">ADMIN</Select.Option>
                        <Select.Option value="customer">Customer</Select.Option>
                        <Select.Option value="shipper">SHIPPER</Select.Option>
                    </Select>
                </Form.Item>



            </Form>
        </Modal>
    )
}

export default UpdateUserModal;