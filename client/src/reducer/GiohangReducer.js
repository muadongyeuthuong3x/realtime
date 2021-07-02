

import  { ERROR , SUCCESS ,CLEAR ,LISTGIOHANG }   from '../contants/type'

export const GiohangReducer = (state , action)=>{
  const {type  , payload  } = action
  
 switch (type) {

   case LISTGIOHANG : {
    return {
        ...state,
        data:payload,
       
    }
   }

    case SUCCESS:
          
        return {
            ...state,
            success:payload,
            error:null
        }
        
    case ERROR:
          
            return {
                ...state,
                error:payload,
                success:null
            }
    case CLEAR:{
        return {
            ...state,
            error:payload,
            success:payload
        }
    }


     default:
        return state
 }
}

