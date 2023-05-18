import {Column, Row, useRowSelect, useTable} from 'react-table';
import BTable from 'react-bootstrap/Table';
import {FC} from "react";
import {Box, Renter} from "../../types/types";
import {boxesStore} from "../../store/BoxesStore"
import {observer} from "mobx-react-lite";
import {IndeterminateCheckbox} from "./IndeterminateCheckbox";

export interface ITable<T> {
    columns: Column[];
    data: T[];
    selectRowCallback?: (value: T) => void;
    onlyOneValue?: boolean;
}

function Table<T extends Object> ({columns, data, selectRowCallback, onlyOneValue}: ITable<T>) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        toggleRowSelected
    } = useTable(
        {
            columns,
            data,
            stateReducer: (newState, action) => {
                if (onlyOneValue) {
                    if (action.type === "toggleRowSelected") {

                        newState.selectedRowIds = {
                            [action.id]: action.value
                        }
                    }

                }

                return newState;
            },
        },
        useRowSelect,
/*        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <div>
                            { !onlyOneValue && <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />}
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
        }*/
    )

    function selectRowHandler(e: React.MouseEvent<HTMLTableRowElement>, row: Row) {
        selectRowCallback?.(data[row.index]);
        toggleRowSelected(row.id, !row.isSelected);
    }

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
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr style={{background: row.isSelected ? "lightgrey" : "white" }} onClick={(e) => selectRowHandler(e, row)} {...row.getRowProps()}>
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

export default observer(Table);


