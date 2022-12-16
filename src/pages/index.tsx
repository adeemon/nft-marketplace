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
  const favourites = useAppSelector(selectAllFavourites);
  const productsSelected = useAppSelector(selectAllProducts);
  const dispatch = useAppDispatch();
  const isFilled = useAppSelector(selectIsFiled);
  
  const favouritesToRender = favourites.map((product) => {
    return (
        <MemoizedCard {...product} isFavourite={true} key={product.id} />
    )
  })

  const productsToRender = productsSelected.map((product) => {
    return (
      <MemoizedCard {...product} isFavourite={false} key={product.id} />
      )
    }
  )

  useEffect(() => {
    if (isFilled && favourites.length > 0) {
      let temp : Product[] = [];
      products.forEach(product => {
        if (!checkIsContains(favourites, product.id)) {
          temp.push(product);
        }
        dispatch(fillTheState(temp))
      })
    } else
    dispatch(fillTheState(products))
  },[])

  return (
    <MempozedMainContainer keywords={"Nft list"}>
      {[...favouritesToRender, ...productsToRender]}
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
