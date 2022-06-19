import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";

class ProductsList extends React.Component {
  render() {
    const { filteredProducts, addToShoppingList } = this.props;
    return (
      <div className={commonColumnsStyles.App}>
        <p>Twoja lista produktów:</p>

        <ul>
          {filteredProducts.map((product) =>
            <li
              key={Math.random()}
              onClick={() => addToShoppingList(product.nazwa)} >
              {product.nazwa}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default ProductsList;