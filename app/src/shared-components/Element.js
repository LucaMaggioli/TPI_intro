import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Element(props){
    const [fields] = useState(props.fields)
    const [isSubElement] = useState(props.isSubElement)
    const [ignoreFields] = useState(!props.ignoreFields? [] : props.ignoreFields)
    const [createMode] = useState(props.createMode===null ? false : props.createMode)

    const [element, setElement] = useState(props.element)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(()=>{
    }, [])

    function handleSave(){
        setIsEditing(false);
        props.onEditElement(element)
    }
    function handleDiscard(){
        setIsEditing(false);
    }
    function handleEdit(){
        setIsEditing(true);
    }
    function handleCreate(){
        props.onCreate(element)
    }
    function handleFieldChange(newValue, field){
        console.log(newValue, field)
        
        let newElement = {...element}
        newElement[field] = newValue;
        setElement(newElement);
        
        console.log(newElement)
    }
    function handleDeleteElement(){
        props.onDeleteElement(element)
    }

    return (
    <Box >
        <Card>
            <CardContent style={{display:'flex', flexDirection:'column'}}>
                {(!createMode && !isEditing) && fields.map((field)=>{
                    if (!ignoreFields.includes(field)){
                        return(<Typography key={field} variant="p" style={{margin:4}}>{element[field]}</Typography>)
                    }
                })}
                {(createMode || isEditing) && fields.map((field)=>{
                    if (!ignoreFields.includes(field)){
                        return(<TextField key={field}
                            variant="filled"
                            label={field}
                            style={{margin:4}}
                            value = {element[field]}
                            onChange={(e)=>{handleFieldChange(e.target.value, field)}}>
                            </TextField>)
                    }
                })}
                {props.subElement!==null?props.subElement:''}
            </CardContent>
            {!isSubElement && <CardActions>
                {isEditing && <Box sx={{display:'flex', flexDirection:'row', gridGap:'8px'}}>
                    <Button onClick={handleSave} size="small" variant='contained' color="success">Save</Button>
                    <Button onClick={handleDiscard} size="small" variant='contained' color="error">Discard</Button>
                </Box>}
                {!isEditing && !createMode && <Button onClick={handleEdit} size="small">Edit</Button>}
                {!isEditing && !createMode && <Button onClick={handleDeleteElement} size="small" style={{color:'red'}}>Delete</Button>}
                {createMode && <Button onClick={handleCreate} size="small">Create</Button>}
            </CardActions>}
        </Card>
    </Box>)
}