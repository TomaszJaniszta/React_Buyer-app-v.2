import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import React from 'react';

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

function ShopingList({ shoppingList, removeFromShoppingList, onToggleBought }) {
  return (
    <div className={commonColumnsStyles.App}>
      <br />
      <div className={commonColumnsStyles.title}>
        <b>
          <i>Twoja lista zakupów:</i>
        </b>
      </div>
      <div className={commonColumnsStyles.list}>
        <ul>
          <i>
            {shoppingList.map((product) => (
              <li
                className={commonColumnsStyles.roman}
                key={product.id}
                onContextMenu={() => onToggleBought(product.id)}
                onClick={() => removeFromShoppingList(product)}
                style={{
                  textDecorationLine: `${
                    product.isBought ? 'line-through' : 'none'
                  }`,
                }}
              >
                {product.name}
              </li>
            ))}
          </i>
        </ul>
      </div>
    </div>
  );
}

export default ShopingList;
