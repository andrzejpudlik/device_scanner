const si = require('systeminformation');

exports.getCpuData = async (req, res) => {
  const cpuData = await si.cpu()
  res.status(200).json(cpuData)
  console.log(cpuData);
}

exports.getGpuData = async (req, res) => {
  const gpuData = await si.graphics()
  res.status(200).send(gpuData)
  console.log(gpuData);
}

exports.getMemoryData = async (req, res) => {
  const memoryData = await si.mem()
  res.status(200).send(memoryData)
}

exports.getOsData = async (req, res) => {
  const osData = await si.osInfo()
  res.status(200).send(osData)
  console.log(osData);
}

exports.getDiskData = async (req, res) => {
  const diskData = await si.diskLayout()
  res.status(200).send(diskData)
}

exports.getBatteryData = async (req, res) => {
  const batteryData = await si.battery()
  res.status(200).send(batteryData)
}

exports.getNetworkData = async (req, res) => {
  const networkData = await si.networkInterfaces()
  res.status(200).send(networkData)
}