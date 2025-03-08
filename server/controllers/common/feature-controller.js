const Feature = require("../../models/Features");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    const featureImages = new Feature({
      image: image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {

    const images = await Feature.find({})

    res.status(201).json({
        success: true,
        data: images,
      });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error!",
    });
  }
};


module.exports = {addFeatureImage,getFeatureImages}