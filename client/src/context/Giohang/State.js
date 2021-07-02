import  {useEffect, useReducer ,useState }   from 'react'
import axios from 'axios'
import {GiohangReducer} from './../../reducer/GiohangReducer'

import ContextGiohang from './Giohangcontext'
import { tokenget } from '../helper/auth'
import {deleteLocalStorage ,getLocalStorage } from '../helper/localStorage'

const GiohangProvider = ({children}) =>{

    
    const initalState = {
        success:null,
        error:null,
        data:[]
    }


const [ state , dispatch ] = useReducer(GiohangReducer ,initalState)
const [show, setShow] = useState(false);
    const apisavegiohang = async(datagiohang) =>{

        const config = {
            'Content-Type': 'application/json',
          
          }
        const sanphammua =  getLocalStorage("giohang")
        const data = {
          thongtinnguoimua : datagiohang ,
          sanphammua: sanphammua
        }

      const token = tokenget();

      await axios.post('http://localhost:8000/api/savegiohang' , data ,{ headers: {"Authorization" : `Bearer ${token}`} } ,config).then(res=>{  
       
          dispatch({
            type:"SUCCESS",
            payload: res.data.message
          })
          setShow(true)
          setTimeout(() => {
          window.location.href = "/trangchu";
          deleteLocalStorage("giohang")
          }, 1000);
       
      
      
      }).catch((err)=>{
       
        dispatch({
        type:"ERROR",
        payload: err.response.data.message
       })
      })
      }


      
      const listdonhang = async() =>{

      
      const token = tokenget();

      await axios.get('http://localhost:8000/api/listdonhang' ,{ headers: {"Authorization" : `Bearer ${token}`} } ).then(res=>{  
       
          dispatch({
            type:"LISTGIOHANG",
            payload: res.data.data
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
console.log(state.data.cart)
console.log(state.data)
    const valueCOntext = {
        apisavegiohang,
        errors:state.error,
        successs:state.success,
        clearmessage,
        shows:show,
        listdonhang,
        sanphammua:state.data.cart,
        listdata:state.data
      }

    return (
        < ContextGiohang.Provider value={valueCOntext}>
             
          {children}
    
            </ ContextGiohang.Provider>
    
           
    )}



export default  GiohangProvider