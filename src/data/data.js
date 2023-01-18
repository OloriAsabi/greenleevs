import product1 from '../assests/product1.jpg';
import product2 from '../assests/product2.png';
import product3 from '../assests/product3.jpg';
import product4 from '../assests/weed.jpeg';
import tin from '../assests/tinctures.jpg';
import weed from '../assests/Rectangle 20 (4).jpg';
import oils from '../assests/oils.jpg';
import pro from '../assests/Rectangle 12 (1).png';
import pro1 from '../assests/Rectangle 20 (3).jpg';
import edi from '../assests/edibles.jpg';
/* eslint-disable */
import edible from '../assests/edibles/edibles.jpg';
import edibles1 from '../assests/edibles/edibles1.jpg';
import edibles2 from '../assests/edibles/edibles2.jpg';
import edibles3 from '../assests/edibles/edibles3.jpg';
import edibles4 from '../assests/edibles/edibles4.jpg';


import ex from '../assests/extracts/Rectangle 12 (2).png';
import ex1 from '../assests/extracts/Rectangle 12 (3).png';
import ex2 from '../assests/extracts/Rectangle 12 (4).png';
import ex3 from '../assests/extracts/Rectangle 12.png';

import { AiOutlineSetting } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';


export const links = [
  {
    id: 1,  
    name: 'home',
    link: ''
  },
  {
    id: 2,  
    name: 'shop',
    link: 'shop'
  },
  {
    id: 3,  
    name: 'special Menu',
    link: 'special'
  },
];

const menus = [
  { 
  id: 'orders', 
  title: 'Orders', 
  icon: <FaCubes/>,
 },
  { id: 'shipping', title: 'Shipping', icon: <GrLocation/>},
  { id: 'settings', title: 'Settings', icon: <AiOutlineSetting/>},
];

    
export function getMenu(menuId) {
  return menus.find(({ id }) => id === menuId);
}
  
export function getMenus() {
  return menus;
}

export const featuredProducts = [
  {
    id: 1,
    pic: product1,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 2,
    pic: product2,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 3,
    pic: product3,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 4,
    pic: product4,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 5,
    pic: product1,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 6,
    pic: product2,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 7,
    pic: product3,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  },
  {
    id: 8,
    pic: product4,
    brand: 'REDECAN',
    title: 'Reign Drops 30:0',
    price: '$34.98 / bottle',
    tax: 'Taxes Included',
    taste: 'Blend',
    THC: '812.0 - 903.0 mg/bottle',
    CBD: '0.50 - 903.0 mg/bottle'
  }
];

export const category = [
  {
    id: 1,
    img: tin,
    title: 'accessories',
    price: '$20.00'
  },
  {
    id: 2,
    img: edi,
    title: 'edibles',
    price: '$20.00'
  },
  {
    id: 3,
    img: pro,
    title: 'tropicals',
    price: '$20.00'
  },
  {
    id: 4,
    img: oils,
    title: 'oils',
    price: '$20.00'
  },
  {
    id: 5,
    img: weed,
    title: 'extracts',
    price: '$20.00'
  },
  {
    id: 6,
    img: pro1,
    title: 'tinctures',
    price: '$20.00'
  },
];

export const strainTypes = [
  {
    id: '1',
    img : oils,
    title: 'CBD Rich',
    description: 'A high-CBD strain that promotes well-being with minimal euphoric effects',
  },
  {
    id: '2',
    img : weed,
    title: 'Sativa',
    description: 'Gives out a euphoric, upbeat sensation suitable for daytime treatment',
  },
  {
    id: '3',
    img : product3,
    title: 'Hybrid',
    description: 'A cross between Sativa and Indica, helps manage symptoms and has euphoric effects.',
  },
  {
    id: '4',
    img: tin,
    title: 'Indica',
    description: 'Has a calming and tranquil effect that is most suitable for use at night.',
  },
  {
    id: '5',
    img : pro1,
    title: 'Dominants',
    description: 'A strain with a high THC content and terpene composition that maximizes relaxing.',
  }
];

export const edibles =[
  {
    id: 1,
    img: edible,
    title: 'CHOCOLATE',
    price: '$20.00'
  }, {
    id: 2,
    img: edibles1,
    title: 'CHOCOLATE VEGAN',
    price: '$20.00'
  }, {
    id: 3,
    img: edibles2,
    title: 'GUMMY BEARS',
    price: '$20.00'
  }, {
    id: 4,
    img: edible,
    title: 'GUMMY BEARS',
    price: '$20.00'
  }, {
    id: 5,
    img: edibles2,
    title: 'GUMMY BEARS',
    price: '$20.00'
  }, {
    id: 6,
    img: edible,
    title: 'GUMMY BEARS',
    price: '$20.00'
  }, {
    id: 7,
    img: edibles4,
    title: 'GUMMY BEARS',
    price: '$20.00'
  }, {
    id: 8,
    img: edibles2,
    title: 'GUMMY BEARS',
    price: '$20.00'
  },
];

export const extracts = [
  {
    id: 1,
    img: ex,
    title: 'Oils',
    price: '$20.00'
  }, {
    id: 2,
    img: ex1,
    title: 'CAPSULE',
    price: '$20.00'
  }, {
    id: 3,
    img: ex2,
    title: 'INFUSED FLOWERS',
    price: '$20.00'
  }, {
    id: 4,
    img: ex3,
    title: 'oil',
    price: '$20.00'
  }, {
    id: 5,
    img: ex,
    title: 'INFUSED FLOWERS',
    price: '$20.00'
  },
];