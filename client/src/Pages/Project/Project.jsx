import React from 'react'
import { useState, useContext, useEffect } from "react";

import Nav from '../../components/Navbar/Nav'
import styles from "./project.module.css";
import NewProjectDialog from '../../components/Project/NewProjectDialog';
import AuthContext from '../../Contexts/AuthContext';
import LoadingSpinner from '../../components/Others/LoadingSpinner';

import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Project() {

  const navigate = useNavigate();
  const { User } = useContext(AuthContext);
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAllProjects() {
    setIsLoading(true);
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/project/get/all`, {
      userId: User.id
    });

    if (res?.data?.success != true) {
      toast.error(res?.data?.message)
    }

    setProjects(res?.data?.body);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllProjects();
  }, [])
  

  async function handleNewProject(projName) {
    // console.log(projName, User.id);

    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/project/create`, {
      name: projName,
      userId: User.id
    });

    if (res?.data?.success != true) {
      toast.error(res?.data?.message)
      return;
    }

    toast.success(res?.data?.message)

    // Append to project list
    setProjects([...projects, res.data.body]);
  }

  async function handleDeleteProject(id) {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND}/api/project/delete/${id}`);

      if (res?.data?.status == false) {
        toast.error(res.data.message);
        setIsLoading(false);
        return;
      }

      // On Success
      toast.success("Project Deleted!");

      // Delete form state
      setProjects(projects.filter(project => project._id !== id));
      setIsLoading(false);
    } 
    catch(err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  async function handleOpenProject(id) {
    navigate(`/project/${id}`);
  }

  return (
    <>
    <Nav/>
    <div className={styles.wrapper}>
      {openNewProjectDialog && 
        <NewProjectDialog  
        openNewProjectDialog={openNewProjectDialog}
        setOpenNewProjectDialog={setOpenNewProjectDialog}
        handleNewProject={handleNewProject}
        />
      }

      <div className={styles.head}>
        <div className={styles.addProjBtn} onClick={(e)=>setOpenNewProjectDialog(true)}>
          <IoMdAdd className={styles.addProjIcon} />
          <div className={styles.addProjTxt}>New Project</div>
        </div>
      </div>
      
      {!isLoading ? 
        projects.length != 0 ?
          <div className={styles.projContainer}>
            {projects.map((project) => {
              return (
                <div className={styles.projCardWrapper} key={project._id}>
                  <div className={styles.projectName}>{project.name}</div>
                  <div className={styles.projOps}>
                    <FiEdit className={styles.editProjIcon} onClick={(e) => handleOpenProject(project._id)} />
                    <MdDeleteOutline className={styles.deleteProjIcon} onClick={(e) => handleDeleteProject(project._id)} />
                  </div>
                </div>
              );
            })}
          </div>
          :
          <div style={{textAlign: 'center', marginTop: '150px'}}>
            Create a Project to get started !
          </div>
        :
        <LoadingSpinner />
      }
    </div>
    </>
  )
}

export default Project