# React_Buyer-app-v.2

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

-------------------------------------------------------------------------------------------------------------------------------------------------

**Clone/copy project**

**npm init -y**

**npm install**

- Online simulation server launch: npm run devStart

- Main application launch: npm run start

http://localhost:3000
