import  {useReducer }   from 'react'
import axios from 'axios'
import {UserReducer} from './../../reducer/UserReducer'
import UserContext from './UserContext'
import { useState } from 'react'
import  {setAuthentication} from  '../helper/auth'


const User = ({children})=>{
  const [listuser , setlistuser]=useState([])
    const initalState = {
        data :[],
        success:null,
        error:null,
        listdata:[],

        
    }
    const [ state , dispatch ] = useReducer(UserReducer ,initalState)

    

    const apidangki  = async (dataUser) =>{
        const config = {
            'Content-Type': 'application/json'
          }
        await axios.post('http://localhost:8000/api/dangkitaikhoan', dataUser, config).then(res=>{
        
            dispatch({
                type:"SUCCESS",
                payload: res.data.message
              })

            
        }).catch((err)=>{
     
            dispatch({
            type:"ERROR",
            payload: err.response.data.message
           })
          })
    }


    const apidangnhap = async(dataUser)=>{
      const config = {
        'Content-Type': 'application/json'
      }
    await axios.post('http://localhost:8000/api/dangnhap', dataUser, config ).then(res=>{
    
        dispatch({
            type:"SUCCESS",
            payload: res.data.message
          })
         
          setAuthentication(res.data. accesstoken ,   res.data.userdata)
          window.location.href = "/listhang";
       
         
    }).catch((err)=>{

   
 
        dispatch({
        type:"ERROR",
        payload: err.response.data.message
       })
      })
    }


    const apilistuseradmin = async(req,res)=>{

      await axios.get('http://localhost:8000/api/listuserchat').then(res=>{

        setlistuser( res.data.listuser )
         
    }).catch((err)=>{
 
        dispatch({
        type:"ERROR",
        payload: err.response.data.message
       })
      })
     }

    const clearmessage  =  () =>{
        dispatch({
          type:"CLEAR",
          payload:null
        })
      }
 
    

      const valueCOntext = {
        apidangki,
        errors:state.error,
        successs:state.success,
        clearmessage,
        apidangnhap,
        apilistuseradmin,
        listuser:[listuser , setlistuser]
       
       
      }
      
return (
    <UserContext.Provider value={valueCOntext}>
         
      {children}

        </UserContext.Provider>

       
)}


export default User