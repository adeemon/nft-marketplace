import Style from '../styles/ProductCard.module.scss';
import React, { useEffect } from 'react';
import Image from "next/image";
import ethIcon from '../images/ethereum (1) 1.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { addFavourite, removeFavourite } from '../slices/FavouritesSlice'
import { useDispatch, useSelector } from "react-redux";
import { ProductInfo } from '../types/Types';
import { addProduct, removeProduct } from '../slices/ProductsContainerSlice';
import { useAppDispatch } from '../store/store';
import { addProductToCart } from '../slices/CartSlice';
import { EthIcon } from './Eth';
import { Button } from 'antd'
import Link from 'next/link';

type ImageInfo = {
    src: string
}

export const myLoader = ({src} : ImageInfo) => {
    return src;
}

export const MemoizedCard = React.memo(ProductCard);

export default function ProductCard ({name, avatar, price, nftName, id, image, isFavourite} : ProductInfo) {
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        console.log(id);
        location.href=`/products/${id}`
    }

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
            dispatch(removeProduct(id));
            dispatch(addFavourite({name, avatar, price, nftName, id, image}));
        } else {
            dispatch(removeFavourite(id));
            dispatch(addProduct({name, avatar, price, nftName, id, image}));
        }
    }

    useEffect(()=> {
        console.log('Card rendered');
    })

    return (
        <>
        <Link href={`/products/${id}`} >
            <div className={Style.container} >       
                <div className={Style.mainMenu}>
                    <div className={Style.priceInfo}>
                        <div className={Style.bid}>Price</div>
                        <div className={Style.price}>
                            <EthIcon />
                            {price} ETH
                            </div>
                    </div>
                    <Button type="default" 
                    className={isFavourite ? Style.markedFavourite : Style.favouriteButton}
                    onClick={(e) => onFavouriteHandler(e)} 
                    area-label={'Set as favourite'}>

                    <FontAwesomeIcon icon={faHeart} />
                    </Button>
                    <Button type="primary" className={Style.button} 
                    onClick={e => onBuyHandler(e)} aria-label={'Buy button'}>
                        Buy
                    </Button>
                </div>
                <div className={Style.image}>
                    <Image src={image} loader={myLoader} alt={{name} + 'image'} width={100} height={100} />
                </div>
                <div className={Style.nft}>
                    <div className={Style.nftInfo}>
                    <div className={Style.nftName}>
                            {nftName}
                        </div>
                    <div className={Style.author}>
                        <Image src={avatar} loader={myLoader} alt={{name} + 'image'} width={100} height={100} />
                        <div className={Style.authorName}>
                            {name}
                        </div>
                    </div>
                    </div>          
                </div>
            </div>
            </Link>
        </>
    )
}

