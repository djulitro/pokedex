import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

DetailPokemon.propTypes = {
    pokemonSelected: PropTypes.object.isRequired,
};

export default function DetailPokemon({pokemonSelected}) {
    const theme = useTheme();

    console.log(pokemonSelected);
    return (
        <Card sx={{ display: 'flex', maxHeight: '800px' }}>
            <CardMedia
                component="img"
                sx={{ height: '100%', width: '50%', display:'flex', alignItems:'center', justifyContent:'center' }}
                image={pokemonSelected.sprites.other.home.front_default}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {pokemonSelected.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Experiencia base {pokemonSelected.base_experience}
                    </Typography>
                    <table>
                        <tbody>
                            <tr>
                                <td>Altura</td>
                                <td>{pokemonSelected.height}</td>
                            </tr>
                            <tr>
                                <td>Peso</td>
                                <td>{pokemonSelected.weight}</td>
                            </tr>
                            <tr>
                                <td>Habilidades</td>
                                <td>
                                    <ul>
                                        {
                                            pokemonSelected.abilities.map((el) => (
                                                <li key={el.ability.name}>{el.ability.name}</li>
                                            ))
                                        }
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Box>

        </Card>
    );
}