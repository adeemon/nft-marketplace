import styles from '../../styles/products.module.scss'
import MainContainer from '../../components/MainContainer'
import { Product } from '../../types/Types'
import { EthIcon } from '../../components/Eth'
import { Button } from 'antd'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { myLoader } from '../../components/ProductCard'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { addProductToCart, checkIsContains } from '../../slices/CartSlice'
import { addFavourite, removeFavourite, selectAllFavourites } from '../../slices/FavouritesSlice'
import { addProduct, removeProduct, selectAllProducts, selectIsFiled } from '../../slices/ProductsContainerSlice'

export default function ProductPage({name, avatar, price, nftName, id, image} : 
    InferGetServerSidePropsType<typeof getServerSideProps>) {
        const dispatch = useAppDispatch();
        const favourites = useAppSelector(selectAllFavourites);
        const isFavourite = checkIsContains(favourites, id);
        const isStartedOnHomePage = useAppSelector(selectIsFiled);

    const onBuyClickHandler = () => {
        dispatch(addProductToCart({name, avatar, price, nftName, id, image}))
    }
    const onFavouriteClickHandler = () => {
        if (!isFavourite) {
            dispatch(removeProduct(id));
            dispatch(addFavourite({name, avatar, price, nftName, id, image}));
        } else {
            dispatch(removeFavourite(id));
            if (isStartedOnHomePage) {
                dispatch(addProduct({name, avatar, price, nftName, id, image}));
            }
        }
    }

    return (
        <MainContainer keywords={name}>
            <div className={styles.container}>
                <div className={styles.image}>
                <Image src={image} loader={myLoader} alt={{name} + 'image'} width={200} height={200} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        {nftName}
                    </div>
                    <p className={styles.by}>
                        BY
                    </p>
                    <div className={styles.author}>
                        {name}
                    </div>
                    <div className={styles.price}>
                        <div>
                            {price}
                        </div>
                        <EthIcon />
                    </div>
                    <div className={styles.menu}>
                        <Button type="primary" onClick={onBuyClickHandler}>Buy</Button>
                        <Button type="primary" onClick={onFavouriteClickHandler}>
                            {isFavourite 
                            ? 'Unfavourite'
                            : 'Favourite'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context : any) => {
    const parsedId = context.params.id;
    const response =  await fetch(`https://63971d5d86d04c76338b3ee4.mockapi.io/api/nfts/${parsedId}`)
    const {name, avatar, price, nftName, id, image} = await response.json()
    return {
            props: {name, avatar, price, nftName, id, image},
    }
}
