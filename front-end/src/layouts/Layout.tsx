
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import { observer } from "mobx-react-lite";
import portfolioStore from "../store";
import PortfolioCard from "../components/PortfolioCard";
import Footer from "./Footer";
import Header from "./Header";

const Layout = observer(() => {
    const [viewType, setViewType] = useState('list');

    useEffect(() => {
        portfolioStore.fetchPortfolios();
    }, []);

    if (!portfolioStore.portfolios) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <ReactLoading type={"spin"} color={"#fff"} height={667} width={375} />
            </div>
        )
    }

    return (
        <div className='flex flex-col w-[100vw] min-h-[100vh] max-w-[1440px] mx-auto'>
            <Header setViewType={setViewType} />
            {!portfolioStore.portfolios.length ? (
                <div className="flex-1 py-10 text-[28px] md:text-lg sm:text-base text-white text-center">No items</div>
            ) : (
                <div className={`content ${viewType === 'grid' ? 'grid grid-cols-3' : 'flex flex-col'} gap-5 flex-1 p-10 w-full`}>
                    {portfolioStore.portfolios.map((portfolio, index) => (
                        <PortfolioCard key={index} type={viewType} portfolio={portfolio} />
                    ))}
                </div>
            )}
            <Footer />
        </div>

    )
})

export default Layout;