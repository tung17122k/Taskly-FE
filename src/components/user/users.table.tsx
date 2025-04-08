import { useEffect, useState } from "react";
import { Table, notification, Button, Popconfirm } from 'antd';
import { ColumnsType } from "antd/es/table";
// @ts-ignore
import axios from '@/utils/axios.customize.ts';

const UsersTable = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [listUsers, setListUsers] = useState<IUserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataUpdate, setDataUpdate] = useState<null | IUserData>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getData()
    }, [page, limit])

    const getData = async () => {
        const res = await axios.get(`http://localhost:8080/v1/api/user?limit=${limit}&page=${page}`);
        console.log(res);
        setListUsers(res.data.data);
        setLoading(false)
        setTotal(res.data.total);
    }

    const handleOnChange = (page: number, pageSize: number) => {
        setPage(page);
    }


    const columns: ColumnsType<IUserData> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {


                return (<a>{record.email}</a>)
            }
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <>
                        <Button

                            onClick={() => {
                                console.log(record)
                                setDataUpdate(record);
                                setIsUpdateModalOpen(true)
                            }}>
                            Edit
                        </Button>
                        {/* <Popconfirm
                            title="Delete the user"
                            description={`Are you sure to delete this user ${record.username}?`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                className='button-delete'
                                danger
                            >
                                Delete
                            </Button>
                        </Popconfirm> */}
                    </>
                )
            }
        },
    ];

    return (
        <div style={{ padding: "50px" }}>
            <div className="flex">
                <h2>Table Users</h2>
                <div><button onClick={() => setIsCreateModalOpen(true)}>Add new</button></div>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
                loading={loading}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: total,
                    showTotal: (total) => `Total ${total} items`,
                    onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize),
                    showSizeChanger: true

                }}
            />
        </div>
    )
}

export default UsersTable;