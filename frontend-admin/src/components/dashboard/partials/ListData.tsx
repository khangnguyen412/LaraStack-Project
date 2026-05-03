/* eslint-disable */
import React, { useMemo, } from "react";

import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ProList } from '@ant-design/pro-components';

/**
 * Type
 */
type ListDataProps = {
    actionRef: React.RefObject<any>;
    formRef: React.RefObject<any>;
    headerTitle: string;
    metas:  Record<string, any>;
    actions: any;
    searchConfig: any;
    toolBarRender: () => React.ReactNode[];
    request: any;
}

export const ListData = ({ actionRef, formRef, headerTitle, metas, actions, searchConfig, toolBarRender,  request }: ListDataProps) => {
    const proListPropsConfig = useMemo(() => ({
        formRef: formRef,
        actionRef: actionRef,
        headerTitle: headerTitle,
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
        pagination: {
            showQuickJumper: true,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showTotal: (total: number) => `Total ${total} items`,
            showLessItems: true,
            size: "small" as "small",
            align: "center" as "center",
        },
        options: {
            show: true,
            density: false,
            fullScreen: true,
            setting: false,
        },
        toolBarRender: toolBarRender,
        request: request || {},
    }), [actionRef, formRef, headerTitle, metas, actions, searchConfig, toolBarRender, request])

    return (
        <React.Fragment>
            <ProList {...proListPropsConfig} />
        </React.Fragment>
    )
}