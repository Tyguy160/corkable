const { Router } = require('express');
const auth = require('../../middleware/auth');
const verifyId = require('../../middleware/verifyId');

const {
  createPin,
  updatePinById,
  getPinById,
  getPins,
  deletePinById,
  deletePins,
} = require('./pin.controller');

const router = Router({ mergeParams: true });

// Create a new pin
router.post('/', auth, verifyId, createPin);

// Get all pins
router.get('/', auth, verifyId, getPins);

// Get pin by ID
router.get('/:pinId', auth, verifyId, getPinById);

// Update pin by ID
router.put('/:pinId', auth, verifyId, updatePinById);

// Delete pin by ID
router.delete('/:pinId', auth, verifyId, deletePinById);

// Delete many pins
router.delete('/', auth, verifyId, deletePins);

module.exports = router;
