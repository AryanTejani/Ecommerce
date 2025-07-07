import React, { useRef } from 'react'
import Item from '../Item/Item';
import "./Populer.css"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import data_product from '../Assets/data';
import { useSelector } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

const PopulerInWomen = () => {
    const user = useSelector(state => state.auth.userData);
    const GsapRef = useRef(null);
    const CardRef = useRef(null);
    useGSAP(() => {
        gsap.from(GsapRef.current, {
            y: 30,
            opacity: 0,
            delay: 0.5,
            duration: 0.5,
            stagger: 0.3,
            scrollTrigger: {
                trigger: "#Trigger",
                scroller: "body",
            }
        });

        gsap.from(CardRef.current, {
            y: 30,
            opacity: 0,
            delay: 1,
            duration: 0.5,
            stagger: 0.3,
            scrollTrigger: {
                trigger: "#Trigger",
                scroller: "body",
            }
        });
    });
    return (
        <div className="populer flex w-full flex-col justify-center items-center" id='Trigger'>
            <h1 ref={GsapRef}>POPULER IN WOMEN</h1>
            <div className='populer-women-section flex flex-wrap justify-center' ref={CardRef}>
                {data_product.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        price={item.new_price}
                        category={item.category}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    />
                ))}
            </div>
        </div>
    )


}

export default PopulerInWomen
