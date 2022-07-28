import React from 'react';
import styles from '../../common/styles/Headers.module.scss';
import { useState } from 'react';

function AddProduct({ addProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [isFood, setIsFood] = useState(false);
  const btnDisabled = !name || !category;

  const onAddProduct = () => {
    addProduct(name, category, isFood);
    setName('');
    setCategory('');
    setIsFood(false);
  };

  return (
    <div className={styles.Wrapper}>
      <label>
        {'Nazwa: '}
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className={styles.inputs}>
        {'Kategoria: '}
        <input
          type="text"
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </label>
      <label className={styles.inputs}>
        {'Produkt spożywczy: '}
        <input
          type="checkbox"
          checked={isFood}
          onChange={() => setIsFood(!isFood)}
        />
      </label>

      <button
        className={styles.inputs}
        disabled={btnDisabled}
        onClick={onAddProduct}
      >
        Dodaj produkt
      </button>
    </div>
  );
}

export default AddProduct;
