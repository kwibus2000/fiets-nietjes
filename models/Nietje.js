const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const NietjesSchema = new mongoose.Schema({
  nietjes_Id: {
    type: String,
    required: [true, 'Geef een ID:'],
    unique: true,
    trim: true,
    maxLength: [10, 'ID: maximaal 10 tekens lang'],
  },
  address: {
    type: String,
    required: [true, 'Geef een adres op'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Geocode & create location
NietjesSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  }

  // Do not save address
  this.address = undefined
  next()
})

module.exports = mongoose.model('Nietje', NietjesSchema)
