import React, {useMemo, useEffect, useState } from 'react'
import { useTable,
    usePagination } from "react-table";
import { Button, PageButton } from '../utils/Button';
import { classNames } from '../utils/utils';
import {DOTS, useCustomPagination} from './useCustomPagination';
import { GetRecentOrder } from '../apis/api';
import Spinner from './Spinner';

export function StatusPill({ value }) {
    const status = value ? value : "unknown";
  
    return (
      <span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          status.startsWith("Successful") ? "bg-green-100 text-green-700" : null,
          status.startsWith("Pending") ? "bg-yellow-100 text-yellow-700" : null,
          status.startsWith("Failed") ? "bg-red-100 text-red-700" : null
        )}
      >
        {status}
      </span>
    );
  }

const Table = () => {
    const [recent, setRecent] = useState([]);
    const data =  useMemo(() => [...recent], [recent])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
    
        GetRecentOrder()
        .then((response) => {
        // console.log('Recent', response);
        const data = response.data.data
          
        setRecent(data)
    
        setIsLoading(false)
        }).catch((e) => {
        console.log(e);
        });
      },[]);
  
  
    const columns = useMemo(() => [
      {
        Header: "Order Time",
        accessor: "created_at",
      },

      {
        Header: "Delivery Address",
        accessor: "shipping_address",
      },
      {
        Header: "Phone",
        accessor: "phone_number",
      },
      {
        Header: "Payment Method",
        accessor: "pay_method",
      },
      {
        Header: "Order Amount",
        accessor: "amount",
        Cell: ({ value }) => (
            <div>
              ${value}
            </div>
            )
      },
      {
        Header: "Trans.Status",
        accessor: "status",
        Cell: StatusPill,
      },
     
], []);

const { getTableProps,
    getTableBodyProps, 
    headerGroups, 
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    state, } =
    useTable({
    columns,
    data,
    },
    usePagination, 
    );
    const {pageIndex} = state;
    const paginationRange = useCustomPagination({
      totalPageCount: pageCount,
      currentPage: pageIndex
  });

    useEffect(() => {
          setPageSize(5);
    }, [setPageSize]);
    

    return(
        <div>
          <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {isLoading
                  ? <Spinner/> 
                  :
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-10">
                      {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                  <th {...column.getHeaderProps()}
                                  className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
                                  >
                                    {column.render("Header")}
                                   </th>
                              ))}
                          </tr>
                      ))}
                  </thead>
                  <tbody {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200">
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                          <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                              return <td {...cell.getCellProps()} className="px-6 py-10 whitespace-nowrap">{cell.render("Cell")}</td>
                          })}
                          </tr>
                      );
                      })}
                  </tbody>
                    </table>
                }
                </div>
              </div>
          </div>
         </div>

         <div className="py-3 flex items-center text-end justify-end pt-10">
         <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div className="flex-1 flex pl-3 justify-between md:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" aria-label="Pagination">
          <div className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10" aria-label="Pagination">
                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <PageButton
                            key={index}>...</PageButton>
                        );
                    }

                    if ((pageNumber - 1) === pageIndex) {
                        return (
                            <PageButton
                                key={index}
                                className=' active:bg-gray-500 active:border-gray-300'
                                onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</PageButton>
                        );
                    }

                    return (
                        <PageButton
                            key={index}
                            className='active:bg-gray-500 active:border-gray-300'
                            onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</PageButton>
                    );
                })}
             </div>
          </div>
            </div>

        </div>
    )
}

export default Table