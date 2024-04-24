import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import Nav from '../../components/Navbar/Nav'
import styles from "./projPrev.module.css"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { IoMdAdd } from "react-icons/io"
import { FaRegSave } from "react-icons/fa";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CustomButton from "../../components/Button/CustomButton"
import CustomInput from '../../components/Input/CustomInput';
import CustomSelect from '../../components/Select/CustomSelect';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/Others/LoadingSpinner';
import { MdDeleteOutline } from "react-icons/md";



function ProjectPreview() {

  const params = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [thisProject, setThisProject] = useState(null);
  const [selectedComp, setSelectedComp] = useState(null);
  const [components, setComponents] = useState([]);
  const timerRef = useRef(null);


  async function fetchProjDetails() {
    const projectId = params.id;
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/project/get/${projectId}`);

      if (false == res?.data?.success) {
        toast.error(res.data.message);
        return;
      }
      // console.log(res?.data?.body);
      setThisProject(res?.data?.body);
    } catch(err) {
      toast.error("Server Error");
      console.log(err);
    }
  }

  async function fetchAllComponents() {
    const projectId = params.id;
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/comp/getall/${projectId}`);

      if (false == res?.data?.success) {
        toast.error(res.data.message);
        setIsLoading(false);
        return;
      }
      // console.log(res?.data?.body);
      setIsLoading(false)
      setComponents(res?.data?.body);
    } catch(err) {
      setIsLoading(false)
      toast.error("Server Error");
      console.log(err);
    }
  }

  // Create default component => Will Edit later
  function createNewComponent(type) {
    console.log('Creating New Component');

    const newId = uuidv4();

    const newComponent = {
      _id: newId,
      name: `Component #${components.length + 1}`,
      project: params.id,
      type: type,
      styles: {
        height: 55,
        width: 100,
        backgroundColor: "white",
        textColor: "black",
        borderColor: "white",
        borderRadius: 5,
        margin: 0,
        paddingX: 0,
        paddingY: 0,
      },
      options: []
    }

    setComponents([...components, newComponent]);
  }

  function handleChangeComponent() {
    const updatedComponents = components.map(component => 
      component._id == selectedComp._id ? selectedComp : component
    );

    // console.log(updatedComponents);

    setComponents(updatedComponents)
  }

  async function handleSaveChanges() {
    // Save to database
    try {
      setIsSaving(true)
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/comp/save`, {
        allComponents: components
      });

      if (false == res?.status?.success) {
        toast.error("Project Save Failed");
      } else {
        toast.success("Project Saved");
      }

      setIsSaving(false);
    } catch (err) {
      setIsSaving(false);
      toast.error("Server Error");
      console.log(err);
    }
  }

  async function handleDeleteComp() {
    const idToDelete = selectedComp._id;

    try {
      setIsDeleting(true);
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND}/api/comp/delete/${idToDelete}`);
      setIsDeleting(false);

      if (false == res?.status?.success) {
        toast.error("Component Delete Failed");
        
      } else {
        toast.success("Component Deleted");
        const updatedComponents = components.filter(ele => ele._id != idToDelete);
        setComponents(updatedComponents);
        setSelectedComp(null);
      }
    } catch(err) {
      setIsDeleting(false);
      console.log(err);
      toast.error("Server Error")
    }
  }

  useEffect(() => {
    fetchAllComponents();
    fetchProjDetails();
  },[])

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleSaveChanges();
    }, 5000);

    // Clear
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [components]);

  return (
    <>
    <Nav/>
    <div className={styles.wrapper}>
      
      {/* <div className={styles.head}>
        Head
      </div> */}

      {isLoading ? <LoadingSpinner/> :
      <div className={styles.componentsHeadWrapper}>

        <div className={styles.compWrapper}>
          <div className={styles.projectTitle}> {thisProject?.name} </div>
          {components.map((component) => {
            return (
              <div className={styles.component} key={component._id} onClick={(e) => setSelectedComp(component)}> {
                component.type == 'BUTTON' ? <CustomButton comp={component} />
                :
                component.type == 'INPUT' ? <CustomInput comp={component} />
                :
                <CustomSelect comp={component} />
                } </div>
            )
          })}
          {/* ADD NEW COMPONENT */}
          <div className={styles.addCompBtn} onClick={(e)=>createNewComponent('INPUT')}>
            <IoMdAdd className={styles.addCompIcon} />
            <div className={styles.addProjTxt}>New Component</div>
          </div>
        </div>
        
        {/* COMPONENT EDITOR */}
        <div className={styles.editorWrapper}>
          <span className={styles.editorHeading}>LIVE Editor</span>
          <span className={styles.editorSubHeading}>Select a Component to Edit</span>
          {selectedComp &&
            <div className={styles.editOptions}>

              {/* COMPONENT NAME */}
              <TextField 
                fullWidth
                id="filled-basic" 
                label="Component Name" 
                variant="filled" 
                value={selectedComp.name}
                onChange={(e)=> {
                  selectedComp.name = e.target.value;
                  handleChangeComponent();
                }}
              />

              {/* COMPONENT TYPE */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{`Type of ${selectedComp.name}`}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.type}
                  label="Component Type"
                  onChange={(e)=>{
                    selectedComp.type = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={'BUTTON'}>BUTTON</MenuItem>
                  <MenuItem value={'INPUT'}>INPUT</MenuItem>
                  <MenuItem value={'SELECT'}>SELECT</MenuItem>
                </Select>
              </FormControl>

              {/* BORDER COLOR */}
              <FormControl >
                <InputLabel id="demo-simple-select-label">Border Colour</InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.borderColor}
                  label="Component Type"
                  onChange={(e)=>{
                    selectedComp.styles.borderColor = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={'white'}>None</MenuItem>
                  <MenuItem value={'blue'}>Primary (Blue)</MenuItem>
                  <MenuItem value={'green'}>Secondary (Green)</MenuItem>
                  <MenuItem value={'red'}>Danger (Red)</MenuItem>
                </Select>
              </FormControl>

              {/* TEXT COLOR */}
              {selectedComp?.type == 'BUTTON' && 
                <FormControl >
                  <InputLabel id="demo-simple-select-label">Text Colour</InputLabel>
                  <Select
                    sx={{
                      width: '220px'
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedComp.styles.textColor}
                    label="Component Type"
                    onChange={(e)=>{
                      selectedComp.styles.textColor = e.target.value
                      handleChangeComponent();
                    }}
                  >
                    <MenuItem value={'white'}>Default (White)</MenuItem>
                    <MenuItem value={'black'}> Dark (Black)</MenuItem>
                    <MenuItem value={'blue'}>Primary (Blue)</MenuItem>
                    <MenuItem value={'green'}>Secondary (Green)</MenuItem>
                    <MenuItem value={'red'}>Danger (Red)</MenuItem>
                  </Select>
                </FormControl>
              }

              {/* BG COLOR */}
              <FormControl >
                <InputLabel id="demo-simple-select-label">Background Colour</InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.backgroundColor}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.backgroundColor = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={'white'}>None (White)</MenuItem>
                  <MenuItem value={'black'}> Dark (Black)</MenuItem>
                  <MenuItem value={'blue'}>Primary (Blue)</MenuItem>
                  <MenuItem value={'green'}>Secondary (Green)</MenuItem>
                  <MenuItem value={'red'}>Danger (Red)</MenuItem>
                </Select>
              </FormControl>

              {/* HEIGHT */}
              <FormControl>
                <InputLabel id="demo-simple-select-label"> HEIGHT </InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.height}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.height = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={55}>Default</MenuItem>
                  <MenuItem value={45}>Small</MenuItem>
                  <MenuItem value={60}>Medium</MenuItem>
                  <MenuItem value={70}>Large</MenuItem>
                </Select>
              </FormControl>

              {/* WIDTH */}
              <FormControl>
                <InputLabel id="demo-simple-select-label"> Width </InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.width}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.width = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={35}>Small (35%)</MenuItem>
                  <MenuItem value={70}>Medium (70%) </MenuItem>
                  <MenuItem value={100}>Large (100%) </MenuItem>
                </Select>
              </FormControl>

              {/* BORDER RADIUS */}
              <FormControl >
                <InputLabel id="demo-simple-select-label"> Border Radius </InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.borderRadius}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.borderRadius = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={5}>Small</MenuItem>
                  <MenuItem value={10}>Medium</MenuItem>
                  <MenuItem value={20}>Large</MenuItem>
                </Select>
              </FormControl>

              {/* Margin */}
              <FormControl>
                <InputLabel id="demo-simple-select-label"> Margin </InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.margin}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.margin = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={0}>Small</MenuItem>
                  <MenuItem value={5}>Medium</MenuItem>
                  <MenuItem value={10}>Large</MenuItem>
                </Select>
              </FormControl>

              {/* Padding X */}
              <FormControl >
                <InputLabel id="demo-simple-select-label"> Padding X </InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.paddingX}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.paddingX = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={0}>Small (0px)</MenuItem>
                  <MenuItem value={15}>Medium (15px)</MenuItem>
                  <MenuItem value={30}>Large (30px)</MenuItem>
                </Select>
              </FormControl>

              {/* Padding Y */}
              <FormControl >
                <InputLabel id="demo-simple-select-label"> Padding Y </InputLabel>
                <Select
                  sx={{
                    width: '220px'
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedComp.styles.paddingY}
                  label="Component Type"
                  onChange={(e) => {
                    selectedComp.styles.paddingY = e.target.value
                    handleChangeComponent();
                  }}
                >
                  <MenuItem value={0}>Small (0px)</MenuItem>
                  <MenuItem value={15}>Medium (15px)</MenuItem>
                  <MenuItem value={30}>Large (30px)</MenuItem>
                </Select>
              </FormControl>

              {/* OPTIONS FOR SELECT COMPOENENT */}
              {selectedComp?.type == "SELECT" &&
                <div className={styles.optionWrapper}>
                <TextField fullWidth
                  sx={{
                    marginBottom: '15px'
                  }}
                  id="standard-basic"
                  label="Option 1" 
                  variant="standard"
                  value={selectedComp.options[0]}
                  onChange={(e)=> {
                    selectedComp.options[0] = e.target.value;
                    handleChangeComponent();
                  }}
                />
                <TextField fullWidth
                  sx={{
                    marginBottom: '15px'
                  }}
                  id="standard-basic"
                  label="option 2" 
                  variant="standard"
                  value={selectedComp.options[1]}
                  onChange={(e)=> {
                    selectedComp.options[1] = e.target.value;
                    handleChangeComponent();
                  }}
                />
                <TextField fullWidth
                  sx={{
                    marginBottom: '15px'
                  }}
                  id="standard-basic"
                  label="Option 3" 
                  variant="standard"
                  value={selectedComp.options[2]}
                  onChange={(e)=> {
                    selectedComp.options[2] = e.target.value;
                    handleChangeComponent();
                  }}
                />
                </div>
              }

              <div className={styles.buttonWrapper}>

              {/* DEL COMP */}
              {isDeleting ? <LoadingSpinner /> :
                <div className={styles.deleteCompBtn} onClick={handleDeleteComp}>
                  <MdDeleteOutline className={styles.addCompIcon} />
                  <div className={styles.addProjTxt}> Delete </div>
                </div>
              }
              
              {/* SAVE CHANGES */}
              {isSaving ? <LoadingSpinner /> :
                <div className={styles.saveCompBtn} onClick={handleSaveChanges}>
                  <FaRegSave className={styles.addCompIcon} />
                  <div className={styles.addProjTxt}>Save Changes</div>
                </div>
              }

              </div>

              <span className={styles.note}> Note: Autosave happens after 5 seconds of user inactivity.</span>
            </div>
          }
        </div>
      
      </div>
      }

    </div>
    </>
  )
}

export default ProjectPreview