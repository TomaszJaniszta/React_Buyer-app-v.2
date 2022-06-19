import ProductsList from '../ProductsList/ProductsList';
import ShopingList from '../ShopingList/ShopingList';
import ProductDetails from '../ProductDetails/ProductDetails';
import styles from '../../App.module.scss';

function Dashboard() {
    return (
        <div className={styles.columnsWrapper}>
            <ProductsList />
            <ShopingList>
                <ProductDetails />
            </ShopingList>
        </div>
    );
}

export default Dashboard;