import React, {useMemo, useEffect, useState, useRef } from 'react'
import { useTable,
   useGlobalFilter, 
   useAsyncDebounce,  
   usePagination,
   useFilters
} from "react-table";
import {DOTS, useCustomPagination} from './useCustomPagination';
import { Button, PageButton } from '../utils/Button';
import { DeleteCustomers, GetCustomers } from '../apis/api';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CustomerModal from './CustomerModal';
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
          placeholder="Search by name/email/phone"
        />
    )
  };  

const CustomersTable = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [customers, setCustomers] = useState([]);
  const data =  useMemo(() => [...customers], [customers]);
  const [isLoading, setIsLoading] = useState(false)
  const customerRef = useRef();
  const navigate = useNavigate();

  customerRef.current = customers;

     
  useEffect(() => {
   
    setIsLoading(true)

    GetCustomers()
    .then((response) => {
    const data = response.data.data.data     
    setCustomers(data)
    setIsLoading(false)
    }).catch((e) => {
    console.log(e);
    });
  },[]);

  const handleDelete = (rowIndex) => {
    const id = customerRef.current[rowIndex].id;

    DeleteCustomers(id).then(() => {
      navigate('/customers')

      let newCustomers = [...customerRef.current];
      newCustomers.splice(rowIndex, 1)

      setCustomers(newCustomers);
      toast.success('Customer Deleted Successful');
    })
    .catch((e) => {
      console.log(e);
      toast.error('Customer delete Failed');
    });
  }

    const columns = useMemo(() => [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Joining Date",
          accessor: "created_at",
        },
        {
          Header: "Name",
          accessor: "username",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Phone",
          accessor: "phone_number",
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
        <div className='grid items-center text-center lg:grid-cols-2 md:grid-cols-2  sm:grid-cols-1 gap-5 p-5 mb-10 border-white shadow rounded-xl'>
        <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
         />
               <div className='w-4/8'>
        <button className='p-3 bg-[#1F451A] text-white text-center rounded cursor-pointer'
          onClick={() => setToggleMenu(true)}>
            + Add Customer
        </button> 
        <CustomerModal toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        </div>
        </div>
      
          <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  {isLoading 
       ? <Spinner />  
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

export default CustomersTable