# Amazon-Clone with React

This is a clone of popular e-commerce site Amazon using react. Checkout Backend code here. It is web application designed to add, remove, edit, add to cart, place order and review products. Checkout backend code [here](https://github.com/Kaushal672/rest-api-amazon-clone).

## Live Demo

[Live preiview](https://amazon-react-clone-ten.vercel.app/)

Login Credentials:

-   Email: example@example.com
-   Password: @1234567

> **_NOTE_**: Please allow third-party cookies to allow authentication work properly.

## Features

-   Authorization
    -   User can login or signup for new account using.
    -   User can upload profile image while signing up.
    -   User can update password(admin only).
    -   User can update personal information i.e. username, phone, email and profile image.
    -   User can add, edit and delete addresses.
    -   User can add and delete reviews.
    -   User can view their cart and orders.
    -   User can download their order invoice.
-   Authentication
    -   User have to be logged in to review, add to cart and purchase products.
    -   User have to be logged in and registered as seller to add, edit, delete product.
    -   User cannot edit or delete products uploaded by other users.
-   Other functionalities
    -   Payment using stripe.
    -   Seller can add product images while adding and editing product.
    -   Show image upload progress.
    -   Responsive web design.
    -   Search existing products.
    -   Show flash message when user not logged in.

## Built with

-   React
-   Redux, React Redux and Redux toolkit
-   Redux persist
-   Stripe payment
-   React router
-   Validator
-   axios
-   dayjs
-   Fontawesome icons
-   React helmet
-   Vercel
