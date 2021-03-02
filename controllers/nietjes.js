const Nietje = require('../models/Nietje')

// @desc  Haal alle nietjes op
// @route GET /api/v1/nietjes
// @access Public
exports.getNietjes = async (req, res, next) => {
  try {
    const nietjes = await Nietje.find()

    return res.status(200).json({
      success: true,
      count: nietjes.length,
      data: nietjes,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc  Maak een nietje
// @route POST /api/v1/nietjes
// @access Public
exports.addNietje = async (req, res, next) => {
  try {
    const nietje = await Nietje.create(req.body)

    return res.status(200).json({
      success: true,
      data: nietje,
    })
  } catch (err) {
    console.error(err)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Deze nietjes_Id is al in gebruik' })
    }
    res.status(500).json({ error: 'Server error' })
  }
}
