import { Parcel } from '../models/parcel.js';

export const createMyOrder = async (req, res) => {
    const { trackingNumber, parcelName, recipient, status, items, arrivalDate } = req.body;
  
    try {
      const parcel = new Parcel({
        trackingNumber,
        parcelName,
        recipient,
        status,
        items,
        user: req.userId,
        arrivalDate,
      });
  
      await parcel.save();
      res.status(201).json(parcel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating task' });
    }
}

export const deleteMyOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const parcel = await Parcel.findOne({ _id: id, user: req.userId });
      if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
  
      await parcel.remove();
      res.status(200).json({ message: 'Parcel deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting task' });
    }
};

export const editMyOrder = async (req, res) => {
    const { id } = req.params;
    const { parcelName, recipient, status, items, arrivalDate } = req.body;
  
    try {
      const parcel = await Parcel.findOne({ _id: id, user: req.userId });
      if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
  
      parcel.parcelName = parcelName || parcel.parcelName;
      parcel.recipient = recipient || parcel.recipient;
      parcel.status = status || parcel.status;
      parcel.items = items || parcel.items;
      parcel.arrivalDate = arrivalDate || parcel.arrivalDate;
  
      await parcel.save();
      res.json(parcel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating task' });
    }
};


export const getMyOrder = async (req, res) => {
    try {
        const parcels = await Parcel.find({ user: req.userId });
        res.json(parcels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching parcels' });
    }
}
