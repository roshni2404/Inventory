// import mongoose from 'mongoose';

// const categorySchema = new mongoose.Schema({
//     categoryName: {type: String, required: true},
//     categoryDescription: {type: String, required: true},
// });

// const CategoryModel = mongoose.model('Category', categorySchema);
// export default CategoryModel;


import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        categoryName: { type: String, required: true, trim: true },
        categoryDescription: { type: String, trim: true },  // ✅ not required
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
