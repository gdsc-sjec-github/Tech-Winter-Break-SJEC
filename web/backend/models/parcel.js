import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const parcelSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  trackingNumber: { type: String, required: true, unique: true },
  parcelName: { type: String, required: true },
  recipient: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'arrived'], 
    default: 'pending' 
  },
  items: {type: Number, default: 1},
  user: { 
    type: String, 
    ref: 'User',
    required: true 
  },
  arrivalDate: { type: Date, required: true },
  emailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Parcel = mongoose.model('Parcel', parcelSchema);
