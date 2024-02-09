import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import { useTable, useSortBy, usePagination } from "react-table";
import AdminScreen from "../components/AdminScreen/AdminScreen";
import { userColumns } from "../components/AdminTable/TableColumns";
import AdminLayout from "../components/Layouts/AdminLayout/AdminLayout";
import { Select } from "@mui/material";
//-------------------------<DATA SHOULD BE IN THIS ORDER ONLY-- id,name,customerName,date,smount,status------------>
const data = [
  {
    id: "User#1",
    prodName: "John Deer",
    role: "Dealer",
    isVerified: false,
    mobile: "+1 5494305",
  },
  {
    id: "User#1",
    prodName: "John Deer",
    role: "Dealer",
    isVerified: true,
    mobile: "+1 5494305",
  },
];

const columns = userColumns;

function AdminUsers() {
  const [search, setSearch] = useState("");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    state: { pageIndex },
    pageCount,
    previousPage,
    prepareRow,
  } = useTable({ columns, data }, useSortBy, usePagination);
  return (
    <>
      <div className="bg-slate-100 p-2 w-full">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-3xl mt-4 mb-4 text-gray-900">Users</h1>
          <div className=" flex flex-row items-stretch justify-center">
            <input
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search in Users"
              className="bg-gray-50 border outline-none text-gray-900 rounded-l-lg focus:border-[#ffe26e] block w-full px-3"
            />
            <div className="w-fit flex justify-start">
              <button
                type="submit"
                className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-r-lg text-sm px-4 py-2.5 text-center"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-md">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-gray-50">
              {headerGroups.map((hg) => (
                <tr {...hg.getHeaderGroupProps()}>
                  {hg.headers.map((column, index) =>
                    index + 1 !== hg.headers.length ? (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.render("Header")}
                        {column.isSorted && (
                          <span className="inline-block text-black ml-2 ">
                            {" "}
                            {column.isSortedDesc ? (
                              <FaArrowDownShortWide />
                            ) : (
                              <FaArrowUpWideShort />
                            )}
                          </span>
                        )}
                      </th>
                    ) : (
                      <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    )
                  )}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      if (index === 3) {
                        return (
                          <td className="px-4 py-2 whitespace-nowrap overflow-hidden">
                            {cell.value ? (
                              <div className="w-full flex justify-start">
                                <button
                                  disabled={true}
                                  type="submit"
                                  className=" w-fit text-black hover:text-black bg-[#ffe26e] duration-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                                >
                                  Verified
                                </button>
                              </div>
                            ) : (
                              <div className="w-full flex justify-start">
                                <button
                                  type="submit"
                                  className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                                ></button>
                              </div>
                            )}
                          </td>
                        );
                      } else if (index + 1 === row.cells.length) {
                        return (
                          <td className="px-4 py-2 whitespace-nowrap overflow-hidden">
                            <div className="w-full flex justify-start">
                              <Link to={`/products/edit/${row.cells[0].value}`}>
                                <button
                                  type="submit"
                                  className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                                >
                                  View User
                                </button>
                              </Link>
                            </div>
                          </td>
                        );
                      } else if (index + 1 !== row.cells.length) {
                        return (
                          <td
                            className="px-6 py-2 whitespace-nowrap overflow-hidden"
                            {...cell.getCellProps()}
                          >
                            <div className="text-sm text-gray-900">
                              {cell.render("Cell")}
                            </div>
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex p-3 flex-row justify-center items-center">
            <div className="">
              <button
                onClick={previousPage}
                type="submit"
                className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center"
              >
                Previous
              </button>
            </div>
            <div className=" px-3">
              {pageIndex + 1} of {pageCount}
            </div>
            <div className="">
              <button
                onClick={nextPage}
                type="submit"
                className="Registration-button w-fit text-black hover:text-white bg-[#ffe26e] duration-300 hover:bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;