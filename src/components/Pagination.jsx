'use client'
import React, { useState } from "react";
import { Paginator } from 'primereact/paginator';

const  Pagination = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(3);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={5} rowsPerPageOptions={[3, 5, 10]} onPageChange={onPageChange} />
        </div>
    );
}

export default Pagination;
        