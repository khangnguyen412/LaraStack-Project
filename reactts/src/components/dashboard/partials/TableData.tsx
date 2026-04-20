/* eslint-disable */
import React, { useMemo, } from "react";

/**
 * Component
 */
import { ProTable } from '@ant-design/pro-table';

/**
 * TableDataProps
 */
import type { ProColumns } from '@ant-design/pro-table';

type TableDataProps = {
    actionRef: React.RefObject<any>,
    formRef: React.RefObject<any>,
    rowKey: string,
    headerTitle: string,
    columns: ProColumns[],
    searchConfig: any,
    toolBarRender: () => React.ReactNode[],
    request: (params: any, sort: any, filter: any) => Promise<any>,
}

export const TableData = ({ actionRef, formRef, rowKey, headerTitle, columns, searchConfig, toolBarRender, request }: TableDataProps) => {
    const tablePropsConfig = useMemo(() => ({
        actionRef,
        formRef,
        rowKey,
        headerTitle,
        columns,
        search: {
            collapsed: false,
            collapseRender: false,
            optionRender: (_: any, __: any, dom: any) => [
                React.cloneElement(dom[0], { children: "Clear" }),
                React.cloneElement(dom[1], { children: 'Search' }),
            ],
            ...(searchConfig || {}),
        },
        pagination: {
            defaultPageSize: 10,          // thiết lập pageSize mặc định là 10
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],
        },
        options: {
            show: true,
            density: false,
            fullScreen: true,
            setting: false,
        },
        toolBarRender: toolBarRender,
        request: request,
    }), [actionRef, formRef, rowKey, headerTitle, columns, searchConfig, toolBarRender, request])
    return (
        <React.Fragment>
            <ProTable {...tablePropsConfig} />
        </React.Fragment>
    );
}