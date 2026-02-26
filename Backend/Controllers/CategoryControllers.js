import slugify from "slugify";
import Category from "../Database/models/CategoryModel.js";


export const CreateCategoryController = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const categories = await Category.create({
            name,
            slug: slugify(name),
            parent: parent || null
        })
        return res.status(200).send({ success: true, message: "category create successfully", categories })
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export const GetCategoryController = async (req, res) => {
    try {
        const categories = await Category.find().populate("parent");
        return res.status(200).send({ success: true, categories });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

