/* eslint-disable */
import { Link } from "react-router-dom";

/**
 * Ant Design
 */
import { Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import type { PresetColorType } from 'antd/es/_util/colors';
import type { LiteralUnion } from 'antd/es/_util/type';

const color: React.FC<{ role: { id: number; name: string } }> = ({ role }) => {
    if (role?.id === 1) { return 'volcano'; }
    else if (role?.id === 2) { return 'blue'; }
    else if (role?.id === 3) { return 'green'; }
}

export const columns = (showModal: (key: string) => void) => [
    {
        title: 'ID',
        dataIndex: 'uuid',
        key: 'uuid',
        hidden: true,
        render: (text: string, record: { uuid: string }) => <Link onClick={() => {console.log(record); showModal(record.uuid)}} to={``}>{text}</Link>,
    },
    {
        title: 'Display Name',
        dataIndex: 'display_name',
        key: 'display_name',
        render: (text: string, record: { uuid: string }) => <Link onClick={() => {console.log(record); showModal(record.uuid)}} to={``}>{text}</Link>,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: (text: string, record: { uuid: string }) => <Link onClick={() => {showModal(record.uuid)}} to={``}>{text}</Link>,
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
        dataIndex: 'role',
        key: 'role',
        render: (role: { id: number; name: string }) => <Tag color={color({ role }) as LiteralUnion<PresetColorType, string>} key={role?.id}> {role.name} </Tag>,
    },
    {
        title: 'Action',
        key: 'action',
        responsive: ['md'] as Breakpoint[], // Ép kiểu ở đây,
        render: (_: any, record: { key: string }) => (
            <Space size="middle">
                <Link to={``}><EditOutlined key="edit" /></Link> {/* /admin/user/${record.key}/edit */}
                <Link to={``}><DeleteOutlined key="delete" /></Link> {/* /admin/user/${record.key}/delete */}
            </Space>
        ),
    },
];