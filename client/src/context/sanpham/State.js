import  {useReducer }   from 'react'
import axios from 'axios'
import {SanPhamReducer} from './../../reducer/SanPhamReducer'

import Sanphamcontext from './Sanphamcontext'

const SanPhamcontextProvider  = ({children}) =>{
  
    const initalState = {
        data :[],
        success:null,
        error:null,
        listdata:[],
        dataedit:null
        
    }


const [ state , dispatch ] = useReducer(SanPhamReducer ,initalState)

    


const  addSanPham = async(dataHang)=>{

    const config = {
        'Content-Type': 'application/json'
      }
  

    await axios.post('http://localhost:8000/api/createsanpham', dataHang, config).then(res=>{
      
     
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


 const listsanpham = async()=>{


  await axios.get('http://localhost:8000/api/listsanpham').then(res=>{
    
      dispatch({
        type:"LISTSANPHAM",
        payload: res.data.listsanpham
      })
     
    

  }).catch((err)=>{
   
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}
const deletadata = async(id) =>{

await axios.delete(`http://localhost:8000/api/deletesanpham/${id}`).then(res=>{
 console.log(id)
dispatch({
    type:"DELETE",
    payload: res.data.id
  })
 
    dispatch({
      type:"SUCCESS",
      payload: res.data.message
    })
    listsanpham()

}).catch((err)=>{
 
  dispatch({
  type:"ERROR",
  payload: err.response.data.message
 })
})
}

const editsanpham = async(id)=>{

  

  await axios.get(`http://localhost:8000/api/editsanpham/${id}`).then(res=>{
    
      dispatch({
        type:"EDITSANPHAM",
        payload: res.data.editsanpham
      })
 
  }).catch((err)=>{
   
    dispatch({
    type:"ERROR",
    payload: err.response.data.message
   })
  })

}


const apikhmua =async(id) =>{

}


const clearmessage  =  () =>{
  dispatch({
    type:"CLEAR",
    payload:null
  })
}

const valueCOntext = {
  addSanPham,
  errors:state.error,
  successs:state.success,
  clearmessage,
  listsanpham,
  deletadata,
  editsanpham,
  editsp: state.dataedit,
  listdata:state.listdata,
  apikhmua
 
}


return (
    <Sanphamcontext.Provider value={valueCOntext}>
         
      {children}

        </Sanphamcontext.Provider>

       
)}

export default SanPhamcontextProvider