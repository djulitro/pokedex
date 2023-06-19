import { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import DataTable from './components/DataGrid';
import './App.css';
import axios from 'axios';
import DetailPokemon from './components/DetailPokemon';
import { API_LARAVEL } from './config/config';

function App() {
  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    requestGetPokemons();
    // eslint-disable-next-line
  }, []);

  const requestGetPokemons = async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon';
      const response = await axios.get(url);

      if(response.status === 200) {
        const pokemonPromises = response.data.results.map((el) =>
          requestGetPokemon(el.url)
        );

        const pokemonResponses = await Promise.all(pokemonPromises);
        const data = pokemonResponses.map((response) => response.data);

        setData(data);
      } else {
        const response = await axios.get(`${API_LARAVEL}/pokemons`);

        if(response.status === 200) {
          setData(response.data.map((el) => {
            return {
              id: el.id,
              name: el.name,
              base_experience: el.base_experience,
              sprites: {
                front_default: el.icon,
                other: {
                  home: {
                    front_default: el.img
                  }
                }
              },
              weight: el.weight,
              height: el.height,
              abilities: el.abilities
            }
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestGetPokemon = async (url) => {
    try {
      const response = await axios.get(url);
      if(response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDetailPokemon = (id) => {
    const pokemonSelected = data.find((el) => el.id === id);
    setPokemon(pokemonSelected);
  }

  console.log(API_LARAVEL);
  
  return (
    <Grid container p={2} spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Filtrar"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DataTable data={data} detailPokemon={handleDetailPokemon} filterValue={filterValue}/>
      </Grid>
      <Grid item xs={12} md={6}>
        {
          Object.keys(pokemon).length > 0 &&
          <DetailPokemon pokemonSelected={pokemon}/>
        }
      </Grid>
    </Grid>
  );
}

export default App;
