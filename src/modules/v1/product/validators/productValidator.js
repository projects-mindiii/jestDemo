import validateSchema from "~/utils/validate";

// create schema for create new product
const schema = {
    type:"object",
    properties:{
        name:{
            type:"string",
            maxLength: 50,
            errorMessage:{
                type:"Product name should be string type",
                maxLength:"Product name max-length should be 50 chars only",
            }
        },
        price:{
            type:"number",
            maximum: 999,
            minimum: 499,
            errorMessage:{
                type:"Product price should be in digits only",
                maxLength:"Product price can have max 5 digits"
            }
        }
    },
    required:["name","price"],
    additionalProperties:false
}

export const productValidator = (req, res, next)=>{
    const isValid = validateSchema(req,schema);
    if(isValid.status==false) return res.status(isValid.status_code).json(isValid.error);
    next();
}

