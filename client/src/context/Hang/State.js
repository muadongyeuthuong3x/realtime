import  {useEffect, useReducer ,useState }   from 'react'
import axios from 'axios'
import {HangReducer} from './../../reducer/HangReducer'

import ContextHang from './HangCtext'
import { tokenget } from '../helper/auth'
const HangcontextProvider  = ({children}) =>{
  
  

    const initalState = {
        data :[],
        success:null,
        error:null,
        listdata:[],
        dataedit:null
        
    }


const [ state , dispatch ] = useReducer(HangReducer ,initalState)



const addHang = async(dataHang)=>{

    const config = {
        'Content-Type': 'application/json',
      
      }

    
      const token = tokenget();
    await axios.post('http://localhost:8000/api/addHang', dataHang, { headers: {"Authorization" : `Bearer ${token}`} ,config }).then(res=>{
      
     

        dispatch({
          type:"CREATEHANG",
          payload: res.data.newhang
        })
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

const editHang = async(id)=>{

  const token = tokenget();

  await axios.get(`http://localhost:8000/api/editHang/${id}`, { headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
  
      dispatch({
        type:"EDITHANG",
        payload: res.data.edithang.hangsp
      })
 
  }).catch((err)=>{
   
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}


const updateHang = async(id,data)=>{

  const config = {
    'Content-Type': 'application/json'
  }

  const token = tokenget();
  
  await axios.put(`http://localhost:8000/api/updateHang/${id}` , data ,{ headers: {"Authorization" : `Bearer ${token}`} } ,config ).then(res=>{
      
 

      dispatch({
        type:"SUCCESS",
        payload: res.data.message
      })

      listHang()
 
  }).catch((err)=>{
   
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}



const listHang = async()=>{

  const token = tokenget();
  await axios.get('http://localhost:8000/api/listhang', { headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
   
      dispatch({
        type:"LISTHANG",
        payload: res.data.listHang
      })
  }).catch((err)=>{
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}

const deletadata = async(id) =>{
  const token = tokenget();
await axios.delete(`http://localhost:8000/api/deleteHang/${id}` ,{ headers: {"Authorization" : `Bearer ${token}`} }).then(res=>{
 
dispatch({
    type:"DELETE",
    payload: res.data.id
  })
 
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


const clearmessage  =  () =>{
  dispatch({
    type:"CLEAR",
    payload:null
  })
}



const valueCOntext = {
  addHang,
  listHang,
  errors:state.error,
  successs:state.success,
  listdatahang:state.listdata,
  dataedit:state.dataedit,

  clearmessage,
  deletadata,
  editHang,
  updateHang
}



return (
    <ContextHang.Provider value={valueCOntext}>
         
      {children}

        </ContextHang.Provider>

       
)}

export default  HangcontextProvider