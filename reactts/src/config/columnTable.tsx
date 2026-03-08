/* eslint-disable */
import { Link } from "react-router-dom";

/**
 * Ant Design
 */
import { Tag, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import type { PresetColorType } from 'antd/es/_util/colors';
import type { LiteralUnion } from 'antd/es/_util/type';

const color: React.FC<{ roles: { id: number; name: string } }> = ({ roles }) => {
    if (roles?.id === 1) { return 'volcano'; }
    else if (roles?.id === 2) { return 'blue'; }
    else if (roles?.id === 3) { return 'green'; }
}

export const columns = (showModal: (key: string) => void) => [
    {
        title: 'ID',
        dataIndex: 'uuid',
        key: 'uuid',
        hidden: true,
        search: false,
        render: (text: string, record: { uuid: string }) => <Link onClick={() => { showModal(record.uuid) }} to={``}>{text}</Link>,
    },
    {
        title: 'Name',
        dataIndex: 'display_name',
        key: 'display_name',
        render: (text: string, record: { uuid: string }) => <Link onClick={() => { showModal(record.uuid) }} to={``}>{text}</Link>,
    },
    {
        title: 'User Name',
        dataIndex: 'user_name',
        key: 'user_name',
        render: (text: string, record: { uuid: string }) => <Link onClick={() => { showModal(record.uuid) }} to={``}>{text}</Link>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (text: string) => <span>{text}</span>,
    },
    {
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        render: (roles: { id: number; name: string }) => <Tag color={color({ roles }) as LiteralUnion<PresetColorType, string>} key={roles?.id}> {roles.name} </Tag>,
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        responsive: ['md'] as Breakpoint[], // Ép kiểu ở đây,
        search: false,
        render: (_: any, record: { key: string }) => (
            <Space size="small">
                <Button icon={<EditOutlined />} key="edit" color="primary" variant="outlined" /> {/* /admin/user/${record.key}/edit */}
                <Button icon={<DeleteOutlined />} key="delete" color="danger" variant="outlined" /> {/* /admin/user/${record.key}/delete */}
            </Space>
        ),
    },
];