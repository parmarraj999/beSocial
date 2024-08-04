import React, { useEffect, useRef, useState } from 'react'
import "./stories.css"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { motion } from "framer-motion"

function AddStory() {

    const [scale, setScale] = useState(1)

    const increase = () => {
        setScale(scale + 0.2)
    }
    const decrease = () => {
        setScale(scale - 0.2)
    }



    return (
        <div className='story-board-container'>
            <div className='story-slider'>

            </div>
            <div className='story-board' >
                <div >
                    <motion.img
                        drag
                        style={{ scale: `${scale}` }} src="../../../../image/doodle-one.jpg" alt="test" />
                </div>
            </div>
            <div className='story-reaction-container'>
                <button onClick={increase}>+</button>
                <button >click</button>
                <button onClick={decrease}>-</button>
            </div>
        </div>
    )
}

export default AddStory

