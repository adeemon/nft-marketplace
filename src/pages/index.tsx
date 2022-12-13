import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainContainer from '../components/MainContainer'
import ProductCard from '../components/ProductCard'
import { testProduct } from '../components/testData'

export default function Home() {
  let temp = <ProductCard name={testProduct.name} avatar={testProduct.avatar} price={testProduct.price} 
            nftName={testProduct.nftName} id={testProduct.id} image={testProduct.image} />
  return (
    <MainContainer keywords={"kekw"}>
      {temp}
    </MainContainer>
  )
}