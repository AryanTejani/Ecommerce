import React from 'react'
import "../header/Header.css"
import HeroImage from "../Assets/hero_image.png";
import Button from "../../Button";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Firstpage = () => {

    useGSAP(() => {
        gsap.from(".front-page h1,.front-page p,.front-page .mt-5", {
            y: 20,
            opacity: 0,
            delay: 0.5,
            duration: 0.5,
            stagger: 0.3,
        });

        gsap.from(".front-page img", {
            x: 180,
            opacity: 0,
            delay: 0.8,
            duration: 0.5,
        });
    });

    return (
        <div className='pink w-full'>
            <div className='front-page'>
                <div>
                    <p>NEW ARRIVALS ONLY</p>
                    <h1>Welcome to </h1>
                    <h1>URBAN VOGUE</h1>
                    <h1>your quintessential</h1>
                    <h1>destination for </h1>
                    <h1>exquisite fashion</h1>
                    <div>
                        <Button style={{ backgroundColor: 'orange', height: '55px', fontWeight: 'bold' }} className='mt-5 rounded-lg' children={"Latest Collection"} />
                    </div>
                </div>
                <div>
                    <img src={HeroImage} alt="Nothing" />
                </div>

            </div>
        </div>
    )
}

export default Firstpage
