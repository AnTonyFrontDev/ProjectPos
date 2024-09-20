// import React from 'react'

import { Fragment } from "react"
import { SideData } from "@/util/routes.data"
import { AppIcon } from "./AppIcon"
import { Link } from "react-router-dom"

// import React from 'react'

const Sidebar = () => {
    return (
        <Fragment>
            <div className={`text-white ml-2 w-42 transition-all ease-in-out`}>
                <div className="h-36 font-sans text-1xl">
                    <div className="mt-2 flex justify-center">
                        Beta: V1.1
                    </div>
                    <div className="flex justify-center p-8">
                        {/* <AppIcon type='dashboard' className="cursor-pointer mx-2" width={82}></AppIcon> */}
                        <img src="/logo.png" alt="" className="bg-slate-50 border rounded-lg"/>
                    </div>
                </div>
                {/* mapeo de opciones para el menu sidebar Seguir SideData para cambiar contenido */}
                <ul className="mt-28">
                    {SideData.map((route, index) => (
                        <li key={index} className="
                    my-2 flex justify-between p-2 rounded-s-md hover:bg-neutral-600 transition-colors duration-300">
                            <div className="flex ">
                                <Link to={route.path} className={` flex`}>
                                    {/* @ts-expect-error: Type busca un string y no detecta la variable */}
                                    <AppIcon type={route.icon} className="cursor-pointer mx-2" width={18}></AppIcon>
                                    {route.name}
                                    ‎
                                </Link>
                            </div>
                            {/* <AppIcon type="next" className="cursor-pointer " width={18}></AppIcon> */}
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    )
}

export default Sidebar

