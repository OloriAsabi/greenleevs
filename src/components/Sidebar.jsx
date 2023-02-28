import { useState } from 'react';
/* eslint-disable */
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

function Sidebar({ id, brands, plantTypes, thcContents, setOpenNav,  cbdContents, onSubmit }) {
  const [outOfStock, setOutOfStock] = useState(false);
  const [sort, setSort] = useState('default');

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ outOfStock, sort });
  };

  return (
    <div>
    <FaTimes fontSize={28} className="text-black cursor-pointer fixed top-4 right-4 font-light" onClick={() => setOpenNav(false)} />  
    <div className='fixed  w-full top-20 p-10 '>
        <div className='w-full small space-y-8'>
      
     
      <section className="subcategories">
        <header>
          <h4 className='pt-5'>SUBCATEGORIES</h4>
        </header>
        <nav className='pt-6'>
          <ul>
            <li className='pb-5 capitalize'>All {id}</li>
            {brands.map((brand) => (
              <li key={brand.id} className='text-[#2D2D2D] text-sm  pb-5 cursor-pointer text-start'>{brand.label}</li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="filters">
        <form onSubmit={handleSubmit}>
          <fieldset className='pt-5'>
            <legend className='pb-5 text-xl'>Brands</legend>
            <ul className='flex flex-col justify-between space-y-5  pb-6 items-start'>
              {brands.map((brand) => (
                <li key={brand.id} className='flex mb-5 space-x-5' >
                   <input
                      type="checkbox"
                      name="brands"
                      value={brand.label}
                      className="h-4 w-4  border-gray-300 focus:ring-2 focus:ring-blue-300" 
                      onChange={() => {}}
                    />
                  <label> {brand.label}</label>       
                </li>
              ))}
            </ul>
            <hr/>
          </fieldset>

          <fieldset  className='pt-5'>
            <legend className='pb-5 text-xl'>Plant Types</legend>
            <ul className='flex flex-col justify-between space-y-5 pb-6 items-start'>
              {plantTypes.map((plantType) => (
                <li key={plantType.id}  className='flex mb-5 gap-10'>
                  <input
                      type="checkbox"
                      name="plantTypes"
                      value={plantType.type}
                      className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" 
                      onChange={() => {}}
                    />
                  <label>
                    {plantType.type}
                  </label>
                </li>
              ))}
            </ul>
            <hr/>
          </fieldset>

          <fieldset className='flex flex-col pt-5 pb-5 w-full'>
            <legend  className='text-xl'>THC Potency</legend>
            <select name="thcPotency" value={sort} onChange={handleSortChange}>
              <option value="default">All</option>
              {thcContents.map((thc) => (
                <option value={thc.name} key={thc.id}>
                  {thc.name}
                </option>
              ))}
            </select>
            <hr/>
          </fieldset>

          <fieldset className='flex flex-col pt-5 pb-5 w-full'>
            <legend  className='text-xl'>CBD Potency</legend>
            <select name="cbdPotency" value={sort} onChange={handleSortChange}>
              <option value="default">All</option>
              {cbdContents.map((cbd) => (
                <option value={cbd.name} key={cbd.id}>
                  {cbd.name}
                </option>
              ))}
            </select>
            <hr/>
          </fieldset>
          <button type="submit" className='bg-[#1F451A] text-white cursor-pointer rounded-md hover:scale-x-110 font-normal text-xl border p-4'  onClick={() => setOpenNav(false)}>
            Apply Filters
          </button>
        </form>
      </section>
      </div>
       </div>
    </div>
  );
}


Sidebar.propTypes = {
  id: PropTypes.string.isRequired,
  brands: PropTypes.array.isRequired,
  plantTypes: PropTypes.array.isRequired,
  thcContents: PropTypes.array.isRequired,
  cbdContents: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Sidebar;