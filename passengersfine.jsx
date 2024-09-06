import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, usePagination } from 'react-table';
import './PassengerList.css'; // Assuming you have a CSS file for styling

const Passengerfine = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:5127/passengersfine');
                console.log('API Response:', response.data);
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };

        fetchPayments();
    }, []);

    const columns = React.useMemo(() => [
        { Header: 'Passenger ID', accessor: '0' },
        { Header: 'Name', accessor: '1' },
        { Header: 'Email', accessor: '2' },
        { Header: 'Payment ID', accessor: '3' },
        { Header: 'Date', accessor: '4' },
        { Header: 'Amount', accessor: '5' },
        { Header: 'Fine', accessor: '6' },
        { Header: 'Status', accessor: '7' }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        useSortBy,
        usePagination
    );

    return (
        <div>
            <h1>Payment Fine List</h1>
            {error && <div>Error: {error}</div>}
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="table-header"
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="table-cell"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Passengerfine;
