import { Form, FormProps, Input, Modal, notification } from "antd";
// @ts-ignore
import axios from '@/utils/axios.customize.ts';
import { postCategoryApi } from "../../utils/api";

interface IProps {
    isCreateModalOpen: boolean;
    getData: () => void;
    setIsCreateModalOpen: (isOpen: boolean) => void;
}

const CreateCategoryModal = (props: IProps) => {
    const { isCreateModalOpen, getData, setIsCreateModalOpen } = props;
    const [form] = Form.useForm();

    const onFinish: FormProps['onFinish'] = async (values) => {
        // lay data

        const { name } = values;
        const data = { name };
        // console.log("data", data);

        // gui data len sever

        const res = await postCategoryApi(data);
        // console.log(">>>>res", res);

        if (res.status === 200) {
            //success
            await getData();
            notification.success({
                message: "Tạo mới category thành công!",
            })
            handleCloseCreateModal();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
            })
        }
    };

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    }

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Add new category"
            open={isCreateModalOpen}
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your category name!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default CreateCategoryModal;