"use client";
import React from "react";

export const Table = ({ headers = [], data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {headers.map((head) => {
              return <th>{head?.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                {headers?.map((head) => {
                  return <td>{row[head?.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
