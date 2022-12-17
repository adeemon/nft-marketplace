import ReactVisibilitySensor from 'react-visibility-sensor'
import { InferGetStaticPropsType } from 'next'
import React, { useEffect } from 'react'

import MempozedMainContainer from '../components/MainContainer'
import { MemoizedCard } from '../components/ProductCard'
import { Product } from '../types/Types'
import { selectAllFavourites } from '../slices/FavouritesSlice'
import { fillTheState, selectAllProducts, selectIsFiled } from '../slices/ProductsContainerSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import { checkIsContains } from '../slices/CartSlice'

export default function Home({products} : InferGetStaticPropsType<typeof getStaticProps>) {
  const favouritesSelected = useAppSelector(selectAllFavourites);
  const productsSelected = useAppSelector(selectAllProducts);
  const dispatch = useAppDispatch();
  
  const arrayToRender = productsSelected.map((product) => {
    const isFavourite = checkIsContains(favouritesSelected, product.id);
    return (
      <MemoizedCard {...product} isFavourite={isFavourite} key={product.id} />
      )
    }
  )

  useEffect(() => {
    dispatch(fillTheState(products))
  },[])

  return (
    <MempozedMainContainer keywords={"Nft list"}>
      {arrayToRender}
    </MempozedMainContainer>
  )
}

export const getStaticProps = async () => {
  let products: Product[] = [];
  try {
    const fetchedData = await fetch('https://63971d5d86d04c76338b3ee4.mockapi.io/api/nfts');
    const result = await fetchedData.json();
    products = result;
  } 
  catch {
    console.error('Error on parsing');
  } 
  finally {
    return {
      props: {
        products,
      }
    }
  }
}
