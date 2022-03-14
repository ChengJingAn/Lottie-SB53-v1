import React, { useEffect, useContext, useRef, useState } from 'react';
import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';

import { UserContext } from '../../components/BaseShot';
import { prePathUrl, generateStandardNum } from "../../components/CommonFunctions"

let timerList = []
//-0.5,1.25,5,-5


export default function Review1({ _baseGeo, nextFunc }) {
    const audioList = useContext(UserContext)
    const starList = Array.from({ length: 25 }, ref => useRef())
    const baseRef = useRef()

    useEffect(
        () => {

            setTimeout(() => {
                starList.map((star, index) => {
                    setTimeout(() => {
                        star.current.className = 'show'
                    }, 200 * index);
                })
            }, 1500);

            setTimeout(() => {
                nextFunc()
            }, 10000);
            return () => {
            }
        }, []
    )

    return (
        <div ref={baseRef}
            className="aniObject"  >
            <div
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.0 + "px",
                    bottom: _baseGeo.bottom + _baseGeo.height * 0.0 + "px",
                }}>


                {
                    Array.from(Array(25).keys()).map(value =>
                        <div
                            ref={starList[value]}
                            className='hide'
                            style={{
                                position: 'absolute',
                                width: '10%',
                                height: '10%',
                                left: (0.2 + (value % 5) * 0.125) * 100 + '%',
                                top: (0.2 + 0.12 * parseInt((value / 5))) * 100 + '%',
                            }}>

                            < BaseImage
                                scale={1.5}
                                posInfo={{ t: -0.8, l: -0.3 }}
                                url={'SB_53_Prop-Interactive/SB53_stone_01.svg'}
                            />
                            < BaseImage
                                scale={0.5}
                                posInfo={{ l: 0.15, t: -0.1 }}
                                url={'SB_53_Text-Interactive/SB_53_TI_Game1_1' + generateStandardNum((value + 1) * 2) + '.svg'}
                            />
                        </div>
                    )
                }



            </div>
        </div>
    );

}
