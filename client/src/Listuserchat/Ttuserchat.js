import React ,{useState , useContext , useEffect} from 'react';
import   TrangchuAdmin from './../DasboardAdmin/Trangchuadmin'
import UserContext from './../context/Taikhoanuser/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ImageIcon from '@material-ui/icons/Image';
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
const Ttuserchat =()=>{
       
    const classes = useStyles();

   
    return(
        <>
    
         <div className={classes.meberchat}>
       { listuser[0].length > 0 &&  listuser[0].map(e=>{
           return (
               <div className={classes.menber} key={e._id} onClick={()=>layuserid(e._id)}>
               <div className={classes.headerchat}>
                  <img src={e.avatar } className={classes.imghien}/>  <span>{e.email} </span>
               </div>
              
               </div>
           )
       }) }   

             
         </div>
       
        </>
    )
}






export default Ttuserchat


