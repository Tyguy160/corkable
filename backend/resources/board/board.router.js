const { Router } = require('express');
const auth = require('../../middleware/auth');
const verifyId = require('../../middleware/verifyId');

const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
} = require('./board.controller');

const router = Router({ mergeParams: true });

// Create a new board
router.post('/', auth, verifyId, createBoard);

// Get all boards
router.get('/', auth, verifyId, getBoards);

// Get board by ID
router.get('/:boardId', auth, verifyId, getBoardById);

// Update board by ID
router.put('/:boardId', auth, verifyId, updateBoardById);

// Delete board by ID
router.delete('/:boardId', auth, verifyId, deleteBoardById);

module.exports = router;
