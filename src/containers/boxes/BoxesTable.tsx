import {Column, useRowSelect, useTable} from 'react-table';
import BTable from 'react-bootstrap/Table';
import {FC} from "react";
import {IBoxView} from "../../types/types";
import {boxesStore} from "../../store/BoxesStore"
import {observer} from "mobx-react-lite";
import {IndeterminateCheckbox} from "./IndeterminateCheckbox";

export interface ITable {
    columns: Column[];
    data: IBoxView[];
}

const BoxesTable: FC<ITable> = ({columns, data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            stateReducer: (newState, action) => {
                if (action.type === "toggleRowSelected") {
                    boxesStore.setSelectedBoxes(newState.selectedRowIds);

                    // Только одна строка.
                    /*newState.selectedRowIds = {
                        [action.id]: true
                    }*/
                }

                return newState;
            },
        },
        useRowSelect,
        hooks => {

            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),

                    Cell: ({row}) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    return (
        <BTable bordered {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.slice(0, 10).map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </BTable>
    )
}

export default observer(BoxesTable);


