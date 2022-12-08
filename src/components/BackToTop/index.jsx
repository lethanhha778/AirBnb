import React from 'react'
import { useEffect, useState } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import './style.scss'

export default function BackToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="top-to-btn">
            {showTopBtn && (
                <div className='icon-position icon-style' onClick={goToTop} >
                    <img src="https://seeklogo.com/images/A/airbnb-logo-1D03C48906-seeklogo.com.png" alt="" />
                </div>
            )}
        </div>
    );
}
