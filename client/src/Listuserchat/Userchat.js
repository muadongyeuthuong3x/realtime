import React ,{useState , useContext , useEffect} from 'react';
import   TrangchuAdmin from './../DasboardAdmin/Trangchuadmin'
import UserContext from './../context/Taikhoanuser/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  
    imghien:{
      width:"40px",
       height:"40px",
      borderRadius:"50%",
      margin: "6px"
    },
    menber :{
        width:"100%",
        height:"100px",
        display:"block",
        background:"#ffb5b552",
        marginBottom:"5px",

    },
    meberchat:{
        cursor:"pointer"
    },
    datachat:{
        float:"right",
        paddingRight:"15px",
        color:"#007bff"
    },
    headerchat:{
      height: "52px",
      width: "100%",
      display: "inline-block"
    },
    khoichat:{
      background:"rgb(0 0 0 / 8%)",
      height:"400px",
      width:"100%",
      position:"relative"
    },
    closechat:{
     
      top:"10px",
     right:"10px",
      cursor:"pointer",
      position:"absolute"
    },
    ttchat:{
      width:"80%"
    },
    chatdata:{
      position:"absolute",
      left:"5px",
      bottom:"20px"
  
    },
    buttonsb:{
      position:"absolute",
      right:"10px",
      bottom:"17px"
    },
    iconimage:{
      fontSize:"44px",
      marginRight:"7px",
      cursor:"pointer"
    }
  }));
const Userchat =()=>{
       
    const classes = useStyles();

    const context = useContext(UserContext) 
      const {  apilistuseradmin , errors ,listuser} = context
      const test = "Manh cuong hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"

      const {inputdata , setinputdata} =useState(null)
      const [id ,setid] = useState(null)
      const [boolean ,setboolean] =useState(false)
      const [value, setValue] = useState(null)
      
    useEffect(()=>{
         
       apilistuseradmin ()
   
      },[])
    


      const layuserid = (e)=>{
        setid(e)
        setboolean(true)
        
      }

      const laydatavalue = (e)=>{
        setValue(e.target.value );
      }
     
      const closechatdata = ()=>{
        setboolean(false)
      }
      const sendata = async()=>{
        
      
      }
    return(
        <>
         <TrangchuAdmin/>
         <Grid container spacing={3} className={classes.boottom} >
            
            <Grid item lg={3}/>
                <Grid item lg={3}>

         <div className={classes.meberchat}>
       { listuser[0].length > 0 &&  listuser[0].map(e=>{
           return (
               <div className={classes.menber} key={e._id} onClick={()=>layuserid(e._id)}>
               <div className={classes.headerchat}>
                  <img src={e.avatar } className={classes.imghien}/>  <span>{e.email} </span>
               </div>
               <div className={classes.datachat}>
                 <div className={classes.datachat}>{ Date.now()}</div>
                      <p >{test.length >30? test.slice(30)+"...":test}</p>
                   </div>
               </div>
           )
       }) }   

             
         </div>
         </Grid>

             
         <Grid item lg={2}/>

           
        <Grid item lg={3}>
     { boolean &&  <div className={classes.khoichat}>
            <div className={classes.menuchat}>
              <div className={classes.ttchat}>
              <img src="https://nucuoimekong.com/wp-content/uploads/buc-anh-dep-can-bang-sang-tot-1.jpg" className={classes.imghien}/>  <span>Manh Cuong </span>
              </div>
            <CancelIcon className={classes.closechat} onClick={ closechatdata }/>
            </div>

          <div  >
          <input type="text"  name="data"  value={inputdata} className={classes.chatdata} onChange={laydatavalue}/>
          <div  className={classes.buttonsb}  >
            <ImageIcon   className={classes.iconimage}/>
          <Button variant="contained" color="primary"  type="submit" onClick={sendata}> Submit</Button>
          </div>
          </div>
          </div> }

         </Grid>

         </Grid>
      
        </>
    )
}






export default Userchat


