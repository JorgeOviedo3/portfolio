import { TbSmartHome, TbBooks, TbMail } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";


const Navbar = () => {

    const links = [
        [
            {
                name: "Home",
                path: "/",
                icon: <TbSmartHome size={24} />
            },
            {
                name: "Projects",
                path: "/projects",
                icon: <TbBooks size={24} />
            },
        ],
        [
            {
                name: "Resume",
                path: "/resume",
                icon: <RiContactsLine size={24} />
            },
            {
                name: "Contact",
                path: "/contact",
                icon: <TbMail size={24} />
            }
        ]
    ]

    return (
        <nav className="w-full">
            {/* <div className="flex flex-row items-center gap-5 bg-gray-200 rounded-full mx-auto p-5 w-fit">
                {
                    links.map((link) => (
                        <a key={link.name} className="text-black flex items-center gap-2 font-nexus font-semibold text-md leading-4" href={link.path}>
                            {link.icon}
                            <span className="">{link.name}</span>
                        </a>
                    ))
                }
            </div> */}
            <div className="flex justify-between items-center pt-11 px-20">
                <div className="flex gap-6">
                    {links[0].map((link) => (
                        <a key={link.name} className="text-black bg-maingray p-6 rounded-full hover:scale-105" href={link.path}>
                            {link.icon}
                        </a>
                    ))}
                </div>
                <h1 class="text-5xl text-black font-caros">Jorge Oviedo</h1>
                <div className="flex gap-6">
                    {links[1].map((link) => (
                        <a key={link.name} className="text-black bg-maingray p-6 rounded-full transition hover:scale-105" href={link.path}>
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
