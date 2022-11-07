import React, {useMemo, useEffect, useState } from 'react'
import { useTable,
   useGlobalFilter, 
   useAsyncDebounce,  
   usePagination,
   useFilters
} from "react-table";
import {DOTS, useCustomPagination} from './useCustomPagination';
import { productsData } from '../data/data';
import { classNames } from '../utils/utils';
import { BsToggle2Off } from 'react-icons/bs';
import { Button, PageButton } from '../utils/Button';
import ProductModal from './ProductModal';


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
          placeholder="Search by product name"
        />
    )
  };  

  export function StatusPill({ value }) {
    const status = value ? value : "unknown";
  
    return (
      <span
        className={classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          status.startsWith("Selling") ? "bg-green-100 text-green-700" : null,
          status.startsWith("Progressing") ? "bg-yellow-100 text-yellow-700" : null,
          status.startsWith("Sold") ? "bg-red-100 text-red-700" : null
        )}
      >
        {status}
      </span>
    );
  }


  export function AvatarCell({ value, column, row }) {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src={row.original[column.imgAccessor]}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{value}</div>
        </div>
      </div>
    );
  }

  export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
  
    // Render a multi-select box
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
  
const ProductsTable = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const data = useMemo(() => productsData(), []);

    const child = data.map((child) => child.childCategory)
    const parent = data.map((parent) => parent.parentCategory);
    const type = data.map((type) => type.productType);

//    useEffect(() => {
//     if(toggleMenu){
//             return alert("Product Show Successfully!");
//     } else {
//         return alert("Product Hide Successfully!");
//     }
 
//    }, [toggleMenu]);
   
      
  const handleEdit = () => {

  }
        
  const handleDelete = () => {}
  
    const columns = useMemo(() => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "productName",
        Cell: AvatarCell,
        imgAccessor: "productImg",
      },
      {
        Header: "Category",
        accessor: "parentCategory",
        Filter: SelectColumnFilter,  // new
        filter: 'includes',  // new  
      },
      {
        Header: "Price",
        accessor: "price",
        Filter: SelectColumnFilter,  // new
        filter: 'includes',  // new
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Discount",
        accessor: "discount",
      },
      {
        Header: "Details",
        accessor: "details",
        Cell:({value}) => (
            <div>
                <a href='/' >{value}</a>
            </div>
        )
      },
      {
        Header: "Published",
        accessor: "published",
        Cell:({value}) => (
            <div>
            {!toggleMenu && (
                <button  onClick={() => setToggleMenu(true)}>{value}</button>
            )}
            {toggleMenu && (
                <button  onClick={() => setToggleMenu(false)}><BsToggle2Off/></button>
            )}  
            </div>
        )
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ value }) => (
            <div>
              <button onClick={() => handleEdit(value)}>{value.edit}</button>
              <button className='ml-4' onClick={() => handleDelete(value)}>{value.delete}</button>
            </div>
          ),
      },    
], [toggleMenu]);


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
        <div className='grid items-center text-center lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-1 gap-5 p-5 mb-10 border-white shadow rounded-xl'>
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

        <div className='w-4/8'>
        <button className='p-3 bg-[#1F451A] text-white text-center rounded cursor-pointer'
          onClick={() => setToggleMenu(true)}>
            + Add Product
        </button> 
        <ProductModal toggleMenu={toggleMenu} parent={parent} type={type} child={child} setToggleMenu={setToggleMenu} />
        </div>
        </div>

        <div className='grid items-center text-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 p-5 mb-10 border-white shadow rounded-xl'>
        <div>
         <input
            name="userfile" 
            type="file" 
            accept="application/pdf, application/vnd.ms-excel"
            placeholder='Drop your file'
            className='w-full p-3'
         />
         </div>

         <div className='p-3 w-4/8 bg-white text-[#1F451A] text-center rounded cursor-pointer'>
            <button>
             Upload
            </button>
         </div>
         <div className='p-3 w-4/8 bg-[#1F451A] text-center text-white rounded cursor-pointer'>
         <a href='/'>
         <button>
             Download
            </button>
            </a>
         </div>
        </div>

        <div className="mt-2 flex flex-col">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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

export default ProductsTable