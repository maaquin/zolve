import React from 'react';

const Invoice = ({ invoiceData }) => {

    console.log('hola')

    if (!invoiceData) return null;

    console.log('hola 2')

    return (
        <div className="invoice">
            <h2>Invoice</h2>
            <p>Date: {invoiceData.date}</p>
            <p>Client: {invoiceData.clientName}</p>
            <p>Amount: ${invoiceData.amount.toFixed(2)}</p>
            <h3>Items:</h3>
            <ul>
                {invoiceData.items.map((item, index) => (
                    <li key={index}>
                        {item.name}: ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <button onClick={() => window.print()}>Print Invoice</button>
        </div>
    );
};

export default Invoice;