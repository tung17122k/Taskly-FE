import { Button, notification, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
// @ts-ignore
import axios from '@/utils/axios.customize.ts';
import CreateCategoryModal from "./create.category.modal";
import { deleteCategoryApi, getCategoryApi } from "../../utils/api";


const CategoryTable = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [listCategories, setListCategories] = useState<ICategoryData[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await getCategoryApi();
        // console.log(res);
        setListCategories(res.data.data);
        setLoading(false)
    }

    const confirm = async (category: ICategoryData) => {
        if (!category._id) return;
        const res = await deleteCategoryApi(category._id);

        if (res.status === 200) {
            notification.success({
                message: res.data.message
            })
            getData();
        } else {
            notification.error({
                message: res.data.message
            })
        }
    };


    const columns: ColumnsType<ICategoryData> = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            render: (value, record) => {
                return (<a>{record.name}</a>)
            }
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <>
                        <Popconfirm
                            title="Delete the category"
                            description={
                                <>
                                    Are you sure to delete this category{" "}
                                    <span style={{ color: 'red' }}>{record.name}</span>?
                                </>
                            }
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
                        </Popconfirm>
                    </>
                )
            }
        },
    ];


    return (
        <>
            <div style={{ padding: "50px" }}>
                <div className="flex">
                    <h2>Table Category</h2>
                    <div><button onClick={() => setIsCreateModalOpen(true)}>Add new</button></div>
                </div>
                <Table
                    columns={columns}
                    dataSource={listCategories}
                    rowKey={"_id"}
                    loading={loading}
                />

                <CreateCategoryModal
                    getData={getData}
                    isCreateModalOpen={isCreateModalOpen}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />
            </div>
        </>
    )
}

export default CategoryTable