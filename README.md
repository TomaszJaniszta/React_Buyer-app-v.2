Projects created for testing various functionalities and a different structure of a React application.

# React - React-shopping

The application contains a defined list of products in the src / common / consts / products.js file.
The left column (of available products) displays a list of products from the products.js file as an unnumbered list (we only display the name).
Left-clicking on one of the products adds it to the 'shopping list'.
The right column displays the current shopping list.
After clicking on any product from the list of available products, it will appear on the shopping list 
(the selected element does not disappear from the list of available products).
It is possible to choose the same product multiple times.
Left-clicking on any item from the shopping list removes it from the list 
(this simulates a situation in which someone threw the product into the shopping cart and removed it from the shopping list).
The list on the left can be filtered to find the product you are interested in in a short time. 

The filter section has 2 types of dynamic filters:
 - after the name (or its part)
 - by category, it is possible to select any category from among the existing ones (dropdown, categories downloaded dynamically)
 - "Only food" filter, which is an input of the "checkbox" type

The user can add additional products to the list on the left. Data should be complete.
The newly added products are fully interactive, i.e. work in line with the previous tasks. (e.g. new categories are shown in the drop-down list).
Right-clicking on an item from the shopping list causes it to be crossed out. 
Right-clicking on a crossed-out element again causes it to go back as non-crossed.

# React - second version - React-shopping2

- Online simulation server launch: npm run devStart
- Main application launch: npm run start

* API
I used Redux for the operation of the application. In ReduxDevTools, you can follow the flow of data and states in Redux. Some API requests have delays. 
An visual effect was added intentionally for the user for the duration of the query.

GET product list download address: http://localhost:9000/products
After pressing the "Load" button, it downloads a list of products from api / products, saves it in the store and displays it on the screen in the left column.
Clicking on the button triggers an API query, the results returned from the query are saved in redux, and then displayed in the productsList component.

API address shopping list download: GET http://localhost:9000/products/shopingList
Adding a product to the shopping list: POST http://localhost:9000/products/shopingList/new
The entire product (object) is sent as the request body.
Deleting an item from the shopping list: DEL http://localhost:9000/products/shopingList/:id
Left-clicking on a product from the left column adds it to the shopping list (right column)
Left clicking in the right column removes the product from the shopping list.
The displayed data in the shopingList column is always taken from the API.

* Filters
The form items in the "Filters" section filter products. Contrary to version 1, filtering is done with Redux.
Action in redux receives data from the form, performs filtering and saves the filtered list in the store which then
is displayed (each modification of the form triggers filtering).

* Routing
API to get product details, delayed by 2 seconds: http://localhost:9000/products/:id
Right-clicking on the product in the left column takes the user to the /...productDetails/:id subpage where the details of the selected product are visible.

* Keyboard navigation
After the products are loaded, the first one in the left column is active / selected.
Pressing the up arrow / down arrow will make the previous / next product active.
Pressing the "d" button on the keyboard takes the user to the page with the details of the active product.
On the details page, pressing 'backspace' takes the user back to the home page. Enter adds a product to the list.

* The application will soon have E2E tests written in the folder: cypress / integration /
