import ProductsList from '../ProductsList/ProductsList';
import ShopingList from '../ShopingList/ShopingList';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductsFilters from '../ProductsFilters/ProductsFilters';
import styles from '../../App.module.scss';

function Dashboard() {
    return (<>
        <div className={styles.appWrapper}>
            <ProductsFilters />
        </div>
        <div className={styles.columnsWrapper}>
            <ProductsList />
            <ShopingList>
                <ProductDetails />
            </ShopingList>
        </div>
    </>
    );
}

export default Dashboard;