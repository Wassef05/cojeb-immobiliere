import Partner from "../models/partner.model.js";
import { throwError } from "../utils/error.js";

// Create Partner
export const createPartner = async (req, res, next) => {
    try {
      const partner = await Partner.create(req.body);
      res.status(201).json({ success: true, data: partner });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      next(error);
    }
  };

// Delete Partner
export const deletePartner = async (req, res, next) => {
  try {
    const isPartnerExist = await Partner.findById(req.params.id);
    if (!isPartnerExist) return next(throwError(404, "Partner not found"));
    
    await Partner.findByIdAndDelete(req.params.id);
    res.status(200).json("Partner deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Update Partner
export const updatePartner = async (req, res, next) => {
  try {
    const isPartnerExist = await Partner.findById(req.params.id);
    if (!isPartnerExist) return next(throwError(404, "Partner not found"));

    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPartner);
  } catch (error) {
    next(error);
  }
};

// Get All Partners
export const getAllPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    next(error);
  }
};

// Get Single Partner
export const singlePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return next(throwError(404, "Partner not found"));
    }
    res.status(200).json(partner);
  } catch (error) {
    next(error);
  }
};
