import React  ,{useState , useContext ,useEffect} from 'react';
import   TrangchuAdmin from './../DasboardAdmin/Trangchuadmin'
import { makeStyles } from '@material-ui/core/styles';
import {Button ,ButtonGroup} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ContextHang from './../context/Hang/HangCtext'
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button:{
        marginRight:'10px',
    },
    buttongr:{
        display:'block',
        marginTop:'20px'
    },
  }));

  
const  Hang = () => {
  

  const context = useContext(ContextHang)

  const { addHang ,errors , successs  , clearmessage} =context



  const [value, setValue] = useState({
      hang:''
  });

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
 



   const OnChangeValue =(event)=>{
    setValue({ hang:event.target.value });
   }

    const classes = useStyles();


   const  Sendata = async(event) =>{

    event.preventDefault();

    const hangnew = {
      hangnew:value.hang
    }
     
    
     await addHang(hangnew)
     setmessage(!message)
    } 
 

    const ClickCanel = ()=>{
        setValue({hang:''});
    }

    return (

 
        <div> 

<ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>



          <TrangchuAdmin/>
          <Grid container spacing={3}>
            
          <Grid item lg={3}/>
          <Grid item xs={6}>
           
          <form className={classes.root} noValidate autoComplete="off" onSubmit={Sendata}>
      <div>
      <TextField
          id="standard-textarea"
          label="Thêm tên sản phẩm"
          placeholder="Placeholder"
          value={value.hang}
          type="text"
          multiline
          name="hang"
          onChange={OnChangeValue}
        />
   
   <ButtonGroup  className = {classes.buttongr}>
   <Button variant="contained" color="primary"  type="submit" className = {classes.button}> Submit</Button>
   <Button variant="contained" onClick={ClickCanel}>Canel</Button>
</ButtonGroup>

      </div>
    </form>


        </Grid>

              </Grid>
            
        </div>
    );
}

export default Hang;