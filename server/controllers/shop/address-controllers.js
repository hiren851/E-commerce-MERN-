const Address = require("../../models/Adress");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, state, country, pincode, phone, notes } =
      req.body;

    if (
      !userId ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !phone ||
      !notes
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      state,
      country,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();
    res.status(201).json({
      success: true,
      data: newAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const fromData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User id and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      fromData,
      { new: true }
    );

    if (!address) {
      return rea.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
        res.status(400).json({
          success: false,
          message: "User id and address id is required!",
        });
      }

      const address = await Address.findOneAndDelete({_id: addressId , userId})
      if (!address) {
        return rea.status(404).json({
          success: false,
          message: "Address not found",
        });
      }

      res.status(200).json({
        success: true,
        message : "Address deleted successfully",
      })

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
