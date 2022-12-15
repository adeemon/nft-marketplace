import { useEffect } from 'react';
import { selectCartProducts } from '../slices/CartSlice'
import { useAppSelector } from '../store/store'
import styles from '../styles/CartContent.module.scss'
import { EthIcon } from './Eth';


export default function CartContent () {
    const products = useAppSelector(selectCartProducts);
    let totalPrice : number = 0;
    const productsArrayToRender = products.map(element => {
        totalPrice = totalPrice + Number(element.price);
        return (<div className={styles.product} key={element.id}>
            <div className={styles.productName}>{element.nftName}</div>
            <div className={styles.price}>
                {element.price} <EthIcon />
                </div>
        </div>);
    })
    return (
        <div className={styles.container}>
            {productsArrayToRender}
            <div className={styles.totalPrice}>
                <div>Total price</div>
                <div className={styles.price}>
                    {totalPrice}
                    <EthIcon />
                    </div>
            </div>
        </div>
    )
}