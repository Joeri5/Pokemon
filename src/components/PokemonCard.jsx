import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import Vibrant from "node-vibrant/lib/bundle";
import {icons} from "../data/icons";
import {useLoading} from "../context/loadContext";
import {useHp} from "../context/hpContext";
import {useFinished} from "../context/finishedContext";

const Card = styled.div`
  border: 10px solid #F8D74B;
  width: 17.5rem;
  height: 25rem;
  border-radius: 1rem;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  transition: scale ease-in-out 0.5s;

  :hover {
    cursor: pointer;
    scale: 1.2;
  }
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1px;
  max-width: 80%;
  margin: 0 auto;
  padding: 0.5rem 0 0 0;
  justify-content: space-between;
  align-items: center;

`;

const TopInfoLeft = styled.div`
  > h3 {
    font-size: 0.5rem;
    padding: 0;
    margin: 0;
  }

  > h1 {
    font-size: 1.25rem;
    padding: 0;
    margin: 0;
    text-transform: capitalize;
  }
`;

const TopInfoRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > h3 {
    font-size: 1rem;
    padding: 0.5rem 0;
    margin: 0;
  }
`;

const TypeImage = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const ImageWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  border: 5px solid #CDC275;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 125px;
    height: 125px;
  }
`;

const InfoWrapper = styled.div`
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  background: #A89A45;

  > ul {
    list-style: none;
    display: flex;
    gap: 0.5rem;
    margin: 0;
    padding: 0.125rem 0;
    justify-content: center;
    font-style: italic;

    > li {
      font-size: 0.5rem;
      padding: 0;
      margin: 0;
    }
  }
`;

const AttackWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  max-width: 80%;
  padding: 0.5rem 0;
  margin: 0 auto;

  > div > img {
    width: 1rem;
    height: 1rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;

    > h2 {
      font-size: 1rem;
      padding: 0;
      margin: 0;
    }

    > p {
      font-size: 0.5rem;
      padding: 0;
      margin: 0;
    }
  }
`;

const LowerInfo = styled.div`
  display: flex;
  max-width: 80%;
  margin: 0.5rem auto;
  justify-content: space-between;
  gap: 1rem;
`;

const WeaknessWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  > h3 {
    font-size: 0.5rem;
    margin: 0 0 0.25rem 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > img {
    width: 0.9rem;
    height: 0.9rem;
  }
`;

const ResistanceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > h3 {
    font-size: 0.5rem;
    margin: 0 0 0.25rem 0;
  }
`;

const RetreatWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  > h3 {
    font-size: 0.5rem;
    margin: 0 0 0.25rem 0;
  }
`;

const FlavorText = styled.div`
  display: flex;
  max-width: 80%;
  margin: 0.75rem auto;
  border: 2px solid #A69B52;

  > p {
    font-size: 0.10rem;
    padding: 0.10rem;
    margin: 0;
  }
`;

const LowerInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;

  > p {
    font-size: 6px;
    padding: 0;
    margin: 0;
  }
`;

const PokemonCard = () => {
    const [data, setData] = useState([]);
    const [link, setLink] = useState("");
    const [attackDataOne, setAttackDataOne] = useState([]);
    const [attackDataTwo, setAttackDataTwo] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [color, setColor] = useState("");
    const [lightColor, setLightColor] = useState("");
    const [image, setImage] = useState("");
    const [hpColor, setHpColor] = useState("");
    const [attackIconOne, setAttackIconOne] = useState("");
    const [attackIconTwo, setAttackIconTwo] = useState("");
    const [retreatCost, setRetreatCost] = useState(0);
    const [loading, isLoading] = useLoading();
    const [hp, setHp] = useHp();
    const [finished, setFinished] = useFinished();

    const offset = Math.floor(Math.random() * 898);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${offset}`).then(res => {
            return res.json();
        }).then(data => {
            fetch(data.results[0].url).then((response) => {
                return response.json();

            }).then(async (data) => {
                    data.matchingColor = await Vibrant.from(data.sprites.front_default).getPalette(function (err, palette) {
                    }).then(r => {
                        setColor(r.DarkVibrant.hex)
                        setHpColor(r.Vibrant.hex)
                    });

                    setData(data);
                    setHp(data.stats[0].base_stat);
                    setFinished(data.name);

                    switch (data.types[0].type.name) {
                        case "bug":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/240px-Pokémon_Bug_Type_Icon.svg.png");
                            break;

                        case "dark":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pokémon_Dark_Type_Icon.svg/240px-Pokémon_Dark_Type_Icon.svg.png");
                            break;

                        case "dragon":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pokémon_Dragon_Type_Icon.svg/240px-Pokémon_Dragon_Type_Icon.svg.png");
                            break;

                        case "electric":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pokémon_Electric_Type_Icon.svg/240px-Pokémon_Electric_Type_Icon.svg.png");
                            break;

                        case "fairy":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pokémon_Fairy_Type_Icon.svg/240px-Pokémon_Fairy_Type_Icon.svg.png");
                            break;

                        case "fighting":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pokémon_Fighting_Type_Icon.svg/240px-Pokémon_Fighting_Type_Icon.svg.png");
                            break;

                        case "fire":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pokémon_Fire_Type_Icon.svg/240px-Pokémon_Fire_Type_Icon.svg.png");
                            break;

                        case "flying":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pokémon_Flying_Type_Icon.svg/240px-Pokémon_Flying_Type_Icon.svg.png");
                            break;

                        case "ghost":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pokémon_Ghost_Type_Icon.svg/240px-Pokémon_Ghost_Type_Icon.svg.png");
                            break;

                        case "grass":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pokémon_Grass_Type_Icon.svg/240px-Pokémon_Grass_Type_Icon.svg.png");
                            break;

                        case "ground":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pokémon_Ground_Type_Icon.svg/240px-Pokémon_Ground_Type_Icon.svg.png");
                            break;

                        case "ice":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pokémon_Ice_Type_Icon.svg/240px-Pokémon_Ice_Type_Icon.svg.png");
                            break;

                        case "normal":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pokémon_Normal_Type_Icon.svg/240px-Pokémon_Normal_Type_Icon.svg.png");
                            break;

                        case "poison":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pokémon_Poison_Type_Icon.svg/240px-Pokémon_Poison_Type_Icon.svg.png");
                            break;

                        case "psychic":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pokémon_Psychic_Type_Icon.svg/240px-Pokémon_Psychic_Type_Icon.svg.png");
                            break;

                        case "rock":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pokémon_Rock_Type_Icon.svg/240px-Pokémon_Rock_Type_Icon.svg.png");
                            break;

                        case "steel":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pokémon_Steel_Type_Icon.svg/240px-Pokémon_Steel_Type_Icon.svg.png");
                            break;

                        case "water":
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pokémon_Water_Type_Icon.svg/240px-Pokémon_Water_Type_Icon.svg.png");
                            break;

                        default:
                            setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/240px-Pokémon_Bug_Type_Icon.svg.png");
                            break;
                    }

                    fetch(data.moves[0].move.url).then((response) => {
                        return response.json();
                    }).then((attackDataOne) => {
                            setAttackDataOne(attackDataOne);

                            switch (attackDataOne.type.name) {
                                case "bug":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/240px-Pokémon_Bug_Type_Icon.svg.png");
                                    break;

                                case "dark":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pokémon_Dark_Type_Icon.svg/240px-Pokémon_Dark_Type_Icon.svg.png");
                                    break;

                                case "dragon":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pokémon_Dragon_Type_Icon.svg/240px-Pokémon_Dragon_Type_Icon.svg.png");
                                    break;

                                case "electric":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pokémon_Electric_Type_Icon.svg/240px-Pokémon_Electric_Type_Icon.svg.png");
                                    break;

                                case "fairy":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pokémon_Fairy_Type_Icon.svg/240px-Pokémon_Fairy_Type_Icon.svg.png");
                                    break;

                                case "fighting":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pokémon_Fighting_Type_Icon.svg/240px-Pokémon_Fighting_Type_Icon.svg.png");
                                    break;

                                case "fire":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pokémon_Fire_Type_Icon.svg/240px-Pokémon_Fire_Type_Icon.svg.png");
                                    break;

                                case "flying":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pokémon_Flying_Type_Icon.svg/240px-Pokémon_Flying_Type_Icon.svg.png");
                                    break;

                                case "ghost":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pokémon_Ghost_Type_Icon.svg/240px-Pokémon_Ghost_Type_Icon.svg.png");
                                    break;

                                case "grass":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pokémon_Grass_Type_Icon.svg/240px-Pokémon_Grass_Type_Icon.svg.png");
                                    break;

                                case "ground":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pokémon_Ground_Type_Icon.svg/240px-Pokémon_Ground_Type_Icon.svg.png");
                                    break;

                                case "ice":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pokémon_Ice_Type_Icon.svg/240px-Pokémon_Ice_Type_Icon.svg.png");
                                    break;

                                case "normal":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pokémon_Normal_Type_Icon.svg/240px-Pokémon_Normal_Type_Icon.svg.png");
                                    break;

                                case "poison":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pokémon_Poison_Type_Icon.svg/240px-Pokémon_Poison_Type_Icon.svg.png");
                                    break;

                                case "psychic":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pokémon_Psychic_Type_Icon.svg/240px-Pokémon_Psychic_Type_Icon.svg.png");
                                    break;

                                case "rock":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pokémon_Rock_Type_Icon.svg/240px-Pokémon_Rock_Type_Icon.svg.png");
                                    break;

                                case "steel":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pokémon_Steel_Type_Icon.svg/240px-Pokémon_Steel_Type_Icon.svg.png");
                                    break;

                                case "water":
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pokémon_Water_Type_Icon.svg/240px-Pokémon_Water_Type_Icon.svg.png");
                                    break;

                                default:
                                    setAttackIconOne("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/240px-Pokémon_Bug_Type_Icon.svg.png");
                                    break;
                            }
                        }
                    ).catch((error) => {
                        console.log(error);
                    });

                    fetch(data.types[0].type.url).then((response) => {
                        return response.json();

                    }).then((typeData) => {
                        setTypeData(typeData);

                    }).catch((err) => {
                        console.log(err);
                    });

                    fetch(` https://pokeapi.co/api/v2/pokemon-species/${data.name}/`).then((response) => {
                        return response.json();
                    }).then((speciesData) => {
                        setSpeciesData(speciesData);

                    }).catch((err) => {
                        console.log(err);
                    });

                    fetch(data.moves[1].move.url).then((response) => {
                        return response.json();
                    }).then((attackDataTwo) => {
                            setAttackDataTwo(attackDataTwo);

                            switch (attackDataTwo.type.name) {
                                case "bug":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/240px-Pokémon_Bug_Type_Icon.svg.png");
                                    break;

                                case "dark":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pokémon_Dark_Type_Icon.svg/240px-Pokémon_Dark_Type_Icon.svg.png");
                                    break;

                                case "dragon":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pokémon_Dragon_Type_Icon.svg/240px-Pokémon_Dragon_Type_Icon.svg.png");
                                    break;

                                case "electric":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pokémon_Electric_Type_Icon.svg/240px-Pokémon_Electric_Type_Icon.svg.png");
                                    break;

                                case "fairy":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pokémon_Fairy_Type_Icon.svg/240px-Pokémon_Fairy_Type_Icon.svg.png");
                                    break;

                                case "fighting":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pokémon_Fighting_Type_Icon.svg/240px-Pokémon_Fighting_Type_Icon.svg.png");
                                    break;

                                case "fire":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pokémon_Fire_Type_Icon.svg/240px-Pokémon_Fire_Type_Icon.svg.png");
                                    break;

                                case "flying":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pokémon_Flying_Type_Icon.svg/240px-Pokémon_Flying_Type_Icon.svg.png");
                                    break;

                                case "ghost":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pokémon_Ghost_Type_Icon.svg/240px-Pokémon_Ghost_Type_Icon.svg.png");
                                    break;

                                case "grass":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pokémon_Grass_Type_Icon.svg/240px-Pokémon_Grass_Type_Icon.svg.png");
                                    break;

                                case "ground":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pokémon_Ground_Type_Icon.svg/240px-Pokémon_Ground_Type_Icon.svg.png");
                                    break;

                                case "ice":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pokémon_Ice_Type_Icon.svg/240px-Pokémon_Ice_Type_Icon.svg.png");
                                    break;

                                case "normal":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pokémon_Normal_Type_Icon.svg/240px-Pokémon_Normal_Type_Icon.svg.png");
                                    break;

                                case "poison":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pokémon_Poison_Type_Icon.svg/240px-Pokémon_Poison_Type_Icon.svg.png");
                                    break;

                                case "psychic":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pokémon_Psychic_Type_Icon.svg/240px-Pokémon_Psychic_Type_Icon.svg.png");
                                    break;

                                case "rock":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pokémon_Rock_Type_Icon.svg/240px-Pokémon_Rock_Type_Icon.svg.png");
                                    break;

                                case "steel":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pokémon_Steel_Type_Icon.svg/240px-Pokémon_Steel_Type_Icon.svg.png");
                                    break;

                                case "water":
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pokémon_Water_Type_Icon.svg/240px-Pokémon_Water_Type_Icon.svg.png");
                                    break;

                                default:
                                    setAttackIconTwo("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/240px-Pokémon_Bug_Type_Icon.svg.png");
                                    break;
                            }
                            setTimeout(() => {
                                isLoading(false);
                            }, 1000);
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
                }
            ).catch((error) => {
                console.log(error);
            });
        }).catch((err) => {
            console.log(err);
        });

    }, []);

    useEffect(() => {
        if (image != null) {
            Vibrant.from(image).getPalette(function (err, palette) {
            }).then(r => {
                setLightColor(r.LightVibrant.hex)
            });
        } else {
            return "white";
        }
    });

    useEffect(() => {
        setRetreatCost(Math.floor(Math.random() * 3) + 1);
    }, []);

    useEffect(() => {
        if (hp <= 0) {
            setHp(0);
        }
    }, [hp, setHp]);

    return (
        <div>
            <Card id={data?.name}
                  style={loading ? {
                      opacity: 0,
                      background: lightColor,
                      scale: "0%",
                      transition: "all 1s ease-in-out"
                  } : {
                      opacity: 1,
                      background: lightColor,
                      scale: "100%",
                      transition: "all 1s ease-in-out"
                  }}>
                <TopInfo>
                    <TopInfoLeft>
                        <h3>
                            Basic Pokémon
                        </h3>
                        <h1>
                            {data?.name?.toString()?.length > 10 ? data?.name?.toString().substring(0, 10) + "..." : data.name}
                        </h1>
                    </TopInfoLeft>
                    <TopInfoRight>
                        <h3 style={{color: hpColor}}>
                            {hp} HP
                        </h3>
                        <TypeImage src={image} alt=""/>
                    </TopInfoRight>
                </TopInfo>
                <ImageWrapper style={{background: `${color}`}}>
                    <img id="image" src={data?.sprites?.front_default} alt=""/>
                </ImageWrapper>
                <InfoWrapper>
                    <ul>
                        <li>Genetic Pokémon.</li>
                        <li>Height: {data.height}"</li>
                        <li>Weight: {data.weight} lbs.</li>
                    </ul>
                </InfoWrapper>
                <AttackWrapper>
                    <div>
                        <img src={attackIconOne} alt=""/>
                    </div>
                    <div>
                        <h2>{data.moves && data.moves[0].move.name}</h2>
                        <p>{attackDataOne.effect_entries && attackDataOne?.effect_entries[0]?.effect.toString().length > 75 ? attackDataOne.effect_entries && attackDataOne?.effect_entries[0]?.effect.toString().substring(0, 75) + "..." : attackDataOne.effect_entries && attackDataOne?.effect_entries[0]?.effect}</p>
                    </div>
                </AttackWrapper>
                <hr style={{
                    maxWidth: "80%",
                    border: "none",
                    height: "0.1rem",
                    background: "black",
                    padding: "0",
                    margin: "0 auto"
                }}/>
                {data.moves && data.moves[2].move.name !== null && (
                    <AttackWrapper>
                        <div>
                            <img src={attackIconTwo} alt=""/>
                        </div>
                        <div>
                            <h2>{data.moves && data.moves[1].move.name}</h2>
                            <p>{attackDataTwo.effect_entries && attackDataTwo?.effect_entries[0]?.effect.toString().length > 75 ? attackDataTwo.effect_entries && attackDataTwo?.effect_entries[0]?.effect.toString().substring(0, 75) + "..." : attackDataTwo.effect_entries && attackDataTwo?.effect_entries[0]?.effect}</p>
                        </div>
                    </AttackWrapper>
                )}
                <hr style={{
                    maxWidth: "80%",
                    border: "none",
                    height: "0.1rem",
                    background: "black",
                    padding: "0",
                    margin: "0 auto"
                }}/>
                <LowerInfo>
                    <WeaknessWrapper>
                        <IconWrapper>
                            {typeData.damage_relations?.double_damage_from?.slice(0, 3).map((item) => (
                                <>
                                    {item.name === "fire" && (
                                        <img src={icons.fire.url} alt="fire"/>
                                    )}
                                    {item.name === "grass" && (
                                        <img src={icons.grass.url} alt="grass"/>
                                    )}
                                    {item.name === "water" && (
                                        <img src={icons.water.url} alt="water"/>
                                    )}
                                    {item.name === "electric" && (
                                        <img src={icons.electric.url} alt="electric"/>
                                    )}
                                    {item.name === "ice" && (
                                        <img src={icons.ice.url} alt="ice"/>
                                    )}
                                    {item.name === "fighting" && (
                                        <img src={icons.fighting.url} alt="fighting"/>
                                    )}
                                    {item.name === "poison" && (
                                        <img src={icons.poison.url} alt="poison"/>
                                    )}
                                    {item.name === "ground" && (
                                        <img src={icons.ground.url} alt="ground"/>
                                    )}
                                    {item.name === "flying" && (
                                        <img src={icons.flying.url} alt="flying"/>
                                    )}
                                    {item.name === "psychic" && (
                                        <img src={icons.psychic.url} alt="psychic"/>
                                    )}
                                    {item.name === "bug" && (
                                        <img src={icons.bug.url} alt="bug"/>
                                    )}
                                    {item.name === "rock" && (
                                        <img src={icons.rock.url} alt="rock"/>
                                    )}
                                    {item.name === "ghost" && (
                                        <img src={icons.ghost.url} alt="ghost"/>
                                    )}
                                    {item.name === "dragon" && (
                                        <img src={icons.dragon.url} alt="dragon"/>
                                    )}
                                    {item.name === "dark" && (
                                        <img src={icons.dark.url} alt="dark"/>
                                    )}
                                    {item.name === "steel" && (
                                        <img src={icons.steel.url} alt="steel"/>
                                    )}
                                    {item.name === "fairy" && (
                                        <img src={icons.fairy.url} alt="fairy"/>
                                    )}
                                </>
                            ))}
                        </IconWrapper>
                        <h3>weakness</h3>
                    </WeaknessWrapper>
                    <ResistanceWrapper>
                        <h3>Resistance</h3>
                        <IconWrapper>
                            {typeData.damage_relations?.no_damage_from?.slice(0, 3).map((item) => (
                                <>
                                    {item.name === "fire" && (
                                        <img src={icons.fire.url} alt="fire"/>
                                    )}
                                    {item.name === "grass" && (
                                        <img src={icons.grass.url} alt="grass"/>
                                    )}
                                    {item.name === "water" && (
                                        <img src={icons.water.url} alt="water"/>
                                    )}
                                    {item.name === "electric" && (
                                        <img src={icons.electric.url} alt="electric"/>
                                    )}
                                    {item.name === "ice" && (
                                        <img src={icons.ice.url} alt="ice"/>
                                    )}
                                    {item.name === "fighting" && (
                                        <img src={icons.fighting.url} alt="fighting"/>
                                    )}
                                    {item.name === "poison" && (
                                        <img src={icons.poison.url} alt="poison"/>
                                    )}
                                    {item.name === "ground" && (
                                        <img src={icons.ground.url} alt="ground"/>
                                    )}
                                    {item.name === "flying" && (
                                        <img src={icons.flying.url} alt="flying"/>
                                    )}
                                    {item.name === "psychic" && (
                                        <img src={icons.psychic.url} alt="psychic"/>
                                    )}
                                    {item.name === "bug" && (
                                        <img src={icons.bug.url} alt="bug"/>
                                    )}
                                    {item.name === "rock" && (
                                        <img src={icons.rock.url} alt="rock"/>
                                    )}
                                    {item.name === "ghost" && (
                                        <img src={icons.ghost.url} alt="ghost"/>
                                    )}
                                    {item.name === "dragon" && (
                                        <img src={icons.dragon.url} alt="dragon"/>
                                    )}
                                    {item.name === "dark" && (
                                        <img src={icons.dark.url} alt="dark"/>
                                    )}
                                    {item.name === "steel" && (
                                        <img src={icons.steel.url} alt="steel"/>
                                    )}
                                    {item.name === "fairy" && (
                                        <img src={icons.fairy.url} alt="fairy"/>
                                    )}
                                </>
                            ))}
                        </IconWrapper>
                    </ResistanceWrapper>
                    <RetreatWrapper>
                        <IconWrapper>
                            {retreatCost === 1 && (
                                <>
                                    <img src={icons.normal.url} alt=""/>
                                </>
                            )}
                            {retreatCost === 2 && (
                                <>
                                    <img src={icons.normal.url} alt=""/>
                                    <img src={icons.normal.url} alt=""/>
                                </>
                            )}
                            {retreatCost === 3 && (
                                <>
                                    <img src={icons.normal.url} alt=""/>
                                    <img src={icons.normal.url} alt=""/>
                                    <img src={icons.normal.url} alt=""/>
                                </>
                            )}
                        </IconWrapper>
                        <h3>retreat cost</h3>
                    </RetreatWrapper>
                </LowerInfo>
                <FlavorText>
                    {speciesData.flavor_text_entries && speciesData?.flavor_text_entries?.filter((item) => item.language.name === "en")[0]?.flavor_text.toString().length > 75 ? (
                        <p>
                            {speciesData?.flavor_text_entries?.filter((item) => item.language.name === "en")[0]?.flavor_text.toString().slice(0, 75).replace(/(\r\n|\n|\r|↵)/gm, " ")}...&nbsp;&nbsp;
                            LV.{Math.floor(data.base_experience / 3)}&nbsp;&nbsp;#{speciesData?.pokedex_numbers?.filter((item) => item.pokedex.name === "national")[0]?.entry_number}
                        </p>
                    ) : (
                        <p>
                            {speciesData?.flavor_text_entries?.filter((item) => item.language.name === "en")[0]?.flavor_text.toString().replace(/(\r\n|\n|\r|↵)/gm, " ")}&nbsp;&nbsp;LV.{Math.floor(data.base_experience / 3)}&nbsp;&nbsp;#{speciesData?.pokedex_numbers?.filter((item) => item.pokedex.name === "national")[0]?.entry_number}
                        </p>
                    )}
                </FlavorText>
                <LowerInfoWrapper>
                    <p>Mkr. Joeri Schenk</p>
                    <p>&copy;1995.96, 98, 99 Nintendo, Creatures, GAMEFREAK.&copy; 1999Wizards.</p>
                    <p>{speciesData?.pokedex_numbers?.filter((item) => item.pokedex.name === "hoenn")[0]?.entry_number}/{speciesData.order}&nbsp;&#9055;</p>
                </LowerInfoWrapper>
            </Card>
        </div>
    );
}

export default PokemonCard;
