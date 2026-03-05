/* eslint-disable */
import React, { useMemo, useRef } from "react";

import { Button } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { ProList } from '@ant-design/pro-components';

/**
 * Type
 */
type ListDataProps = {
    actionRef: any;
    formRef: any;
    headerTitle: any;
    metas: any;
    actions: any;
    searchConfig: any;
    request: any;
}

export const ListData = ({ actionRef, formRef, headerTitle, metas, actions, searchConfig, request }: ListDataProps) => {
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
            showTotal: (total: number, range: number[]) => `Total ${total} items`,
            showLessItems: true,
            size: "small" as "small",
            align: "center" as "center",
        },
        metas: {
            ...metas,
            actions: actions || {
                render: (_: any, record: any) => [
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
            // optionRender: (_: any, searchConfig: any, formProps: any, dom: any) => [
            //     React.cloneElement(dom[0], { children: 'Clear' }),
            //     React.cloneElement(dom[1], { children: 'Search' }),
            // ],
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