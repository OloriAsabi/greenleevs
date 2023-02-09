import { HiOutlineHome } from 'react-icons/hi';
import { FiShoppingBag, FiSettings } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { BsCardList } from "react-icons/bs";
import { TbBrandSlack } from 'react-icons/tb';

export const links = [
    {
      links: [
        {
          id: 1,  
          name: 'Home',
          icon: <HiOutlineHome/>,
          href: 'home'
        },
        
        {
          id: 2,  
          name: 'Categories',
          icon: <BiCategory/>,
          href: 'categories'
      },
      {
        id: 3,
        name: "Brands",
        icon: <TbBrandSlack />,
        href: 'brands'
      },
      {
        id: 4,  
        name: 'Products',
        icon: <FiShoppingBag />,
        href: 'products'
    },
        {
            id: 5,  
            name: 'Customers',
            icon: <IoIosPeople/>,
            href: 'customers'
        },
        {
            id: 6,  
            name: 'Orders',
            icon: <BsCardList/>,
            href: 'orders'

        },
        {
            id: 7,  
            name: 'Settings',
            icon: <FiSettings />,
            href: 'settings'

        },

      ],
    },
  ];

export const strain = [
  { id: 1,
    name: "hybrid"
  },
  { id: 2,
    name: "sativa"
  },
  { id: 3,
    name: "indica"
  }
];
export const Status = [
  { id: 1,
    name: "Selling"
  },
  { id: 2,
    name: "Progressing"
  },
  { id: 3,
    name: "Sold"
  }
];
export const orderStatus = [
  { id: 1,
    name: "pending"
  },
  { id: 2,
    name: "shipped"
  },
  { id: 3,
    name: "processing"
  },
  { id: 4,
    name: "delivered"
  },
];
export const thcContents = [
  {
    id: 1,
    name: "40%"
  },
  {
    id: 2,
    name: "30%"
  },
  {
    id: 3,
    name: "20%"
  },
  {
    id: 4,
    name: "15%"
  },
  {
    id: 5,
    name: "10%"
  },
  {
    id: 6,
    name: "5%"
  }
];

export const cbdContents =[
  {
    id: 7,
    name: "50%"
  },  
  {
    id: 8,
    name: "40%"
  },  
  {
    id: 9,
    name: "30%"
  }, 
  {
    id: 10,
    name: "20%"
  },  
  {
    id: 11,
    name: "15%"
  },  
  {
    id: 12,
    name: "10%"
  },
  {
    id: 13,
    name: "5%"
  }
];
