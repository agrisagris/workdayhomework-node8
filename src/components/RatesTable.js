import React from "react";

export default function RatesTable({ rates, showDialog, toogleShowDialog }) {
  if (rates?.error)
    return (
      <>
        {showDialog && (
          <>
            <div className="modal-overlay">
              <div className="modal-content">
                <p>Error retrieving data</p>
                <button type="button" onClick={toogleShowDialog}>
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  if (rates?.loading) return <div>Loading</div>;
  if (rates?.data?.rates)
    return (
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates?.data?.rates).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  return "";
}
