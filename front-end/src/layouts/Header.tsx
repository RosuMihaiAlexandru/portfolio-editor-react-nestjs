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
        <div className='header'>
            <button className='primary' onClick={handleOpenModal}><FaPlus /> Create New</button>
            <div className='button-group'>
                <button className={`secondary icon ${type === 'list' && 'active'}`} onClick={() => { setViewType('list'); setType('list') }}><FaList /></button>
                <button className={`secondary icon ${type === 'grid' && 'active'}`} onClick={() => { setViewType('grid'); setType('grid') }}><BsFillGridFill /></button>
            </div>
            <CreateModal open={open} onCloseModal={handleCloseModal} />
        </div>
    )
}