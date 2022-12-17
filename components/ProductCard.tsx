import Image from "next/image";
import React, { useEffect, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import { Button } from 'antd'
import Link from 'next/link';
import ReactVisibilitySensor from 'react-visibility-sensor';

import styles from '../styles/productCard.module.scss';
import { addFavourite, removeFavourite } from '../slices/FavouritesSlice'
import { ProductInfo } from '../types/Types';
import { useAppDispatch } from '../store/store';
import { addProductToCart } from '../slices/CartSlice';
import { EthIcon } from './Eth';

type ImageInfo = {
    src: string
}

export const myLoader = ({src} : ImageInfo) => {
    return src;
}

export const MemoizedCard = React.memo(ProductCard);

export default function ProductCard ({name, avatar, price, nftName, id, image, isFavourite} : ProductInfo) {
    const dispatch = useAppDispatch();
    const onBuyHandler = (e : MouseEvent) => {
        const product = {name, avatar, price, nftName, id, image};
        dispatch(addProductToCart(product))
        e.preventDefault();
        e.stopPropagation();
    }

    const onFavouriteHandler = (e : MouseEvent) => {
        console.log(id + ' favourite');
        e.preventDefault();
        e.stopPropagation();
        if (!isFavourite) {
            dispatch(addFavourite({name, avatar, price, nftName, id, image}));
        } else {
            dispatch(removeFavourite(id));
        }
    }

    useEffect(()=> {
        console.log(`Card ${id + ' '+name} rendered`);
    })

    return (
        <Link href={`/products/${id}`} >
            <div className={styles.container} >       
                <div className={styles.mainMenu}>
                    <div className={styles.priceInfo}>
                        <div className={styles.bid}>Price</div>
                        <div className={styles.price}>
                            <EthIcon />
                            {price} ETH
                        </div>
                    </div>
                    <Button type="default" 
                    className={isFavourite ? styles.markedFavourite : styles.favouriteButton}
                    onClick={(e) => onFavouriteHandler(e)} 
                    area-label={'Set as favourite'}>
                    <FontAwesomeIcon icon={faHeart} />
                    </Button>
                    <Button type="primary" className={styles.button} 
                    onClick={e => onBuyHandler(e)} aria-label={'Buy button'}>
                        Buy
                    </Button>
                </div>
                <div className={styles.image}>
                    <Image src={image} loader={myLoader} alt={{name} + 'image'} width={100} height={100} />
                </div>
                <div className={styles.nft}>
                    <div className={styles.nftInfo}>
                    <div className={styles.nftName}>
                            {nftName}
                        </div>
                    <div className={styles.author}>
                        <Image src={avatar} loader={myLoader} alt={{name} + 'image'} width={100} height={100} />
                        <div className={styles.authorName}>
                            {name}
                        </div>
                    </div>
                    </div>          
                </div>
            </div>
        </Link>
    )
}

