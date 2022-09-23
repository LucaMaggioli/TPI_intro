import { useState } from "react";
import { Search } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { Box, TextField, Typography, IconButton, Chip } from "@mui/material";

const FilterStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    gridGap:'2em',
    backgroundColor:'white',
    borderRadius:'20px',
    padding: '0px 6px 0 6px',
}
const flexRow = {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
}
const inputStyle = {
    width:'100px',
    padding:'4px',
    margin:0,
}


export default function Filter(props){
    const [filterToAdd, setFilterToAdd] = useState('')
    const [filters, setFilters] = useState([])

    function handleSearchChange(e){
        setFilterToAdd(e.target.value)
    }
    function addFilter(){
        let newFilters = [...filters, filterToAdd]
        setFilters(newFilters);
        setFilterToAdd('');
        //sending the filters back to parent with props
        props.onFiltersModified(newFilters)
    }
    function chipDelete(index){
        //Include the items from index '0' to the index of the item to delete,
        //then include the rest of array items from the index of the item to delete 
        let newFilters = [...filters.slice(0, index), ...filters.slice(index+1, filters.length)]
        setFilters(newFilters);
        props.onFiltersModified(newFilters)
    }
    function chipClick(index){
        setFilterToAdd(filters[index])
        chipDelete(index)
    }

    return (
        <Box style={FilterStyle}>
            <Box style={flexRow}>
                <TextField variant="outlined" size="small" style={inputStyle} value={filterToAdd} onChange={handleSearchChange}/>
                <IconButton size='small' sx={{color:green[500]}} onClick={addFilter}><Search/></IconButton>
            </Box>
            <Box style={{...flexRow, ...{width:'400px', overflowX:'auto'}}}>
                {filters.map((filter, index)=>(
                    <Chip label={filter} onClick={()=>chipClick(index)} onDelete={()=>chipDelete(index)} />
                ))}
            </Box>
        </Box>
    );
}