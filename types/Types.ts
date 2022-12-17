export type Product = {
    name: string,
    avatar: string,
    price: number,
    nftName: string,
    id: number,
    image: string,
}

export type ContainerContent = {
    products: Array<Product>
}

export type ProductInfo = Product & {isFavourite: boolean};

export type StateType = {
    products: Product[],
}
