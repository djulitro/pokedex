import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'sprites',
        headerName: 'Icono',
        width: 130,
        renderCell: (params) => {
            return (
                <img
                    src={params.value.front_default}
                    alt="Icono"
                    style={{ width: '50px', height: '50px' }}
                />
            )
        },
    },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'base_experience', headerName: 'Experiencia Base', width: 130 },
];

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    detailPokemon: PropTypes.func.isRequired,
    filterValue: PropTypes.string,
};

export default function DataTable({ data, detailPokemon, filterValue }) {
    const [dataInitial, setDataInitial] = useState(data);

    useEffect(() => {
        if (filterValue !== '') {
            const dataFiltered = data.filter((item) =>
                item.id.toString().toLowerCase().includes(filterValue.toLowerCase()) ||
                item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                item.base_experience.toString().toLowerCase().includes(filterValue.toLowerCase())
            );

            console.log(dataFiltered);
            setDataInitial(dataFiltered);
        } else {
            setDataInitial(data);
        }
    }, [filterValue, data]);

    return (
        <DataGrid
            rows={dataInitial}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            onRowClick={(event) => {
                detailPokemon(event.id);
            }}
            sx={{ maxHeight: { xs: '400px', md: '800px' } }}
        />
    );
}