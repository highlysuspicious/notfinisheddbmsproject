import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, usePagination } from 'react-table';
import './PassengerList.css'; // Assuming you have a CSS file for styling

const Payment = ({ userId }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.post('http://localhost:5127/payment', {
                    passengerId: userId
                });
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
    }, [userId]);

    const columns = React.useMemo(() => [
        { Header: 'Payment ID', accessor: '0' },
        { Header: 'Date', accessor: '1' },
        { Header: 'Amount', accessor: '2' },
        { Header: 'Fine', accessor: '3' },
        { Header: 'Status', accessor: '4' }
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
            <h1>Payment List</h1>
            {error && <div>Error: {error}</div>}
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                const { key, ...rest } = column.getHeaderProps(column.getSortByToggleProps());
                                return (
                                    <th key={key} {...rest} className="table-header">
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        const { key, ...rest } = row.getRowProps();
                        return (
                            <tr key={key} {...rest}>
                                {row.cells.map(cell => {
                                    const { key, ...rest } = cell.getCellProps();
                                    return (
                                        <td key={key} {...rest} className="table-cell">
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
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

export default Payment;
