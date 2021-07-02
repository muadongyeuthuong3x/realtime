import React  ,{useState , useContext ,useEffect} from 'react';
import ShowSPContext from './../context/showsanpham/showcontext'
import { useParams } from "react-router-dom";
import CommnetItem from './CommnetItem'
import Formcommnet from './Formcomment'
  


    function ShowSP (props) {

        const { id } = useParams();
        const context = useContext(ShowSPContext)
       const [imgphus , setimgphu] = useState(null)
       const [reply, setReply] = useState(false)
      
       const {  getSanpham  , data  ,imgphu ,socket ,comments} =context
      
    useEffect(() => {
  
      getSanpham(id);
     
    
    }, [reply]);

    const myRef  = React.createRef();
   
    const Viewimgphu = (src)=>{

      setimgphu(src)
    }
    if (data === null) return  ( <h3 className="no-guest">Data .....</h3>)


    return (
 <>
 <div className="container">
            <div className="row">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 " >

            <img src={"http://localhost:8000/images/"+ `${(imgphus== null) ?  data.anhsanphamchinh : imgphus }` } alt=""/>
            <div className="imgphu"   >
            <div className="row">
         
          
      {
       

    imgphu &&  imgphu.map((element , index) => ( 
    
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 " key={index}  ref ={ myRef} >
        
      
          <img src={"http://localhost:8000/images/"+element}  alt="" onClick={()=>Viewimgphu(element) }/>
        </div>
       
      ))
      
          
      }
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 " > </div>
        </div>   
        </div>

                   </div>

                
    
     <div className="row">
     <div className="block_commnet">
       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4" >
                     <h3>Bình luận người dùng </h3>

                <Formcommnet
                 id={id} socket={socket}
                 setReply={setReply}
                 reply={reply}
                 />
                  </div>
                  
                  </div>
                   </div>


     <div className="row">
       <div className="block_commnet">
       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 " >
                     <h3>Các bình luận người dùng </h3>
            {  comments.map(comment =>(
              
              <CommnetItem key={comment._id} comment={comment}   setReply={setReply}   reply={reply}/>
            ))
              
            }
                 
                   </div>
                   </div>
                   </div>

                     </div>
 </>

 
    )
}

export default ShowSP