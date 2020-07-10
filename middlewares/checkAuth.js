var jwt  = require('jsonwebtoken');

module.exports = (req,res,next)=>{
        if(req.headers.authorization == null){
            return res.status(401).json({
                status:'error',
                message:'Authentication failed provide token'
            })
        }
        var header = req.headers.authorization.split(' ');
        var token = header[1];        
        
       jwt.verify(token,"mulwatech",(error , decoded)=>{
           if(error){
               return res.status(401).json({
                   status:'error',
                   message: error.message
               })
           }else{
               req.userData = decoded;
           }
       });
       
        next();    
        
    
}