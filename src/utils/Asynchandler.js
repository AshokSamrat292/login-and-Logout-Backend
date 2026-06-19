
const asynchandler = (func)=>{ 
      return async (req , res , next)=>{
     try{
        await func(req , res , next) ;
     }
     catch(error) {
        res.status(error.status ||500).json({
        success : false , 
        message : error.message 
        }) ; 
        
        console.log("error occured") ; 
     }
    
}}


export {asynchandler} ; 

