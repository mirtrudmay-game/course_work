import {IClient} from "../../types/types";
import {FC} from "react";
import {ITable} from "../boxes/BoxesTable";
import {useRowSelect, useTable} from "react-table";
import {boxesStore} from "../../store/BoxesStore";
import {IndeterminateCheckbox} from "../boxes/IndeterminateCheckbox";
import BTable from "react-bootstrap/Table";


export const ClientsTable:FC<ITable> = ({ data, columns}) => {
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