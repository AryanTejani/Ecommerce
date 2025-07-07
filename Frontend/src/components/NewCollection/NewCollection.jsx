import React, { useRef, useEffect, useState } from 'react';
import "./NewCollection.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetDataQuery } from '../../store/cartSlice';
import Item from "../Item/Item";
import { useGSAP } from '@gsap/react';
import { useSelector } from 'react-redux';
import { getOutOfStockProducts } from '../../store/authSlice';

gsap.registerPlugin(ScrollTrigger);

const NewCollection = () => {
    const GsapRef = useRef(null);
    const CardRef = useRef(null);
    const { data, isLoading, error } = useGetDataQuery();
    const [recentProducts, setRecentProducts] = useState([]);
    const outOfStockProducts = useSelector(getOutOfStockProducts);

    useEffect(() => {
        if (data?.products && data.products.length > 0) {
            const sortedProducts = [...data.products]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 8);

            setRecentProducts(sortedProducts);
        }
    }, [data]);

    useGSAP(() => {
        if (recentProducts.length > 0) {
            const animateElements = (ref, delay) => {
                gsap.from(ref.current, {
                    y: 30,
                    opacity: 0,
                    delay,
                    duration: 0.5,
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: ref.current,
                        scroller: "body",
                    }
                });
            };

            if (GsapRef.current) {
                animateElements(GsapRef, 0.5);
            }

            if (CardRef.current) {
                animateElements(CardRef, 1);
            }
        }
    }, [recentProducts]);

    console.log(outOfStockProducts);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;
    if (recentProducts.length === 0) return <div>No products available.</div>;

    return (
        <section>
            <div className="new-collection">
                <h1 ref={GsapRef}>New Collection</h1>
            </div>
            <div className="new-collection-item flex flex-wrap justify-center" ref={CardRef}>
                {recentProducts.map((item) => {
                    const isOutOfStock = outOfStockProducts.some(product => product.id === item._id);
                    return (
                        <div key={item._id} className="relative">
                            {isOutOfStock && (
                                <div className="absolute top-0 left-0 bg-red-500 text-white p-1 text-sm">
                                    Out of Stock
                                </div>
                            )}
                            <Item
                                id={item._id}
                                name={item.name}
                                image={item.mainImage.url}
                                price={item.price}
                                category={item.category}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default NewCollection;
