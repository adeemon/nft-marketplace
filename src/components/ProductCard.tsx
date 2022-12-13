import { Product } from "./testData";
import Style from '../styles/ProductCard.module.scss'
import Image from "next/image";
import ethIcon from '../images/ethereum (1) 1.svg'
import border from '../images/cardBackground.svg'

type ImageInfo = {
    src: string
}

const myLoader = ({src} : ImageInfo) => {
    return src;
}

export default function ProductCard ({name, avatar, price, nftName, id, image} : Product) {
    return (
        <div className={Style.container}>
            
            <div className={Style.mainMenu}>
                <div className={Style.priceInfo}>
                    <p className={Style.bid}>Price</p>
                    <p className={Style.price}>
                        <Image src={ethIcon} alt='Eth logo' width={16} height={16} />
                        {price} ETH
                        </p>
                </div>
                <button className={Style.button}>
                    Buy
                </button>
            </div>
            <div className={Style.image}>
                <Image src={image} loader={myLoader} alt={{name} + 'image'} width={100} height={100} />
            </div>
            <div className={Style.nft}>
                <div className={Style.nftInfo}>
                <p className={Style.nftName}>
                        {nftName}
                    </p>
                <div className={Style.author}>
                    <Image src={avatar} loader={myLoader} alt={{name} + 'image'} width={100} height={100} />
                    <p className={Style.authorName}>
                        {name}
                    </p>
                </div>
                </div>
                
            </div>
        </div>
    )
}

//<Image src={border} alt='Card border' width={384} height={460} className={Style.border} />