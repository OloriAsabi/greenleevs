import React, {useMemo, useEffect, useState, useRef } from 'react'
import { useTable,
   useGlobalFilter, 
   useAsyncDebounce,  
   usePagination,
   useFilters
} from "react-table";
import {DOTS, useCustomPagination} from './useCustomPagination';
import { Button, PageButton } from '../utils/Button';
import { useNavigate } from 'react-router-dom';
import { FaSearchPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import Spinner from './Spinner';
import { DeleteBrands, GetBrandById, GetBrands } from '../apis/api';
import BrandModal from './BrandModal';


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
  };

const BrandTable = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const data =  useMemo(() => [...brands], [brands]);
    const brandsRef = useRef();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    brandsRef.current = brands;
  
  
    console.log("Categories",brands);

    const brandId = (rowIndex) => {
        const id = brandsRef.current[rowIndex].id;
        console.log(id);
        
        GetBrandById(id)
        navigate("/brands/" + id);
      };
       
    const handleDelete = (rowIndex) => {
        const id = brandsRef.current[rowIndex].id;
    
        DeleteBrands(id).then(() => {
          navigate('/brands')
    
          let newBrands = [...brands.current];
          newBrands.splice(rowIndex, 1)
    
          setBrands(newBrands);
          enqueueSnackbar('Categories Deleted Successful', { variant: 'success' });
        })
        .catch((e) => {
          console.log(e);
          enqueueSnackbar('Categories delete Failed', { variant: 'error' });
        });
      }

    useEffect(() => {
        setIsLoading(true)
        GetBrands()
        .then((response) => {
        console.log(response);
        const data = response.data.data
          
        setBrands(data)
        setIsLoading(false)
        }).catch((e) => {
        console.log(e);
        });
      },[]);

      const columns = useMemo(() => [
        {
          Header: "ID",
          accessor: "id",
        },
        {
            Header: "Brand Name",
            accessor: "label",
            Cell: AvatarCell,
            imgAccessor: "logo",
          },
        {
          Header: "Slug",
          accessor: "slug",
        },
        {
            Header: "Details",
            Cell: (props) => {
              const rowIdx = props.row.id;
              return (
                <div>
                   <div onClick={() => brandId(rowIdx)}>
                    <FaSearchPlus/>
                   </div>
                </div>
            )
          },
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
        + Add Brand
    </button> 
    <BrandModal toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
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

export default BrandTable