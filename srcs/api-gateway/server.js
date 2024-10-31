const { exec } = require('child_process');

// Function to start the Python API Gateway
function startApiGateway() {
  exec('pm2 start python3 --name api-gateway -- app/__init__.py', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting API Gateway: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Function to stop the Python API Gateway
function stopApiGateway() {
  exec('pm2 stop api-gateway', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error stopping API Gateway: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Function to restart the Python API Gateway
function restartApiGateway() {
  exec('pm2 restart api-gateway', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error restarting API Gateway: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Start the gateway when the script runs
startApiGateway();

// Export the functions if needed elsewhere
module.exports = {
  startApiGateway,
  stopApiGateway,
  restartApiGateway
};
