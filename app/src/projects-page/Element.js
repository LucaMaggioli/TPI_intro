import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

export default function Element(props){
    const [fields, setFields] = useState(props.fields)
    const [ignoreFields, setIgnoreFields] = useState(!props.ignoreFields? [] : props.ignoreFields)
    const [element, setElement] = useState(props.element)

    return (
    <Box >
        <Card>
            <CardContent style={{display:'flex', flexDirection:'column'}}>
                {fields.map((field)=>{
                    if (!ignoreFields.includes(field)){
                        return(<Typography key={field} variant="p" style={{margin:4}}>{element[field]}</Typography>)
                    }
                })}
            </CardContent>
        </Card>
    </Box>)
}