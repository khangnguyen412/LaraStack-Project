/* eslint-disable */
import React, { useMemo, useRef } from "react";

import { Button, Space, Tag } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { ProList } from '@ant-design/pro-components';

export const ListData = ({ actionRef, formRef, headerTitle, metas, actions, searchConfig, request }) => {
    const proListPropsConfig = useMemo(() => ({
        formRef: formRef,
        actionRef: actionRef,
        headerTitle: headerTitle,
        options: {
            show: true,
            density: false,
            fullScreen: true,
            setting: false,
        },
        pagination: {
            showQuickJumper: true,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showTotal: false,
            showLessItems: true,
            size: "small",
            align: "center"
        },
        metas: {
            ...metas,
            actions: actions || {
                render: (_, record) => [
                    <div key="actions" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {/* <ConfirmDelete itemName={record.name} onConfirm={deleteRole} key={`delete-${record.id}`} /> */}
                        <Button variant="outlined" icon={<EditOutlined />} size="small" color="primary" onClick={() => { console.log(123) }} key={`update-${record.id}`} />
                    </div>,
                ],
            },
        },
        search: {
            collapsed: false,
            collapseRender: false,
            optionRender: (searchConfig, formProps, dom) => [
                React.cloneElement(dom[0], { children: 'Clear' }),
                React.cloneElement(dom[1], { children: 'Search' }),
            ],
            ...(searchConfig || {})
        },
        toolBarRender: () => [
            <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => { }}>
                Add
            </Button>,
        ],
        request: request || {},
    }), [])

    return (
        <React.Fragment>
            <ProList {...proListPropsConfig} />
        </React.Fragment>
    )
}