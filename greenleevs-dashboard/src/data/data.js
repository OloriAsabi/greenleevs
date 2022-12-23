import { HiOutlineHome } from 'react-icons/hi';
import { FiShoppingBag, FiSettings, FiCreditCard, FiEdit } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa"
import { BiGift } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { BsCardList, BsCurrencyDollar, BsShield, BsToggle2On, } from "react-icons/bs";
import { AiFillDelete } from 'react-icons/ai';
import productImage from "./productImg.jpg";
import productImage2 from "./productImg2.jpeg";

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
            name: 'Products',
            icon: <FiShoppingBag />,
            href: 'products'
        },
        {
            id: 3,  
            name: 'Customers',
            icon: <IoIosPeople/>,
            href: 'customers'
        },
        {
            id: 4,  
            name: 'Orders',
            icon: <BsCardList/>,
            href: 'orders'

        },
        // {
        //     id: 6,  
        //     name: 'Coupons',
        //     icon: <BiGift/>,
        //     href: 'coupons'

        // },
        {
            id: 5,  
            name: 'Settings',
            icon: <FiSettings />,
            href: 'settings'

        },

      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: '404',
        //   icon: <AiOutlineShoppingCart />,
        },
        {
          name: 'Coming Soon',
        //   icon: <IoMdContacts />,
        },
      ],
    },

  ];


  export const chatData = [
    {
      message: 'Roman Joined the Team!',
      desc: 'Congratulate him',
      time: '9:08 AM',
    },
    {
      message: 'New message received',
      desc: 'Salma sent you new message',
      time: '11:56 AM',
    },
    {
      message: 'New Payment received',
      desc: 'Check your earnings',
      time: '4:39 AM',
    },
    {
      message: 'Jolly completed tasks',
      desc: 'Assign her new tasks',
      time: '1:12 AM',
    },
  ];
  
  export const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: 'My Profile',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    {
      icon: <BsShield />,
      title: 'My Inbox',
      desc: 'Messages & Emails',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
    },
    {
      icon: <FiCreditCard />,
      title: 'My Tasks',
      desc: 'To-do and Daily Tasks',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
    },
  ];


export const customersData = () => {
  const data = [
  {
    customerID: 1002,
    customer: 'Nirav Joshi',
    CustomerAddress: '123 Bukjd, lekki,lag',
    payment: "COD",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Pending',
    selected: false,
    customerEmail: "deverloper@gmail.com",
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1021,
    customer: 'Sunil Joshi',
    payment: "COD",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Pending',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerEmail: "deverloper@gmail.com",
    Status: 'Active',
      customerNumber: "+234 803 0000",
      selected: false,
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      }
  },
  {
    CustomerID: 1005,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    method: 'CODel',
    customerEmail: "deverloper@gmail.com",
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    customerID: 102,
    customer: 'Nirav Joshi',
    CustomerAddress: '123 Bukjd, lekki,lag',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    customerNumber: "+234 803 0000",
    customerEmail: "deverloper@gmail.com",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1002,
    customer: 'Sunil Joshi',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    customerEmail: "deverloper@gmail.com",
    CustomerAddress: '123 Bukjd, lekki,lag',
    Status: 'Active',
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1003,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Failed',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: "deverloper@gmail.com",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1004,
    customer:'Christopher Jamil',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    customerEmail: 'jamil@gmail.com',
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1005,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    method: 'CODel',
    customerEmail: "deverloper@gmail.com",
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    customerID: 1001,
    customer: 'Nirav Joshi',
    CustomerAddress: '123 Bukjd, lekki,lag',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    customerEmail: "deverloper@gmail.com",
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1002,
    customer: 'Sunil Joshi',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerEmail: "deverloper@gmail.com",
    Status: 'Active',
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1003,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Failed',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: "deverloper@gmail.com",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1004,
    customer:'Christopher Jamil',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000", 
    customerEmail: "deverloper@gmail.com",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1005,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    method: 'CODel',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",  
    customerEmail: "deverloper@gmail.com",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    customerID: 1001,
    customer: 'Nirav Joshi',
    customerEmail: 'nirav@gmail.com',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    customerNumber: "+234 803 0000",
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1002,
    customer: 'Sunil Joshi',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    CustomerAddress: '123 Bukjd, lekki,lag',
    Status: 'Active',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1003,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Failed',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1004,
    customer:'Christopher Jamil',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1005,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    method: 'CODel',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    customerID: 1001,
    customer: 'Nirav Joshi',
    CustomerAddress: '123 Bukjd, lekki,lag',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1002,
    customer: 'Sunil Joshi',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    CustomerAddress: '123 Bukjd, lekki,lag',
    Status: 'Active',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1003,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Failed',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000", 
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1004,
    customer:'Christopher Jamil',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Successful',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    CustomerID: 1005,
    customer:'Andrew McDownland',
    payment: "Card",
    date: 'Jan 6, 2022 09:21',
    amount: '$29.00',
    status: 'Pending',
    method: 'CODel',
    CustomerAddress: '123 Bukjd, lekki,lag',
    customerNumber: "+234 803 0000",
    customerEmail: 'nirav@gmail.com',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  }

];
 return [...data, ...data, ...data]
}

export const ordersData = () => {
  const data = [
  {
    OrderID: 10248,
    method: "Card",
    TotalAmount: 32.38,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'Pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 345653,
    TotalAmount: 56.34,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'Delivered',
    phone: '08175509873',
    time: "Oct 3, 2022",
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 390457,
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    Location: 'New York',
    Status: 'Procressing',
    phone: '08175509873',
    time: "Oct 3, 2022",
    method: "Card",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 893486,
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    Location: 'Germany',
    Status: 'Cancel',
    phone: '08175509873',
    method: "Card",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 748975,
    method: 'Cash',
    TotalAmount: 23.99,
    invoice: <FaSearchPlus/>,
    Location: 'Spain',
    Status: 'Delivered',
    phone: '08175509873',  
    time: "Oct 3, 2022",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 94757,
    TotalAmount: 95.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'Cancel',
    phone: '08175509873',
    time: "Oct 3, 2022",
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 944895,
    TotalAmount: 17.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
    time: "Oct 3, 2022",
    method: "Card",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    TotalAmount: 59.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'Delievered',
    phone: '08175509873',
    time: "Oct 3, 2022",
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'COD',
    TotalAmount: 87.99,
    invoice:<FaSearchPlus/> , 
    Location: 'USA',
    Status: 'Pending',
    phone: '08175509873',
    time: "Oct 3, 2022",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'Cancel',
    phone: '08175509873',
    time: "Oct 3, 2022",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 38489,
    method: 'COD',
    TotalAmount: 87.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'Delivered',
    phone: '08175509873',
    time: "Oct 3, 2022",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 24546,
    method: 'COD',
    TotalAmount: 84.99,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'Delivered',
    phone: '08175509873',
    time: "Oct 3, 2022",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/> ,
     Location: 'USA',
    Status: 'Cancel',
    time: "Oct 3, 2022",
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 10248,
    method: 'COD',
    TotalAmount: 32.38,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'Pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 345653,
    method: 'CODn Darrin',
    TotalAmount: 56.34,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'Delhi',
    Status: 'Delivered',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 390457,
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'New York',
    Status: 'active',
    phone: '08175509873',
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 893486,
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'Germany',
    Status: 'canceled',
    phone: '08175509873',
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 748975,
    method: 'COD',
    TotalAmount: 23.99,
    time: "Oct 3, 2022",
    invoice: <FaSearchPlus/>,
    Location: 'Spain',
    Status: 'rejected',
    phone: '08175509873',
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 94757,
    TotalAmount: 95.99,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
    method: "COD",
   actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 944895,
    TotalAmount: 17.99,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    TotalAmount: 59.99,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'complete',
    phone: '08175509873',
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    TotalAmount: 87.99,
    invoice:<FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
    method: "COD",
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 38489,
    method: 'COD',
    TotalAmount: 87.99,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 24546,
    method: 'COD',
    TotalAmount: 84.99,
    time: "Oct 3, 2022",
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 10248,
    method: 'COD',
    time: "Oct 3, 2022",
    TotalAmount: 32.38,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 345653,
    method: 'COD',
    TotalAmount: 56.34,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 390457,
    method: 'CODPerez',
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'New York',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 893486,
    method: 'COD Viseer',
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    time: "Oct 3, 2022",
    Location: 'Germany',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 748975,
    method: 'COD Vitold',
    TotalAmount: 23.99,
    invoice: <FaSearchPlus/>,
    Location: 'Spain',
    Status: 'rejected',
    phone: '08175509873',   
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 94757,
    method: 'CODDarobe',
    TotalAmount: 95.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 944895,
    method: 'COD albu',
    TotalAmount: 17.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'CODni',
    TotalAmount: 59.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'CODan',
    TotalAmount: 87.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 38489,
    method: 'COD',
    TotalAmount: 87.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 24546,
    method: 'COD',
    TotalAmount: 84.99,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 10248,
    method: 'COD',
    TotalAmount: 32.38,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 345653,
    method: 'CODn Darrin',
    TotalAmount: 56.34,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 390457,
    method: 'CODPerez',
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    Location: 'New York',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 893486,
    method: 'COD Viseer',
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    Location: 'Germany',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 748975,
    method: 'COD Vitold',
    TotalAmount: 23.99,
    invoice: <FaSearchPlus/>,
    Location: 'Spain',
    Status: 'rejected',
    phone: '08175509873',   
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 94757,
    method: 'CODDarobe',
    TotalAmount: 95.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 944895,
    method: 'COD albu',
    TotalAmount: 17.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'CODni',
    TotalAmount: 59.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'CODan',
    TotalAmount: 87.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 38489,
    method: 'COD',
    TotalAmount: 87.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 24546,
    method: 'COD',
    TotalAmount: 84.99,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 10248,
    method: 'COD',
    time: "Oct 3, 2022",
    TotalAmount: 32.38,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 345653,
    method: 'CODn Darrin',
    TotalAmount: 56.34,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 390457,
    method: 'CODPerez',
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    Location: 'New York',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 893486,
    method: 'COD Viseer',
    TotalAmount: 93.31,
    invoice: <FaSearchPlus/>,
    Location: 'Germany',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 748975,
    method: 'COD Vitold',
    TotalAmount: 23.99,
    invoice: <FaSearchPlus/>,
    Location: 'Spain',
    Status: 'rejected',
    phone: '08175509873',  
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 94757,
    method: 'CODDarobe',
    TotalAmount: 95.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 944895,
    method: 'COD albu',
    TotalAmount: 17.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'CODni',
    TotalAmount: 59.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 845954,
    method: 'CODan',
    TotalAmount: 87.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'pending',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 38489,
    method: 'COD',
    TotalAmount: 87.99,
    invoice: <FaSearchPlus/>,
    Location: 'USA',
    Status: 'active',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 24546,
    method: 'COD',
    TotalAmount: 84.99,
    invoice: <FaSearchPlus/>,
    Location: 'Delhi',
    Status: 'complete',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
  {
    OrderID: 874534,
    method: 'COD',
    TotalAmount: 122.99,
    invoice:<FaSearchPlus/>,
    Location: 'USA',
    Status: 'canceled',
    phone: '08175509873',
        actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    },
  },
];
return data
// return [...data, ...data, ...data]
};

export const productsData = () => {
 const data = [
  {
    id: 1,
    productName: "Green Lettuce Leaf",
    productImg: productImage2,
    parentCategory: "Tropicals",
    childCategory: "CBD-Dominant",
    productType: "CBD",
    price: "$250",
    stock: "15",
    status: "Selling",
    discount: "$4",
    details: <FaSearchPlus/>,
    published: <BsToggle2On/>,
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    id: 2,
    productName: "CBD oils",
    productImg: productImage,
    parentCategory: "Extract",
    childCategory: "Oils",
    productType: "Vapes",
    price: "$450",
    stock: "5",
    status: "Selling",
    discount: "$1",
    details: <FaSearchPlus/>,
    published: <BsToggle2On/>,
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  },
  {
    id: 3,
    productName: "Pipes & Bongs",
    productImg: productImage,
    parentCategory: "Accessories",
    childCategory: "bongs",
    productType: "Accessories",
    price: "$450",
    stock: "5",
    status: "Sold",
    discount: "0",
    details: <FaSearchPlus/>,
    published: <BsToggle2On/>,
    actions: {
      edit: <FiEdit/>,
      delete: <AiFillDelete/>
    }
  }
 ]
 return data
//  return [...data, ...data, ...data]
}

export const couponData = () => {
  const data = [
    {
      id: 1,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    },
    {
      id: 6,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Active',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 5,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Active',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 3,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 6,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 2,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 7,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 8,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    }, {
      id: 9,
      startDate: "Sep 25, 2022",
      endDate: "Jan 1, 2022",
      campaign: "October Gift Voucher",
      code: "OCTOBER21",
      percentage: "10%",
      productType: "Cannabis",
      status: 'Expired',
      actions: {
        edit: <FiEdit/>,
        delete: <AiFillDelete/>
      },
    },
  ]
  return data
}

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

export const thcContents = [
  {
    id: 1,
    name: "THC - 100%"
  },
  {
    id: 2,
    name: "THC - 80%"
  },
  {
    id: 3,
    name: "THC - 50%"
  },
  {
    id: 4,
    name: "THC - 20%"
  },
  {
    id: 5,
    name: "THC - 10%"
  },
  {
    id: 6,
    name: "THC - 5%"
  }
]
export const cbdContents =[
  {
    id: 7,
    name: "CBD - 100%"
  },  
  {
    id: 8,
    name: "CBD - 100%"
  },  
  {
    id: 9,
    name: "CBD - 80%"
  }, 
  {
    id: 10,
    name: "CBD - 50%"
  },  
  {
    id: 11,
    name: "CBD - 20%"
  },  
  {
    id: 12,
    name: "CBD - 10%"
  },
  {
    id: 13,
    name: "CBD - 5%"
  }
]

export const effect = [
  {
    id: 1,
    name: 'happy'
  },
  {
    id: 2,
    name: 'relaxing'
  },
  {
    id: 3,
    name: 'active'
  },
  {
    id: 4,
    name: 'euphoria'
  },
  {
    id: 5,
    name: 'helps fight insomia'
  },
  {
    id: 6,
    name: 'deep relaxing'
  },
]

export const weights = [
  {
    id: 1,
    name: "100g"
  },
  {
    id: 2,
    name: "70g"
  },
  {
    id: 3,
    name: "50g"
  },
  {
    id: 4,
    name: "20g"
  },
  {
    id: 5,
    name: "10g"
  },
  {
    id: 6,
    name: "8g"
  },
  {
    id: 7,
    name: "7g"
  },  
  {
    id: 8,
    name: "6g"
  },  
  {
    id: 9,
    name: "5g"
  }, 
  {
    id: 10,
    name: "4g"
  },  
  {
    id: 11,
    name: "3g"
  },  
  {
    id: 12,
    name: "2g"
  },
  {
    id: 13,
    name: "1g"
  }
]