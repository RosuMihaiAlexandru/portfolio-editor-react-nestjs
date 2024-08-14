import { FaList, FaPlus } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";
import CreateModal from "../components/CreateModal";
import { useMediaQuery } from "react-responsive";

export default function Header(props: { setViewType: any; }) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('list')
    const { setViewType } = props;
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const handleOpenModal = () => {
        setOpen(true);
    }
    const handleCloseModal = () => {
        setOpen(false);
    }

    return (
        <div className="flex justify-between w-full py-8 max-2xl:px-8">
            <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
                <FaPlus /> Create New
            </button>
            {!isTabletOrMobile && (
                <div className="flex gap-2">
                    <button className={`btn btn-secondary mb-4 ${type === 'list' && 'active'}`} onClick={() => { setViewType('list'); setType('list') }}>
                        <FaList />
                    </button>
                    <button className={`btn btn-secondary mb-4 ${type === 'grid' && 'active'}`} onClick={() => { setViewType('grid'); setType('grid') }}>
                        <BsFillGridFill />
                    </button>
                </div>
            )}
            <CreateModal open={open} onCloseModal={handleCloseModal} />
        </div>
    )
}