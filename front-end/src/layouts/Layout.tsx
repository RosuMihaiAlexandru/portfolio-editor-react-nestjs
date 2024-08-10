
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import portfolioStore from "../store";
import PortfolioCard from "../components/PortfolioCard";
import Footer from "./Footer";
import Header from "./Header";

const Layout = observer(() => {
    const [viewType, setViewType] = useState('grid');

    useEffect(() => {
        portfolioStore.fetchPortfolios();
    }, []);

    return (
        <div className='layout'>
            <Header setViewType={setViewType} />
            <div className={`content ${viewType}`}>

                {portfolioStore.portfolios ? portfolioStore.portfolios.map((portfolio, index) => (
                    <PortfolioCard key={index} type={viewType} portfolio={portfolio} />
                )) : <p className="text-xl text-white">No Items</p>}
            </div>
            <Footer />
        </div>
    )
})

export default Layout;