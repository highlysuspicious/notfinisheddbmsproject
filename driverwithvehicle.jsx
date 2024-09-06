import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useSortBy, usePagination } from 'react-table';
import './PassengerList.css'; // Assuming you have a CSS file for styling

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:5127/drivers');
                console.log('API Response:', response.data); // Log the response for debugging
                if (Array.isArray(response.data)) {
                    setDrivers(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };

        fetchDrivers();
    }, []);

    const data = React.useMemo(() => drivers, [drivers]);

    const columns = React.useMemo(() => [
        { Header: 'Driver ID', accessor: 'id' },
        { Header: 'Driver Name', accessor: 'name' },
        { Header: 'Driver Email', accessor: 'email' },
        { Header: 'Date of Birth', accessor: 'date_of_birth' },
        { Header: 'Street', accessor: 'street' },
        { Header: 'Block', accessor: 'block' },
        { Header: 'Avenue', accessor: 'avenue' },
        { Header: 'Area', accessor: 'area' },
        { Header: 'Vehicle Plate No', accessor: 'vehicle.plate_no' },
        { Header: 'Vehicle Type', accessor: 'vehicle.type' },
        { Header: 'Parking Slot', accessor: 'vehicle.parking_slot' },
        { Header: 'Total Seats', accessor: 'vehicle.total_seats' },
        { Header: 'Available Seats', accessor: 'vehicle.available_seats' },
        { Header: 'Feedback Score', accessor: 'vehicle.feedbackscore' },
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
            <h1>Driver List</h1>
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

export default DriverList;
