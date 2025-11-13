'use client'

import { useState } from "react"

const ModalProvider = () => {

     const [isMounted,setIsMounted] = useState(false);
     

    return (
        <div>ModalProvider</div>
    )
}

export default ModalProvider