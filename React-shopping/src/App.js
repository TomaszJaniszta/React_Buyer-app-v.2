import { useEffect, useState } from 'react';
import React from 'react';
import ProductsList from './components/ProductsList/ProductsList';
import ShopingList from './components/ShopingList/ShopingList';
import ProductFilters from './components/ProductsFilters/ProductsFilters';
import AddProduct from './components/AddProduct/AddProduct';
import { products } from './common/consts/produkty';
import styles from './App.module.scss';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [productsList, setProductsList] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(productsList);

  useEffect(() => {
    setFilteredProducts(productsList);
  }, [productsList]);

  const addToShoppingList = (productName) => {
    const id = Math.random();
    const addedProduct = { id, name: productName, isBought: false };
    setShoppingList((prevState) => [...prevState, addedProduct]);
  };

  const removeFromShoppingList = (product) => {
    const filteredList = shoppingList.filter((p) => p.id !== product.id);
    setShoppingList(filteredList);
  };

  const filterProducts = (searchValue, searchCategory, isFoodCategory) => {
    let filteredProducts = productsList;

    if (searchValue) {
      filteredProducts = filteredProducts.filter((product) =>
        product.nazwa.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (searchCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.kategoria === searchCategory
      );
    }
    if (isFoodCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.produktSpozywczy === isFoodCategory
      );
    }

    setFilteredProducts(filteredProducts);
  };

  const addProduct = (name, category, isFood) => {
    const newProduct = {
      nazwa: name,
      kategoria: category,
      produktSpozywczy: isFood,
    };
    setProductsList([...productsList, newProduct]);
  };

  const onToggleBought = (id) => {
    // const list = JSON.parse(JSON.stringify(shoppingList));
    // const product = list.find((product) => product.id === id);
    // product.isBought = !product.isBought;
    const arrow = shoppingList.map((product) =>
      product.id === id ? { ...product, isBought: !product.isBought } : product
    );
    setShoppingList(arrow);
  };

  return (
    <div className={styles.appWrapper}>
      <br />
      <div align="center">
        <h1 className={styles.title} >Aplikacja zakupownik</h1>
      </div>
      <p className={styles.description}>
        Aplikacja zakupownik umożliwia stworzenie listy zakupowej z produktów z
        menu. Produkty do menu z kolei możemy dodawać poprzez panel w górnej
        części wypełniając pola: nazwa, kategoria, typ produktu (produkt
        spożywczy / nie spożywczy). Pole filtrów umożliwia filtrowanie produktów
        z menu także po wymienionych polach.
      </p>
      <AddProduct addProduct={addProduct} />
      <ProductFilters
        productsList={productsList}
        filterProducts={filterProducts}
      />

      <div className={styles.columnsWrapper}>
        <ProductsList
          filteredProducts={filteredProducts}
          addToShoppingList={addToShoppingList}
        />
        <ShopingList
          shoppingList={shoppingList}
          removeFromShoppingList={removeFromShoppingList}
          onToggleBought={onToggleBought}
        />
      </div>
    </div>
  );
}

export default App;
