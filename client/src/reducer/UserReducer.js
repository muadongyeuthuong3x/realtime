import  {ERROR , SUCCESS ,CLEAR ,LISTUSERCHAT }   from '../contants/type'

export const UserReducer  = (state , action)=>{
    const {type  , payload} = action
    switch (type) {

        case LISTUSERCHAT:{
            return {
                ...state,
                listdata:payload
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

