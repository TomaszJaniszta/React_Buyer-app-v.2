import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '../../common/styles/Headers.module.scss';

function ProductsFilters({ productsList, filterProducts }) {
  const [searchValue, setSearchValue] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFoodCategory, setIsFoodCategory] = useState(false);

  useEffect(() => {
    filterUniqueCategory();
  }, [productsList]);

  const filterUniqueCategory = () => {
    const categoryList = productsList.map((product) => product.kategoria);
    setUniqueCategories([...new Set(categoryList)]);
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    filterProducts(event.target.value, selectedCategory, isFoodCategory); // do auto filtrów
  };

  const onSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
    filterProducts(searchValue, event.target.value, isFoodCategory); // do auto filtrów
  };

  const onChangeIsFoodCategory = () => {
    setIsFoodCategory(!isFoodCategory);
    filterProducts(searchValue, selectedCategory, !isFoodCategory); // do auto filtrów
  };

  return (
    <div className={styles.Wrapper}>
      <label>
        {'Wpisz nazwę lub część nazwy by wyszukać produkty: '}
        <input value={searchValue} onChange={onChangeSearchValue} />
      </label>
      <label className={styles.inputs}>
        {'Wybierz kategorię do znalezienia: '}
        <select onChange={onSelectCategory}>
          <option key={'default'} value={''}></option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.inputs}>
        {'Produkty spozywcze: '}
        <input
          type="checkbox"
          value={isFoodCategory}
          onChange={onChangeIsFoodCategory}
        />
      </label>
      {/* <button onClick={() => filterProducts(searchValue, selectedCategory, isFoodCategory)}>Wyszukaj</button> */}
    </div>
  );
}

export default ProductsFilters;
