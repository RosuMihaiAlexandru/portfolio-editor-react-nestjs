import { FaEye, FaEyeDropper, FaEyeSlash, FaLink } from "react-icons/fa";
import './style.scss'
import { Key } from "react";
import { observer } from "mobx-react-lite";
import portfolioStore from "../../store";

const PortfolioCard = observer((props: { type: any; portfolio: any }) => {
    const { type, portfolio } = props;

    const handleStatus = () => {
        const updateItem = { ...portfolio, status: !portfolio.status }
        portfolioStore.updateItem(updateItem);
    }
    return (
        <div className={`card ${type}`}>
            <div className="media">
                <img src={"/img/image.avif"} alt="" />
            </div>
            <div className="main-body">
                <h1 className="title">
                    {portfolio.title}
                </h1>
                <div className="description">
                    {portfolio.description}
                </div>
                <div className="techs">
                    {portfolio.skills.map((skill: string, index: Key) => (
                        <p key={index}>{skill}</p>
                    ))}
                </div>
            </div>
            <div className="card-footer">
                <a className="link" href={portfolio.livelink} target="_blank"><FaLink />{' '}Live demo</a>
                <div className="status cursor-pointer hover:text-[#4c1d95]" onClick={handleStatus}>{portfolio.status ? <FaEye /> : <FaEyeSlash />}</div>
            </div>
        </div>
    )
})


export default PortfolioCard;

