/* eslint-disable */
import React, { useMemo, useRef } from "react";

import { Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProList, ProTable } from '@ant-design/pro-components';


export const TableData = ({ actionRef, formRef, rowKey, headerTitle, columns, searchConfig, request }) => {
    const tablePropsConfig = useMemo(() => ({
        actionRef: actionRef,
        formRef: formRef,
        rowKey: rowKey,
        headerTitle: headerTitle,
        columns: columns,
        options: {
            show: true,
            density: false,
            fullScreen: true,
            setting: false,
        },
        search: {
            collapsed: false,
            collapseRender: false,
            optionRender: (searchConfig, formProps, dom) => [
                React.cloneElement(dom[0], { children: "Clear" }),
                React.cloneElement(dom[1], { children: 'Search' }),
            ],
            ...(searchConfig || {}),
        },
        toolBarRender: () => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => { }} type="primary" >
                Add
            </Button>
        ],
        request: request,
    }), [])
    return (
        <React.Fragment>
            <ProTable {...tablePropsConfig} />
        </React.Fragment>
    );
}