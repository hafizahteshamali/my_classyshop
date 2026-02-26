
export const CreateProductController = async (req, res)=>{
    try {
        console.log("CreateProductController");
    } catch (error) {
        return res.status(500).send({success: false, message: error.message})
    }
}

export const GetAllProductsController = async (req, res)=>{
    try {
        console.log("GetAllProductsController");
    } catch (error) {
        return res.status(500).send({success: false, message: error.message})
    }
}

export const GetSingleProductController = async (req, res)=>{
    try {
        console.log("GetSingleProductController");
    } catch (error) {
        return res.status(500).send({success: false, message: error.message})
    }
}

export const DeleteProductController = async (req, res)=>{
    try {
        console.log("DeleteProductController");
    } catch (error) {
        return res.status(500).send({success: false, message: error.message})
    }
}

export const UpdateProductController = async (req, res)=>{
    try {
        console.log("UpdateProductController");
    } catch (error) {
        return res.status(500).send({success: false, message: error.message})
    }
}

