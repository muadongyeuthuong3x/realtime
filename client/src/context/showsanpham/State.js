import  {useReducer ,useEffect ,useState }   from 'react'
import axios from 'axios'
import {ShowSPReducer} from './../../reducer/ShowSPReducer'

import Showcontext from './showcontext'
import io from 'socket.io-client'
const ShowSPcontextProvider  = ({children}) =>{
  
  

    const initalState = {
        data :[],
        success:null,
        error:null,
        comments:[]
    
    }

const [ state , dispatch ] = useReducer(ShowSPReducer ,initalState)
const [socket, setSocket] = useState(null)

useEffect(() => {

  const sockets = io("http://localhost:8900")
  setSocket(sockets)
  return () =>  sockets.close()
},[])

const getSanpham = async(id)=>{

    await axios.get(`http://localhost:8000/api/getsanpham/${id}`).then(res=>{
      
        dispatch({
          type:"GETSANPHAM",
          payload: res.data.getsanpham,
          comments: res.data.comments
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
  getSanpham,
  errors:state.error,
  successs:state.success,
  data:state.data,
  imgphu:state.data.cacanhkhac,
  clearmessage,
  socket,
  comments:state.comments
 
}



return (
    <Showcontext.Provider value={valueCOntext}>
         
      {children}

        </Showcontext.Provider>

       
)}

export default ShowSPcontextProvider