import { FaEye, FaEyeSlash, FaLink } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import portfolioStore from "../../store";

const PortfolioCard = observer((props: { type: any; portfolio: any }) => {
    const { type, portfolio } = props;
    // const skills = JSON.parse(portfolio?.skills);

    const handleStatus = () => {
        const updateItem = { ...portfolio, status: !portfolio.status }
        portfolioStore.updateItem(updateItem);
    }
    return (
        <div className={`border border-[#339D41D0] rounded-lg w-full h-fit text-white overflow-hidden ${type === 'list' && 'flex'}`}>
            <div className={`media border-b border-[#bbbbbb52] ${type === 'list' && 'w-[30%] border-r'}`}>
                <img className="h-full" src={`http://127.0.0.1:5000/uploads/${portfolio.image}`} alt="" />
            </div>
            <div className="main-body p-8 flex-1">
                <h1 className="title font-bold mb-2 text-[32px] md:text-lg sm:text-base">
                    {portfolio.title}
                </h1>
                <div className="description text-[22px] mb-5 text-justify">
                    {portfolio.description} This is description. This is description. This is description. This is description. This is description. This is description. This is description.
                </div>
                <div className="techs flex flex-wrap gap-1">
                    {portfolio.skills.map((skill: any, index: any) => (
                        <p key={index} className="flex items-center bg-[#AD38D1] text-[18px] px-6 py-2 rounded-full">
                            {skill}
                        </p>
                    ))}
                </div>
            </div>
            <div className={`card-footer flex justify-between p-8 border-t border-[#bbbbbb52] text-xl`}>
                {type === 'list' ? (
                    <div className="flex flex-col gap-2">
                        <a className="btn btn-primary link text-white flex items-center gap-1" href={portfolio.livelink} target="_blank" rel="noreferrer">
                            <FaLink /> Live demo
                        </a>
                        <p className="btn btn-secondary status text-white flex items-center gap-1 cursor-pointer hover:text-[#bab9bbaf]" onClick={handleStatus}>
                            {portfolio.status ? <FaEye /> : <FaEyeSlash />}
                        </p>
                    </div>
                ) : (
                    <>
                        <a className="link text-white flex items-center gap-1" href={portfolio.livelink} target="_blank" rel="noreferrer">
                            <FaLink /> Live demo
                        </a>
                        <p className="status text-white flex items-center gap-1 cursor-pointer hover:text-[#4c1d95]" onClick={handleStatus}>
                            {portfolio.status ? <FaEye /> : <FaEyeSlash />}
                        </p>
                    </>

                )}

            </div>
        </div>

    )
})


export default PortfolioCard;

