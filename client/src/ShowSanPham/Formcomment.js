import React, {useRef, useEffect} from 'react'

function Formcommnet({id, socket , setReply ,reply}) {
    const nameRef = useRef()
    const contentRef = useRef()
  
    const commentSubmit = async() => {
        const username = nameRef.current.value
        const content = contentRef.current.innerHTML

        if(!username.trim()) return alert('Không được để trống tên!')
        if(contentRef.current.textContent.trim().length < 20)
            return alert('Nội dung phải lớn hơn 20 kí tự')
        
        const createdAt = new Date().toISOString()
     
        socket.emit('createComment', {
            username, content, product_id: id, createdAt
        })
        
        contentRef.current.innerHTML = ''

        if(setReply) setReply(!reply)

       
    }

    return (
        <div className="form_input">
            <p>Name</p>
            <input type="text" ref={nameRef}  style={{
                    height: '30px',
                    width:"100%"
                }}/>

            <p>Content</p>
            <div ref={contentRef} 
                contentEditable="true"
                style={{
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline: 'none',
                    marginBottom:"10px",
                    wordWrap:"break-word"
                }}
            />

            <button onClick={commentSubmit} type="button" className="btn btn-success">Send</button>
        </div>
    )
}

export default Formcommnet