import React  ,{useState , useContext ,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button ,ButtonGroup } from '@material-ui/core'
import UserContext from './../context/Taikhoanuser/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import {NavLink} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height:'100vh',
      display:'flex',
      alignItems: 'center'
    
    },
    input:{
        width:"100%",
        marginBottom:"20px"
    },
    button:{
        margin:"10px"
    }
  }));

const Dangki = () =>{
  
      const classes = useStyles();
      const[ttdktaikhoan , setttdktaikhoan] =useState({
        email:null,
        password:null,
        role:0
      })
      const context = useContext(UserContext)
       
     
    
      const { apidangki ,errors , successs  , clearmessage} = context

      const [message , setmessage] = useState(false)

      useEffect(()=>{

        clearmessage()
    
        if(errors !=null){
           return  toast.error(errors)
          }
         if(successs !=null){ 
      
          return    toast.success(successs)
      
          }
      },[message])

      const Laydata = (e) =>{
        var target = e.target;
        var name = target.name;
        var value =  target.value;
        
        setttdktaikhoan({ ...ttdktaikhoan , [name]: value})
      }

      const sendatadangki = async(event)=>{
        event.preventDefault();
        await apidangki(ttdktaikhoan)
        setmessage(!message)
      }

    return(
        
        <div className = {classes.root} >
              <ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>

        <Grid container >
        <Grid item lg={4} md={6}/>
          <Grid item lg={4} md={6} >
          <form onSubmit={sendatadangki}  > 
          <TextField
          id="filled-password-input"
          label="Email"
          type="text"
          autoComplete="current-password"
          variant="filled"
          className = {classes.input} 
          onChange={Laydata}
          name="email"
        />

          <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          name="password"
          className = {classes.input} 
          onChange={Laydata}
        />

<ButtonGroup  aria-label="outlined primary button group">
<Button variant="contained" color="primary"  className = {classes.button} type="submit" >
   
  Đăng kí
</Button>
<NavLink
  to="/dangnhap"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  
<Button variant="contained" color="primary" className = {classes.button}>
  Đăng nhập
</Button>
</NavLink>
</ButtonGroup>

</form>
              </Grid>
              </Grid>
             
              </div>
             
    )
}

export default Dangki