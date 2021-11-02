const express = require('express');
const controller = require('./constroller');

const router = express.Router();

router.get('/cpu', controller.getCpuData);

router.get('/graphic', controller.getGpuData)

router.get('/memory', controller.getMemoryData)

router.get('/os', controller.getOsData)

router.get('/disk', controller.getDiskData)

router.get('/battery', controller.getBatteryData)

router.get('/usb', controller.getUsbData)

router.get('/network', controller.getNetworkData)


module.exports = router