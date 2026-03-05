/* eslint-disable */
import React, { useMemo } from "react";

/**
 * Component
 */
import { Button} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from '@ant-design/pro-components';

type TableDataProps = {
    actionRef: React.RefObject<any>,
    formRef: React.RefObject<any>,
    rowKey: string,
    headerTitle: string,
    columns: any,
    searchConfig: any,
    request: (params: any, sort: any, filter: any) => Promise<any>,
}

export const TableData = ({ actionRef, formRef, rowKey, headerTitle, columns, searchConfig, request }: TableDataProps) => {
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
            optionRender: (searchConfig: any, formProps: any, dom: any) => [
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