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
import { AiOutlineSetting } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
    /* eslint-disable */


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

export const plant_type = [
{
  id: 1,
  type: "Hybrid"
},
{
  id: 2,
  type: "Sativa"
},
{
  id: 3,
  type: "Indica"
}
];

export const prices = [
  {
    lowPrice: 0,
    highPrice: 49.99,
  },
  {
    lowPrice: 10,
    highPrice: 99.99,
  },
  {
    lowPrice: 20,
    highPrice: 149.99,
  },
  {
    lowPrice: 30,
    highPrice: 199.99,
  },
  {
    lowPrice: 40,
    highPrice: 249.99,
  },
  {
    lowPrice: 50,
    highPrice: 299.99,
  },
  {
    lowPrice: 100,
    highPrice: 349.99,
  },
  {
    lowPrice: 150,
    highPrice: 399.99,
  },
  {
    lowPrice: 200,
    highPrice: 449.99,
  },
  {
    lowPrice: 300,
    highPrice: 499.99,
  },
  {
    lowPrice: 500,
    highPrice:"and up",
  },
];

export const thcContents = [
  {
    id: 1,
    name: "THC - 40%"
  },
  {
    id: 2,
    name: "THC - 30%"
  },
  {
    id: 3,
    name: "THC - 20%"
  },
  {
    id: 4,
    name: "THC - 15%"
  },
  {
    id: 5,
    name: "THC - 10%"
  },
  {
    id: 6,
    name: "THC - 5%"
  }
];

export const cbdContents =[
  {
    id: 7,
    name: "CBD - 50%"
  },  
  {
    id: 8,
    name: "CBD - 40%"
  },  
  {
    id: 9,
    name: "CBD - 30%"
  }, 
  {
    id: 10,
    name: "CBD - 20%"
  },  
  {
    id: 11,
    name: "CBD - 15%"
  },  
  {
    id: 12,
    name: "CBD - 10%"
  },
  {
    id: 13,
    name: "CBD - 5%"
  }
];

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

