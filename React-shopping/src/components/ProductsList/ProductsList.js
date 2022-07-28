import React from 'react';
import commonColumnsStyles from '../../common/styles/Columns.module.scss';

class ProductsList extends React.Component {
  render() {
    const { filteredProducts, addToShoppingList } = this.props;
    return (
      <div className={commonColumnsStyles.App}>
        <br />
        <div className={commonColumnsStyles.title}>
          <b>
            <i>Twoja lista produktów:</i>
          </b>
        </div>
        <div className={commonColumnsStyles.list}>
          <ul>
            <i>
              {filteredProducts.map((product) => (
                <li
                  className={commonColumnsStyles.decimal}
                  key={Math.random()}
                  onClick={() => addToShoppingList(product.nazwa)}
                >
                  {product.nazwa}
                </li>
              ))}
            </i>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductsList;
