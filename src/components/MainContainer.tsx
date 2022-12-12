import Head from "next/head";
import Image from 'next/image';
import facebookIconPath from '../images/facebook.svg';
import twitterIconPath from '../images/twitter.svg';
import linkedInIconPath from '../images/linkedin.svg';
import logo from '../images/logo.svg';
import styles from'../styles/MainContainer.module.scss';
import cartIconPath from '../images/cart-shopping-solid.svg';
import Link from "next/link";
import starPath from '../images/star.svg'


type MainContainerProps = {
    children: React.ReactNode,
    keywords: String;
}


export default function MainContainer ({children, keywords} : MainContainerProps) {
    return (
        <div className={styles['main-container']}>
            <Head>
                <title>NFT</title>
            </Head>
            <header className={styles["header"]}>
                <div className={styles["header__logo"]} >
                    <Link href="/"><Image src={logo} alt="Company logo" width={191} height={48} /></Link>
                </div>
                <div className={styles["header__cart"]}>
                    <button aria-label="Открыть корзину"> <Image src={cartIconPath} alt="Cart icon" width={16} height={16} /></button>
                   
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <div className={styles["about__container"]}>
                    <div className={styles["about__logo"]}>
                        <Image src={logo} alt="Company logo" width={100} height={100} />
                    </div>
                    <div className={styles["about__icons"]}>
                        <div className={styles["contact-icons__container"]}>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Мы на Фейсбук"><Image src={facebookIconPath} alt="Facebook icon" width={100} height={100} /></a>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Мы на Линкедин"><Image src={linkedInIconPath} alt="Linkedin icon" width={100} height={100} /></a>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Мы на Твиттер"><Image src={twitterIconPath} alt="Twitter icon" width={100} height={100} /></a>
                        </div>
                    </div>
                </div>
            </footer>
            <div className={styles.effects}>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star1}/>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star2}/>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star3}/>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star4}/>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star5}/>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star6}/>
                <Image src={starPath} alt="Star!" height={15} width={13} className={styles.star} id={styles.star7}/>
                <div className={styles['light-bubble']} id={styles.bubble1} />
                <div className={styles['light-bubble']} id={styles.bubble3} />
                <div className={styles['light-bubble']} id={styles.bubble4} />
                <div className={styles['light-bubble']} id={styles.bubble5} />
                <div className={styles['light-bubble']} id={styles.bubble6} />
            </div>
        </div>
    )
}