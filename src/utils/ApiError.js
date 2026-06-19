class Apierror extends Error {
    constructor(statuscode , message = "something went wrong " , errors = [] , stack = "" ){
        super(message ) ; 
        this.statuscode = statuscode ; 
        this.errors = errors ; 
        this.status = statuscode ; 
        if(stack){
            this.stack = stack ; 
        }
        else {
            Error.captureStackTrace(this , this.constructor) ; 
        }
    }
}

export {Apierror} ; 