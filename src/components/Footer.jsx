import React from 'react';
import { FaComments, FaTwitter } from 'react-icons/fa';
import { MdOutlineMarkAsUnread} from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#1F451A]  text-center lg:text-left">
      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-4 footerBg gap-10 sm:grid-cols-2 md:grid-cols-2 ">
          <div className="mb-6  text-start">
            <h5 className="uppercase font-bold mb-6 text-white">RESOURCES</h5>

            <ul className="list-none normal-case mb-0 text-14 space-y-10 font-normal text-white">
              <li>
                <a href="/" className="hover:underline">FAQs</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Payment & Delivery Information</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Legal Use of Cannabis In United States</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Product Recall</a>
              </li>
            </ul>
          </div>

          <div className="mb-6 text-start">
            <h5 className="uppercase font-bold mb-6 text-white">COMPANY</h5>

            <ul className="list-none normal-case mb-0 text-14  space-y-10  font-normal text-white">
              <li className="">
                <a href="/" className="hover:underline">Leave a Comment</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">About Green Leevs</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Media Centre</a>
              </li>
            </ul>
          </div>

          <div className="mb-6  text-start">
            <h5 className="uppercase font-bold mb-6 text-white">POLICIES</h5>

            <ul className="list-none normal-case text-14 mb-0 space-y-10 font-normal text-white">
              <li className="">
                <a href="/" className="hover:underline">Terms & Conditions</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Return Policy</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Accessibility</a>
              </li>
              <li className="">
                <a href="/" className="hover:underline">Privacy</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Email Newsletter Terms and Conditions</a>
              </li>
            </ul>
          </div>

          <div className="mb-6  text-start">
            <h5 className="uppercase font-bold mb-3.5 text-white">CONTACT US</h5>

            <ul className="list-none normal-case text-14  mb-0 space-y-10 font-normal text-white">
              <li className="">
                <a href="/" className="hover:underline"><FaComments fontSize={60}/></a>
              </li>
              <li className="">
                <a href="/" className="hover:underline"><MdOutlineMarkAsUnread fontSize={60}/></a>
              </li>
              <li className="">
                <a href="/" className="hover:underline"><FaTwitter fontSize={60}/></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-white text-center p-4" >
  © 2022 Green Leevs
      </div>
    </footer>
  );
};

export default Footer;