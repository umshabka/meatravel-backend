import express from 'express';
import {
  createCutomiseTrip,
  getCutomiseTrips,
  getCutomiseTripById,
  updateCutomiseTripById,
  deleteCutomiseTripById,
  downloadBookingsExcel
} from '../controllers/cutomiseTripController.js';

const router = express.Router();

// Routes
router.post('/', createCutomiseTrip);
router.get('/downloadExcelSheet', downloadBookingsExcel);
router.get('/', getCutomiseTrips);
router.get('/:id', getCutomiseTripById);
router.put('/:id', updateCutomiseTripById);
router.delete('/:id', deleteCutomiseTripById);

export default router;
