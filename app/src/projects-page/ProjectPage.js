import { Box } from "@mui/system";
import Footer from "../shared-components/Footer";
import Header from "../shared-components/Header";
import { Event, SettingsSuggest } from '@mui/icons-material';
import { useEffect, useState } from "react";
import Element from "../shared-components/Element";
import { getProjects, createProject, editProject, deleteProjectById, getClientById } from "../Services/projectDataService";
import { useNavigate } from "react-router-dom";

const listStyle = {display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gridGap:6, overflow:'auto', height:'70vh', margin:6}
const projectFields = ['id', 'name', 'description', 'startdate', 'client_id']

export default function ProjectPage(){
    const [dataLoaded, setDataLoaded] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [projects, setProjects] = useState();
    const [projectsLoaded, setProjectsLoaded] = useState(0);
    
    let navigate = useNavigate();

    useEffect(()=>{
        getProjects().then(data=>{
            setProjectWithClientElement(data).then((projects)=>{
                setProjects(projects)
                setDataLoaded(true)
            });
        })
    }, [])

    function handleBackEvent(){
        addMode ? setAddMode(false) : navigate('/calendar')
    }

    function handleCreateProject(project){
        console.log("project to be created")
        console.log(project)
        createProject(project).then(result=>{
            if (result){
                setProjects([...projects, project])
                setAddMode(false)
            }
        });
    }
    function handleEditProject(project){
        editProject(project).then(result=>{
            if(result){
                console.log("project to be edited")
                console.log(project)
                let index = projects.indexOf(project)
                let newProjects = [...projects]
                //replacing the old client with the new client that we edited
                newProjects.splice(index, 1, project)
                setProjects(newProjects);
            }
        })
    }
    function handleDeleteProject(project){
        let confirmed = window.confirm(`Are you sure you want to delete '${project['name']}' ?`)
        if(confirmed){
            confirmed = window.confirm(`this operation is unrepairable, click OK to confirm`)
        }
        if(confirmed){
            deleteProjectById(project.id).then(result=>{
                if(result){
                    let index = projects.indexOf(project)
                    let newProjects = [...projects]
                    //replacing the old client with the new client that we edited
                    newProjects.splice(index, 1)
                    setProjects(newProjects)
                }
            })
        }
    }

    function setProjectWithClientElement(data){
        return new Promise((resolve)=>{
            let projects = []
            data.map(project=>{
                if (project.client_id !== null){
                    getClientById(project.client_id)
                        .then(client=>{
                            project.client = client
                            setProjectsLoaded(projectsLoaded + 1)
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                }
                projects.push(project)
            })
            resolve(projects)
        })
    }

    return (<Box>
        <Header icon={addMode?<SettingsSuggest/>:<Event/>} backEvent={handleBackEvent}/>
        <Box style={listStyle}>
            {dataLoaded && !addMode && projects.map(project=>{
                return(<Element key={project.id}
                    ignoreFields={['id','client_id']}
                    fields={projectFields}
                    element={project}
                    onEditElement={handleEditProject}
                    onDeleteElement={handleDeleteProject}
                    subElement={project['client'] !== undefined?(<Element isSubElement={true} fields={['name','email']} element={project['client']}/>):null}
                    />)}
                    )}
            {dataLoaded && addMode &&
            <Element key={projects[0].id}
                ignoreFields={['id']}
                fields={projectFields}
                element={projects[0]}
                createMode={true}
                onCreate={handleCreateProject}/>}
        </Box>
        <Footer onAdd={()=>{setAddMode(true)}}/>
    </Box>)
}