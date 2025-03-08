const Product = require("../../models/Products")


const searchProducts = async(req,res)=>{
    try {
        
        const {keyword} = req.params;


        if(!keyword || typeof keyword !== 'string'){
            return res.status(400).json({
                success : false,
                message: "KeyWord is Required and must be in string format"
            })
        }

        const regEx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or : [
                {title :  regEx},
                {description :  regEx},
                {category :  regEx},
                {brand :  regEx},
            ]
        }

        const searchResults = await Product.find(createSearchQuery)

        res.status(200).json({
            success : true,
            data: searchResults
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success : false,
            massage : "Error!"
        })
    }
}

module.exports  = {searchProducts}