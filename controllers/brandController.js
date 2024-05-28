const BrandModel = require("../models/brand");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");

const createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingBrand = await BrandModel.findOne({
      name: req.body.name,
    });

    if (existingBrand) {
      return res.status(400).json({ message: "Brand name already exists!" });
    }

    let uploadImage = {};

    if (req.body.image) {
      console.log("hello meron");
      const cloudinaryFolderOption = {
        folder: "brand",
      };

      const result = await cloudinary.v2.uploader.upload(
        req.body.image,
        cloudinaryFolderOption
      );

      uploadImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      console.log("hello wala");
      uploadImage = {
        public_id: null,
        url: null,
      }; // Ensure image is an object
    }

    const brand = await BrandModel.create({
      name,
      image: uploadImage,
    });

    console.log(brand);

    res.status(201).json({ success: true, brand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create brand" });
  }
};

const allBrands = async (req, res, next) => {
  try {
    const brands = await BrandModel.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order;

    return res.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching brand data",
    });
  }
};

const singleBrand = async (req, res, next) => {
  try {
    const brand = await BrandModel.findById(req.params.id);

    if (!brand) {
      return next(
        new ErrorHandler(`Brand not found with id: ${req.params.id}`)
      );
    }

    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    // Handle errors here
    console.error(error);
    return next(new ErrorHandler("Error while fetching brand details"));
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const findBrand = await BrandModel.findById(req.params.id);

    if (!findBrand) {
      return next(
        new ErrorHandler(`Brand not found with id: ${req.params.id}`)
      );
    }

    let image = [];

    if (req.body.image) {
      const cloudinaryFolderOption = {
        folder: "brand",
      };

      const result = await cloudinary.v2.uploader.upload(
        req.body.image,
        cloudinaryFolderOption
      );

      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      image = findBrand.images;
    }

    const brand = await BrandModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: image,
      },
      { new: true }
    );

    if (!brand) {
      return next(new ErrorHandler("Brand not found", 404));
    }

    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    // Handle errors using the ErrorHandler
    return next(
      new ErrorHandler("An error occurred while updating the brand", 500)
    );
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const brand = await BrandModel.findById(req.params.id);

    if (!brand) {
      return next(
        new ErrorHandler(`Brand does not exist with id: ${req.params.id}`)
      );
    }

    await brand.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler("Error deleting the brand", 500));
  }
};

module.exports = {
  createBrand,
  allBrands,
  singleBrand,
  updateBrand,
  deleteBrand,
};
