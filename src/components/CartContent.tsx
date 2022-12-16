import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useEffect } from 'react';
import { removeProduct, selectCartProducts } from '../slices/CartSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import styles from '../styles/CartContent.module.scss'
import { EthIcon } from './Eth';


export default function CartContent () {
    const products = useAppSelector(selectCartProducts);
    const dispatch = useAppDispatch();

    const onDeleteProductHandler = (id : number) => {
        dispatch(removeProduct(id));
    }

    let totalPrice : number = 0;
    const productsArrayToRender = products.map(element => {
        totalPrice = totalPrice + Number(element.price);
        return (<div className={styles.product} key={element.id}>
            <div className={styles.productName}>
                <Button type="primary" shape="circle" icon={<DeleteOutlined />}
                onClick={() => onDeleteProductHandler(element.id)} />
                <Link href={`/products/${element.id}`}>
                    {element.nftName}
                </Link>
                </div>
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