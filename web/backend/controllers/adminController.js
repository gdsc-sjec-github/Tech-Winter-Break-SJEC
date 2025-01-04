import { Parcel } from '../models/parcel.js';

export const getAllOrders = async (req, res) => {
    try {
      const parcel = await Parcel.find();
      res.status(200).json(parcel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
}; 
    
export const updateAnOrder = async (req, res) => {
    const { id } = req.params;
    const { parcelName, recipient, status, items, arrivalDate } = req.body;
  
    try {
      const parcel = await Parcel.findById(id);
      if (!parcel) {
        return res.status(404).json({ message: 'Parcel not found' });
      }
  
      parcel.parcelName = parcelName || parcel.parcelName;
      parcel.recipient = recipient || parcel.recipient;
      parcel.status = status || parcel.status;
      parcel.items = items || parcel.items;
      parcel.arrivalDate = arrivalDate || parcel.arrivalDate;
  
      await parcel.save();
      res.status(200).json({ message: 'Parcel updated successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
}
