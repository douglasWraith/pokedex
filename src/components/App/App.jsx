import React, { useState } from "react";
import { PokemonsList } from "../PokemonsList/PokemonsList";
import { Search } from "../SearchSection/Search";
import { Modal } from "../../ui-kit/Modal/Modal";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import './App.scss';

export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [fromIndex, setFromIndex] = useState(1);
  const [toIndex, setToIndex] = useState(10);
  const [notFound] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalActive, setModalActive] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const getPokemons = async () => {
    const container = [];
    for (let i = fromIndex; i <= toIndex; i++) {
      const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      container.push(data.data);
    }
    setPokemons((prev) => [...prev, ...container]);
    setIsFetchingData(false);
  };

  const onLoadMoreClick = () => {
    setIsFetchingData(true);
    setFromIndex(fromIndex + 10);
    setToIndex(toIndex + 10);
  };

  return (
    <>
      <div className="container">
        {
          isModalActive && <Modal pokemon = {selectedPokemon} setModalActive={setModalActive} />
        }
        <div className="title">Pocedex</div>
        {!notFound ? (
          <PokemonsList
            fromIndex={fromIndex}
            toIndex={toIndex}
            getPokemons={getPokemons}
            pokemons={pokemons}
            onLoadMoreClick={onLoadMoreClick}
            setSelectedPokemon={setSelectedPokemon}
            setModalActive={setModalActive}
            isFetchingData={isFetchingData}
          />
        ) : <TailSpin
              height="45"
              width="45"
              color="#61C3FF"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />}
      </div>
    </>
  );
};
