import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'arrived'], 
    default: 'pending' 
  },
  user: { 
    type: String, 
    ref: 'User',
    required: true 
  },
  emailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Parcel = mongoose.model('Parcel', parcelSchema);
export default Parcel;