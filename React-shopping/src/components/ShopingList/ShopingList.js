import commonColumnsStyles from "../../common/styles/Columns.module.scss";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

function ShopingList({ shoppingList, removeFromShoppingList, onToggleBought }) {
  return (
    <div className={commonColumnsStyles.App}>
      <p>Twoja lista zakupów:</p>

      <ul>
        {shoppingList.map((product) =>
          <li
            key={product.id}
            onContextMenu={() => onToggleBought(product.id)}
            onClick={() => removeFromShoppingList(product)}
            style={{ textDecorationLine: `${product.isBought ? "line-through" : "none"}` }}
          >
            {product.name}
          </li>
        )}
      </ul>
    </div>
  );
}

export default ShopingList;