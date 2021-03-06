import React, { useContext, useState, useEffect, useRef } from 'react';
import "../../stylesheets/styles.css";

import Lottie from "react-lottie-segments";
import loadAnimation from '../../utils/loadAnimation'
import { UserContext } from '../../components/BaseShot';
import { prePathUrl, initialAudio, startRepeatAudio , stopRepeatAudio} from '../../components/CommonFunctions';
import GamePanel from "./GamePanel"
import Review from "./Review"
import loadSound from "../../utils/loadSound"

var isGameStarted = false;

let animationList = []
new loadAnimation('main/Chick_1.json').then(result => {
    animationList[1] = result;
}, () => { });

new loadAnimation('main/Chicken2_1.json').then(result => {
    animationList[0] = result;
}, () => { });

new loadAnimation('main/Girl_1.json').then(result => {
    animationList[2] = result;
}, () => { });

var timerList = []

const BaseScene = React.forwardRef(({ nextFunc, _geo, _baseGeo, showMusicBtn }, ref) => {

    const audioList = useContext(UserContext)
    const [isIntroHide, setIntroHide] = useState(false)
    const [isGameFinished, setGameFinish] = useState(false)
    const [isGameRenderStart, setGameRenderStart] = useState(false)
    const [isIntroStart, setIntroStart] = useState(false)

    const [isAniStop, setAniStop] = useState(false)

    const playBtnRef = useRef();
    const gamePanelRef = useRef();

    function returnOption(index) {
        return {
            loop: index == 2 ? true : false,
            autoplay: index == 2 ? true : false,
            animationData: animationList[index],
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
    }


    useEffect(() => {

        audioList.titleAudio = new loadSound('SB_53_Audio_02');
        audioList.bodyAudio = loadSound('SB_53_Audio_03');
        audioList.subBodyAudio = loadSound('SB_53_Audio_04');

        setTimeout(() => {
            audioList.titleAudio.play();
            setAniStop(true)
        }, 1200);

        setTimeout(() => {
            playBtnRef.current.className = 'introText'
            setGameRenderStart(true)
        }, 1500);


        setTimeout(() => {
            playBtnRef.current.className = 'commonButton'
            playBtnRef.current.style.pointerEvents = ''
        }, 3000);


        playBtnRef.current.className = 'hide'

        return () => {
            audioList.titleAudio.pause();
            audioList.titleAudio.currentTime = 0;

        }
    }, [])

    function finishGame() {
        gamePanelRef.current.style.display = 'none'
        setGameFinish(true)

        setGameRenderStart(false)
    }

    function clickFunc() {

        showMusicBtn()
        audioList.titleAudio.pause();
        audioList.titleAudio.currentTime = 0;
        // audioList.titleAudio = loadSound('SB_53_Audio_10');

        if (!isGameStarted)
            new initialAudio(audioList)

        if (!isGameStarted) {
            setTimeout(() => {
                isGameStarted = true;
            }, 500);
        }

        setTimeout(() => {
            audioList.backAudio.play().catch(error => {
            });

            // setTimeout(() => {
            setIntroHide(true)
            // }, 1000);

            setIntroStart(true)

            setTimeout(() => {
                setAniStop(false)
                audioList.bodyAudio.play();

                setTimeout(() => {
                    setAniStop(true)

                    setTimeout(() => {
                        setTimeout(() => {
                            timerList[1] = setTimeout(() => {
                                audioList.subBodyAudio.play();
                                timerList[2] = setTimeout(() => {
                                    audioList.titleAudio.play();
                                }, audioList.subBodyAudio.duration * 1000 + 1000);
                            }, 1000);

                            setIntroHide(true)
                            startRepeatAudio()
                        }, 1000);

                        gamePanelRef.current.style.display = 'inline-block'
                        gamePanelRef.current.style.transition = '1s'
                        gamePanelRef.current.style.opacity = 1

                        setTimeout(() => {
                            setIntroStart(false)
                        }, 2000);
                    }, 500);
                }, audioList.bodyAudio.duration * 1000);
            }, 1000);


        }, 200);
    }

    function stopSound() {

        timerList.map(timer => {
            clearTimeout(timer)
        })

        audioList.bodyAudio.pause();
        audioList.subBodyAudio.pause();
        audioList.titleAudio.pause();
    }

    return (
        <div>
            {!isIntroHide &&
                <div >

                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.25 + "px",
                            left: _geo.width * 0.45 + _geo.left + "px"
                            , bottom: _geo.height * 0.2 + _geo.top + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game1/SB_53_Intro_game1_food_01 .svg'}
                        />
                    </div>

                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.35 + "px",
                            left: _geo.width * 0.15 + _geo.left + "px"
                            , bottom: _geo.height * 0.2 + _geo.top + "px",
                        }}>
                        <Lottie options={returnOption(0)}
                            mouseDown={false}
                            isClickToPauseDisabled={true}
                            isStopped={true}
                        />
                    </div>
                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.15 + "px",
                            left: _geo.width * 0.15 + _geo.left + "px"
                            , bottom: _geo.height * 0.2 + _geo.top + "px",
                        }}>
                        <Lottie options={returnOption(1)}
                            mouseDown={false}
                            isClickToPauseDisabled={true}
                            isStopped={true}
                        />
                    </div>

                    <div
                        style={{
                            position: "fixed", width: _geo.width * 1 + "px",
                            left: _geo.width * 0.0 + _geo.left + "px"
                            , bottom: _geo.height * 0.00 + _geo.top + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game1/SB_53_Intro_game1_stone_01 .svg'}
                        />
                    </div>

                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.15 + "px",
                            left: _geo.width * 0.78 + _geo.left + "px"
                            , bottom: _geo.height * 0.15 + _geo.top + "px",
                        }}>
                        <Lottie options={returnOption(1)}
                            mouseDown={false}
                            isClickToPauseDisabled={true}
                            isStopped={true}
                        />
                    </div>

                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.15 + "px",
                            left: _geo.width * 0.6 + _geo.left + "px"
                            , bottom: _geo.height * 0.2 + _geo.top + "px",
                        }}>
                        <Lottie options={returnOption(1)}
                            mouseDown={false}
                            isClickToPauseDisabled={true}
                            isStopped={true}

                        />
                    </div>

                    <div
                        className='introText'
                        style={{
                            position: "fixed", width: _geo.width * 0.5 + "px",
                            left: _geo.width * 0.4 + _geo.left + "px"
                            , bottom: _geo.height * 0.3 + _geo.top + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={prePathUrl() + 'images/SB_53_BG-Intro/Game1/SB_53_Intro_game1_name_01 .svg'}
                        />
                    </div>

                    <div
                        className="hide"
                        ref={playBtnRef}
                        onClick={clickFunc}
                        style={{
                            position: "fixed", width: _geo.width * 0.12 + "px",
                            left: _geo.width * 0.51 + _geo.left + "px"
                            , bottom: _geo.height * 0.2 + _geo.top + "px",
                            cursor: "pointer",
                            pointerEvents: 'none'
                        }}>
                        <img draggable={false}
                            width={"100%"}
                            src={prePathUrl() + 'images/Buttons/Play_blue.svg'}
                        />
                    </div>
                </div>
            }
            <div className={isIntroStart ? 'aniObject' : 'hideObject'}
                style={{
                    position: "fixed", width: _geo.width * 0.2 + "px",
                    left: _geo.width * 0.4 + _geo.left + "px"
                    , bottom: _geo.height * 0.15 + _geo.top + "px",
                }}>
                <Lottie autoplay loop options={returnOption(2)}
                    mouseDown={false}
                    isPaused={isAniStop}
                    isStopped={isAniStop}
                    isClickToPauseDisabled={true}
                    speed={0.9}
                />
            </div>

            {isGameRenderStart &&
                < div
                    ref={gamePanelRef}
                    style={{ display: 'none', opacity: 0 }}
                >
                    <GamePanel stopSound={stopSound} finishGame={finishGame} _baseGeo={_baseGeo} _geo={_geo} />
                </div>
            }
            {
                isGameFinished &&
                < Review nextFunc={nextFunc} _baseGeo={_baseGeo} _geo={_geo} />
            }
        </div >
    );
});

export default BaseScene;
