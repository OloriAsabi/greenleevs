import React, {useMemo, useEffect, useState, useRef } from 'react'
import { useTable,
   useGlobalFilter, 
   useAsyncDebounce,  
   usePagination,
   useFilters
} from "react-table";
import {DOTS, useCustomPagination} from './useCustomPagination';
import { classNames } from '../utils/utils';
import { Button, PageButton } from '../utils/Button';
import { DeleteOrders, GetOrderById, GetOrders } from '../apis/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaSearchPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Spinner from './Spinner';



export function GlobalFilter({
    globalFilter,
    setGlobalFilter,
  }) {
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          className='w-full rounded-xl border p-4 text-gray-500 cursor-pointer' 
          type="search"  
          placeholder="Search by phone"
        />
    )
  };  

  export function StatusPill({ value }) {
    const status = value ? value : "unknown";
  
    return (
      <span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          status.startsWith("Delivered") ? "bg-green-100 text-green-700" : null,
          status.startsWith("Pending") ? "bg-yellow-100 text-yellow-700" : null,
          status.startsWith("Processing") ? "bg-orange-100 text-orange-700" : null,
          status.startsWith("Cancel") ? "bg-red-100 text-red-700" : null
        )}
      >
        {status}
      </span>
    );
  }

  export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
    return (
      <select
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        className="w-full rounded-xl border p-4 text-gray-500 cursor-pointer"
      >
        <option value="All">
            All
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const data =  useMemo(() => [...orders], [orders])
  const [isLoading, setIsLoading] = useState(false)
  const ordersRef = useRef();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  console.log("Datas", data);

  ordersRef.current = orders;
     
  useEffect(() => {
    setIsLoading(true)

    GetOrders()
    .then((response) => {
      console.log(response);

    const data = response.data.data
      
    setOrders(data)
    setIsLoading(false)
    }).catch((e) => {
    console.log(e);
    });
  },[]);

const ordersId = (rowIndex) => {
  const id = ordersRef.current[rowIndex].id;
  
  GetOrderById(id)
  navigate("/orders/" + id);
};

const handleDelete = (rowIndex) => {
  const id = ordersRef.current[rowIndex].id;
  DeleteOrders(id).then(() => {
    navigate('/orders')

    let newOrders = [...ordersRef.current];
    newOrders.splice(rowIndex, 1)

    setOrders(newOrders);
    enqueueSnackbar('Orders Deleted Successful', { variant: 'success' });
  })
  .catch((e) => {
    console.log(e);
    enqueueSnackbar('Orders delete Failed', { variant: 'error' });
  });
}
const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "TIME",
      accessor: "created_at",
    },
    {
        Header: "Shipping Address",
        accessor: "shipping_address",
    },
    {
        Header: "PHONE",
        accessor: "phone_number",
    },
    {
        Header: "Method",
        accessor: "pay_method",
    },
    {
        Header: "Amount",
        accessor: "amount",
        Cell:({value}) => (
          <div>
            ${value}
          </div>
      )
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: StatusPill,
      Filter: SelectColumnFilter,  // new
      filter: 'includes',  // new  
    },
    {
      Header: "Actions",
      Cell: (props) => {
        const rowIdx = props.row.id; 
        return (
          <div className='flex gap-5'>
            <span onClick={() =>handleDelete(rowIdx)}>
            <AiFillDelete/>
            </span>
          </div>
        );
      },
    },    
    {
      Header: "Invoice",
      Cell: (props) => {
        const rowIdx = props.row.id;
        return (
          <div>
             <div onClick={() => ordersId(rowIdx)}>
              <FaSearchPlus/>
             </div>
          </div>
      )
    },
    },
], []);

const { 
    getTableProps,
    getTableBodyProps, 
    headerGroups, 
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state, 
    preGlobalFilteredRows,
    setGlobalFilter,  } =
    useTable({
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 5},
    },
    useGlobalFilter,
    useFilters, 
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

  return (
    <div>
    <div className='grid items-center text-center lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-5 p-5 mb-10 border-white shadow rounded-xl'>
        <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
         />

        {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column) =>
            column.Filter ? (
                <div key={column.id} className='flex space-x-3'>
                <label htmlFor={column.id} className='pt-4 font-normal w-full'>{column.render("Header")}: </label>
                {column.render("Filter")}
                </div>
            ) : null
            )
        )}
        </div>

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

export default OrdersTable