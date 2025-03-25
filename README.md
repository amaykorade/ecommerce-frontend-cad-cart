# E-commerce application

## Overview  
This is a modern web application built using **React, Vite, Tailwind CSS, and Ant Design**. The project follows best practices for performance, maintainability, and scalability.

The project is all about E-commerce where all the products are shown, we can search any product and can apply filters as well to get the desired product, the product comes as we scroll so the page load gets
decreses and only the products are fetched upon requirement. User can also add products to the cart and can see details of the products by clicking on the product.

## Features  
- **Fast Development**: Powered by **Vite** for lightning-fast builds and hot reloading.  
- **Beautiful UI**: Styled with **Tailwind CSS** and enhanced using **Ant Design** components.  
- **Optimized Performance**: Uses modern React best practices for smooth and responsive UI.  
- **Modular & Scalable**: Clean and structured component-based architecture.  

## Installation  

To run the project locally, follow these steps:  

1️ **Clone the Repository**  
sh
https://github.com/amaykorade/ecommerce-frontend-cad-cart.git
cd frontend

2️ **Install Dependencies**
sh
npm install

3 **Start the Development Server**
sh 
npm run dev

4 **Build for Production**
npm run build

## Known Issues & Limitations
- Currently, no backend integration is implemented
- Ensure Node.js (v16+) is installed for Vite compatibility.
- The API is not working for cart, basically post does not work and also for filtering first we need to filter by category and then we have to filter the response by the price range
