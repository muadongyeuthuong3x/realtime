import React  ,{useState , useContext ,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button ,ButtonGroup} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import {NavLink} from 'react-router-dom'
import UserContext from './../context/Taikhoanuser/UserContext'
import { ToastContainer, toast } from 'react-toastify';

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
    },
    buttongoogle:{
        width:"100%",
        textAlign:"center"
    }
  }));

const Dangnhap = () =>{
  
      const classes = useStyles();
      
      const[ttdktaikhoan , setttdktaikhoan] =useState({
        email:null,
        password:null
      })
      const [message , setmessage] = useState(false)
      const context = useContext(UserContext) 
      const { apidangnhap ,errors , successs  , clearmessage} = context

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
      
      const sendatadangnhap = async(event)=>{
   
          event.preventDefault();
          await apidangnhap(ttdktaikhoan)
          setmessage(!message)
        
      
       
      }

      const responseGoogle = (response) => {
        console.log(response);
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
          <form  onSubmit={sendatadangnhap}> 
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
          className = {classes.input} 
          onChange={Laydata}
          name="password"
        />
<ButtonGroup  aria-label="outlined primary button group">
<Button variant="contained" color="primary" className = {classes.button}type="submit">
  Đăng nhập
</Button>
<NavLink
  to="/dangkitaikhoan"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
<Button variant="contained" color="primary" className = {classes.button}>
  Đăng kí
</Button>
</NavLink>
</ButtonGroup> 
<br/>
<GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    className = {classes.buttongoogle}
  />
   
</form>
              </Grid>
              </Grid>
             
              </div>
             
    )
}

export default Dangnhap