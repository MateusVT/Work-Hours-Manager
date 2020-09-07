import MaterialTable, { Column } from 'material-table';
import React from 'react';
import tableIcons from '../utils/TableIcons';

interface TableState {
    columns: Array<Column<any>>;
    data: any[];
}


type TableProps = {
    items: any[]
    columns: Array<Column<any>>
    pageSize: number
    title: string
    selectedItem?: (id?: any) => void
    itemAdd?: (item: any) => void
}

export default function CustomTable(props: TableProps) {
    const { title, pageSize } = props
    const [state, setState] = React.useState<TableState>({
        columns: props.columns,
        data: props.items
    });

    return (
        <MaterialTable
            options={{ pageSize: pageSize }}
            style={{ width: "100%" }}
            title={title}
            columns={state.columns}
            data={state.data}
            icons={tableIcons as any}
            isLoading={state.data.length == 0}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}