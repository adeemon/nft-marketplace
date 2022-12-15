import Image from 'next/image';
import ethIcon from '../images/ethereum (1) 1.svg';

export function EthIcon () {
    return (
        <Image src={ethIcon} alt='Eth logo' width={16} height={16} />
    )
}