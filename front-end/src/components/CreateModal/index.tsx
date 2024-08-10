import { useState } from "react";
import { FaImages } from "react-icons/fa";
import { LuReplaceAll } from "react-icons/lu";
import Modal from "react-responsive-modal";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { observer } from "mobx-react-lite";

import "react-responsive-modal/styles.css";

import './style.css';
import portfolioStore from "../../store";

const TechSkills = [
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Ember.js", label: "Ember.js" },
    { value: "Svelte", label: "Svelte" },
    { value: "Next.js", label: "Next.js" },
    { value: "Gatsby", label: "Gatsby" },
    { value: "Stencil", label: "Stencil" },
    { value: "Nuxt.js", label: "Nuxt.js" },
    { value: "Backbone.js", label: "Backbone.js" },
    { value: "Meteor", label: "Meteor" },
    { value: "Polymer", label: "Polymer" },
    { value: "Aurelia", label: "Aurelia" },
    { value: "Knockout.js", label: "Knockout.js" },
    { value: "Mithril", label: "Mithril" },
    { value: "Alpine.js", label: "Alpine.js" },
    { value: "Riot.js", label: "Riot.js" },
    { value: "Marko", label: "Marko" },
    { value: "Inferno", label: "Inferno" },
    { value: "Emotion", label: "Emotion" },
];

const CreateModal = observer((props: { open: any; onCloseModal: any; }) => {
    const { open, onCloseModal } = props;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        livelink: '',
        skills: [],
        image: null as File | null,
        status: true
    });
    const [hovered, setHovered] = useState(false);
    const animatedComponents = makeAnimated();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const imageFile = e.target.files[0];
            setFormData({
                ...formData,
                image: imageFile,
            });
        }
    };

    const onSubmit = (e: { preventDefault: () => void; }) => {
        // Your submission logic here
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        portfolioStore.addPortfolio(formData);
        onCloseModal(true)
    };

    return (
        <Modal open={open} onClose={onCloseModal} center classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
        }}>
            <form onSubmit={onSubmit} >
                <div className="text-lg space-y-12 pt-12 pb-6 px-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="title" className="block text-xl font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    // {...register('title', {
                                    //     required: 'Title is required',
                                    //     minLength: {
                                    //         value: 3,
                                    //         message: 'Title must be at least 3 characters',
                                    //     },
                                    // })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 space-y-6">
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-xl font-medium leading-6 text-gray-900">Description:</label>
                                <div className="mt-2">
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange} rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                <label htmlFor="livelink" className="block text-xl font-medium leading-6 text-gray-900">
                                    Live Link
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text" 
                                        name="livelink"
                                        value={formData.livelink}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="skills" className="block text-xl font-medium leading-6 text-gray-900">
                                    Select Skills:
                                </label>
                                <div className="mt-2">
                                    <Select
                                        isMulti
                                        options={TechSkills as { value: never; label: never }[]}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        name="skills"
                                        value={formData.skills.map((value) => ({ value, label: value }))}
                                        onChange={(selectedOptions: any) => {
                                            const selectedValues = selectedOptions.map((option: { value: any; }) => option.value);
                                            setFormData({ ...formData, skills: selectedValues });

                                        }}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3 flex flex-col">
                            <label htmlFor="cover-photo" className="block text-xl font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            {formData.image ? (
                                <div
                                    className="mt-2 flex flex-1 items-center justify-center rounded-lg border border-gray-900/25 overflow-hidden relative"
                                    onMouseLeave={() => setHovered(false)}
                                    onMouseEnter={() => setHovered(true)}
                                >
                                    {hovered &&
                                        <div className="absolute flex top-0 left-0 w-full h-full bg-[#0000008f] items-center justify-center z-10">
                                            <label
                                                htmlFor="file-upload"
                                                className="bg-[#fff] w-[60px] h-[60px] flex items-center justify-center border border-[#0cb60c] text-[#0cb60c] rounded-full cursor-pointer"
                                            >
                                                <LuReplaceAll />
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                                            </label>
                                            {/* <button className=""><LuReplaceAll/></button> */}
                                        </div>}
                                    <img src={URL.createObjectURL(formData.image)} alt="Uploaded" className="w-full h-full z-0" />


                                </div>
                            ) : (
                                <div className="mt-2 flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ">
                                    <div className="text-center">
                                        <FaImages aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-xl leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="bg-[#7e22ce] float-right">Submit</button>
                </div>

            </form>
        </Modal>
    )
})

export default CreateModal;