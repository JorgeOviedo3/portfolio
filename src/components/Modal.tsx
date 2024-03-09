import { useState } from "preact/hooks";

interface IModal {
    text?: string;
    children: HTMLElement;
    image?: string;
}

const Modal = ({ children, text, image }: IModal) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {image ?
                <button onClick={() => setShowModal(true)}>
                    <img src={image} alt="image" width={50} height={50} />
                </button> :
                <button onClick={() => { setShowModal(true) }} class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button">
                    {text}
                </button>
            }

            {showModal && (
                <div className={"fixed top-0 text-black left-0 flex items-center justify-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen bg-black/50"}>
                    <div className="bg-white w-fit p-5 rounded-md">
                        <button className="text-red-500 block ms-auto" onClick={() => setShowModal(false)}>X</button>
                        {children}
                    </div>
                </div>
            )}

        </>
    )
}

export default Modal;
