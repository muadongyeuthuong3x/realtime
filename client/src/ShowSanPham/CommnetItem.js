import React ,{useState , useRef ,useContext} from 'react';
import CommentCard from './CommentCard'
import './CommentItem.css'
import SendIcon from '@material-ui/icons/Send';
import ShowSPContext from './../context/showsanpham/showcontext'
import {Modal ,Button} from 'react-bootstrap'
function  CommnetItem ({setReply , comment ,reply }){
  
  const [usercoment , setusercomment] = useState(false)
  const [value , setvalue] = useState(null)
   const nameRefmulter = useRef()
  const contentRefmulter = useRef()
  const context = useContext(ShowSPContext)
  const {  socket} =context
  
   const  showComment = ()=>{
      setusercomment(!usercoment)
    }
   
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const commentSubmit = async() => {
        const username = nameRefmulter.current.value
        const content = contentRefmulter.current.innerHTML

       if(!username.trim()) return alert('Không được để trống tên!')
        if(contentRefmulter.current.textContent.trim().length < 5)
            return alert('Nội dung phải lớn hơn 5 kí tự')
        
        const createdAt = new Date().toISOString()
     
        socket.emit('createCommentmulter', {
            username, content, product_id: comment._id, createdAt
        })
        
        contentRefmulter.current.innerHTML = ''

        if(setReply) setReply(!reply)
     
        setShow(false)
       
       
    }
   
  
    return(
        <>
    
   <CommentCard  comment={comment}>
       <div  className="comment" onClick={showComment}>Bình luận </div>

      { usercoment && <div className="noidungcomment">
         <form >
         <div ref={contentRefmulter} 
                contentEditable="true"
                style={{
                  
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline: 'none',
                    marginBottom:"10px",
                    wordWrap:"break-word"
                }}
            />
         </form>

         <div className ="send">
             < SendIcon    onClick={handleShow}/>
         </div>

         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tên của bạn </Modal.Title>
        </Modal.Header>
        <Modal.Body><input type="text" style={{  width:"100%"}}  ref={nameRefmulter}  /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={commentSubmit} >
            Send 
          </Button>
        </Modal.Footer>
      </Modal>

       </div> 
       
       }

   </CommentCard>
       
        </>
    )
}


export default CommnetItem


