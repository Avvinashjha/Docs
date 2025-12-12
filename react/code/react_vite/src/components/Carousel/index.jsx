import React, { useEffect, useState } from 'react'
import { getCarouselData } from '../../services/api';
import "./style.css";

const Carousel = () => {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCarouselData().then(data => {
            setData(data);
            setIsLoading(false);
        })
        return () => setData([]);
    }, [])

    const handleSlide = (e) => {
        const direction = e.target.getAttribute("aria-controls");

        if (direction === "left") {
            if (activeIndex === 0) {
                setActiveIndex(data.length - 1);
            } else {
                setActiveIndex((prev) => prev - 1);
            }
        }

        else if (direction === "right") {
            if (activeIndex === data.length - 1) {
                setActiveIndex(0);
            } else {
                setActiveIndex((prev) => prev + 1);
            }
        }
    }


    return (
        <div className='carousel__container'>
            <div className='carousel__card'>

                <div aria-controls="left" className='carousel_btn left_btn' onClick={handleSlide}>{'<'}</div>

                <div className="carousel__viewport">
                    <div
                        className="carousel__track"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {isLoading? "Loading": data.map((item, idx) => (
                            <div key={idx} className="carousel__item">
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div aria-controls="right" className='carousel_btn right_btn' onClick={handleSlide}>{'>'}</div>

            </div>
        </div>

    )
}

export default Carousel;