import React, {useState} from 'react';
import PokemonCard from "./components/PokemonCard";
import styled from "styled-components";
import Loader from "./components/loader/loader";
import {useLoading} from "./context/loadContext";
import "./index.css";
import {useHp} from "./context/hpContext";
import {useFinished} from "./context/finishedContext";

const AppWrapper = styled.div`
  height: 98vh;
  max-width: 80%;
  margin: 0 auto;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div`
  > div {
    transition: all 1s ease-in-out;
  }

  .one {
    transform: translateX(-12.5vw) translateY(5vh) scale(0.5) !important;
  }

  .two {
    transform: translateX(-7.5vw) scale(0.5) !important;
  }

  .three {
    transform: translateX(-2.5vw) translateY(5vh) scale(0.5) !important;
  }

  .four {
    transform: translateX(2.5vw) scale(0.5) !important;
  }

  .five {
    transform: translateX(7.5vw) translateY(5vh) scale(0.5) !important;
  }

  .six {
    transform: translateX(12.5vw) scale(0.5) !important;
  }

`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  button {
    padding: 1rem 2rem;
    border: none;
    text-transform: uppercase;
    font-family: 'Silkscreen', cursive;
    transition: all 0.3s ease-in-out;
    color: white;
    font-size: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    &:active {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.2);
    }
  }

  #attack {
    background-color: #E64556;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #EA6371;
    }

    &:active {
      background-color: #E2273B;
    }
  }

  #catch {
    background-color: #0077BC;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #008DDE;
    }

    &:active {
      background-color: #00619A;
    }
  }
`;

const Missed = styled.div`
  transition: all 0.5s ease-in-out;
  margin: 0;
  padding: 0;
  font-family: 'Silkscreen', cursive;

  > img {
    width: 20rem;
    height: 10rem;
  }

  > h3 {
    width: 17.5rem;
    height: 10rem;
    position: absolute;
    //top: 62.5%;
    //left: 42.5%;
    transform: translate(7.5%, -110%);
  }
`;

const CongratulationsWrapper = styled.div`
  transition: all 0.5s ease-in-out;
  transform: translate(0, -125%);
  max-width: 60%;
  margin: 0 auto;
  text-align: center;
  font-family: 'Silkscreen', cursive;
  color: white;
`;

const App = () => {
    const [loading, isLoading] = useLoading();
    const [hp, setHp] = useHp();
    const [finished, setFinished] = useFinished();
    const [missed, setMissed] = useState(false);
    const [catchedOne, setCatchedOne] = useState(false);
    const [catchedTwo, setCatchedTwo] = useState(false);
    const [catchedThree, setCatchedThree] = useState(false);
    const [catchedFour, setCatchedFour] = useState(false);
    const [catchedFive, setCatchedFive] = useState(false);
    const [catchedSix, setCatchedSix] = useState(false);
    const [attacking, setAttacking] = useState(false);

    function attack() {
        const chance = Math.floor(Math.random() * 5) + 1;
        if (chance === 1) {
            setHp(hp - 10);
            setAttacking(true);
        } else {
            setMissed(true);
            setTimeout(() => {
                const missed = document.getElementById('missed');
                missed.style.opacity = '0';
            }, 1500)
            setTimeout(() => {
                setMissed(false);
                setAttacking(false)
            }, 2000)
            const button = document.getElementById('attack');
            setTimeout(() => {
                button.ariaDisabled = "true";
            }, 2000);
        }
    }

    function catchPokemon() {
        const chance = Math.floor(Math.random() * hp);
        if (chance <= 200) {
            if (catchedOne === false) {
                setCatchedOne(true);
            } else if (catchedOne === true && catchedTwo === false) {
                setCatchedTwo(true);
            } else if (catchedTwo === true && catchedThree === false) {
                setCatchedThree(true);
            } else if (catchedThree === true && catchedFour === false) {
                setCatchedFour(true);
            } else if (catchedFour === true && catchedFive === false) {
                setCatchedFive(true);
            } else if (catchedFive === true && catchedSix === false) {
                setCatchedSix(true);
            }

        } else {
            setMissed(true);
            setTimeout(() => {
                const missed = document.getElementById('missed');
                missed.style.opacity = '0';
            }, 1500)
            setTimeout(() => {
                setMissed(false);
            }, 2000)
            const button = document.getElementById('catch');
            setTimeout(() => {
                button.ariaDisabled = "true";
            }, 2000);
        }
    }

    console.log(catchedThree);

    console.log(hp);

    return (
        <AppWrapper>
            {loading && (
                <Loader/>
            )}
            <CongratulationsWrapper style={catchedSix ? {opacity: "100%"} : {opacity: "0%", height: "0"}}>
                <h1>Congratulations you have caught all Pokémon</h1>
            </CongratulationsWrapper>
            <CardWrapper style={catchedSix ? {
                width: "100vw",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            } : {}}>
                <div className={catchedSix && "one"} style={catchedOne ? {
                    transform: "translateX(41vw) translateY(-35%)",
                    position: "absolute"
                } : {position: "relative"}}>
                    <PokemonCard/>
                </div>
                {catchedOne && (
                    <div
                        className={catchedSix && "two"}
                        style={catchedTwo ? {
                            transform: "translateX(41vw) translateY(-10%)",
                            position: "absolute"
                        } : {position: "relative"}}>
                        <PokemonCard/>
                    </div>
                )}
                {catchedTwo && (
                    <div
                        className={catchedSix && "three"}
                        style={catchedThree ? {
                            transform: "translateX(41vw) translateY(20%)",
                            position: "absolute"
                        } : {position: "relative"}}>
                        <PokemonCard/>
                    </div>
                )}
                {catchedThree && (
                    <div
                        className={catchedSix && "four"}
                        style={catchedFour ? {
                            transform: "translateX(41vw) translateY(50%)",
                            position: "absolute"
                        } : {position: "relative"}}>
                        <PokemonCard/>
                    </div>
                )}
                {catchedFour && (
                    <div
                        className={catchedSix && "five"}
                        style={catchedFive ? {
                            transform: "translateX(41vw) translateY(80%)",
                            position: "absolute"
                        } : {position: "relative"}}>
                        <PokemonCard/>
                    </div>
                )}
                {catchedFive && (
                    <div
                        className={catchedSix && "six"}
                        style={catchedSix ? {
                            transform: "translateX(41vw) translateY(90%)",
                            position: "absolute"
                        } : {position: "relative"}}>
                        <PokemonCard/>
                    </div>
                )}
            </CardWrapper>
            {/*style={missed ? {height: "10rem"} : {opacity: "0", height: "0"}}*/}
            <Missed id="missed" style={missed ? {opacity: 1, height: "10rem"} : {opacity: "0", height: "0"}}>
                <img
                    src="https://www.nicepng.com/png/full/240-2406318_pokemon-text-box-pokmon.png"
                    alt="pokemon border"/>
                <h3>
                    {attacking ? (
                        <p>I'm sorry, your attempt to
                            attack {finished.toString().length >= 10 ? finished.toString().substring(0, 10) + "..." : finished} did
                            not work </p>) : (
                        <p>I'm sorry, your attempt to
                            catch {finished.toString().length >= 10 ? finished.toString().substring(0, 10) + "..." : finished} did
                            not work</p>)}
                </h3>
            </Missed>
            {!catchedSix && (
                <ButtonWrapper style={loading ? {opacity: "0", scale: "0%", transition: "all 1s ease-in-out"} : {
                    opacity: "1",
                    scale: "100%",
                    transition: "all 1s ease-in-out"
                }}>
                    <button onClick={attack} id="attack" disabled={missed}>Attack</button>
                    <button onClick={catchPokemon} id="catch" disabled={missed}>Catch</button>
                </ButtonWrapper>
            )}
        </AppWrapper>
    );
};

export default App;
