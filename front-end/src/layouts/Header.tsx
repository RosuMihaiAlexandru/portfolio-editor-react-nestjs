import { FaList, FaPlus } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";
import CreateModal from "../components/CreateModal";

export default function Header(props: { setViewType: any; }) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('list')
    const { setViewType } = props;

    const handleOpenModal = () => {
        setOpen(true);
    }
    const handleCloseModal = () => {
        setOpen(false);
    }

    return (
        <div className="flex flex-col md:flex-row justify-between w-full py-8 lg:px-8">
            <button className="btn btn-primary mb-4 md:mb-0" onClick={handleOpenModal}>
                <FaPlus /> Create New
            </button>
            <div className="flex gap-2">
                <button className={`btn btn-secondary ${type === 'list' && 'active'}`} onClick={() => { setViewType('list'); setType('list') }}>
                    <FaList />
                </button>
                <button className={`btn btn-secondary ${type === 'grid' && 'active'}`} onClick={() => { setViewType('grid'); setType('grid') }}>
                    <BsFillGridFill />
                </button>
            </div>
            <CreateModal open={open} onCloseModal={handleCloseModal} />
        </div>
    )
}