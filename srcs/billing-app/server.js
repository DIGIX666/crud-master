// const { exec } = require('child_process');

// // Function to start the Flask Billing API
// function startBillingApi() {
//   exec('pm2 start python3 --name billing-api -- app/__init__.py -- start_billing_service', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting Billing API: ${err.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`STDERR: ${stderr}`);
//     }
//     console.log(`STDOUT: ${stdout}`);
//   });
// }

// // Function to start the RabbitMQ listener
// function startRabbitMQListener() {
//   exec('pm2 start python3 --name rabbitmq-listener -- app/__init__.py -- start_rabbitmq_listener', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting RabbitMQ Listener: ${err.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`STDERR: ${stderr}`);
//     }
//     console.log(`STDOUT: ${stdout}`);
//   });
// }

// // Function to stop the Billing API
// function stopBillingApi() {
//   exec('pm2 stop billing-api', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error stopping Billing API: ${err.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`STDERR: ${stderr}`);
//     }
//     console.log(`STDOUT: ${stdout}`);
//   });
// }

// // Function to stop the RabbitMQ listener
// function stopRabbitMQListener() {
//   exec('pm2 stop rabbitmq-listener', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error stopping RabbitMQ Listener: ${err.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`STDERR: ${stderr}`);
//     }
//     console.log(`STDOUT: ${stdout}`);
//   });
// }

// // Function to restart both services
// function restartAll() {
//   stopBillingApi();
//   stopRabbitMQListener();
//   startBillingApi();
//   startRabbitMQListener();
// }

// // Start both services when the script runs
// startBillingApi();
// startRabbitMQListener();

// // Export functions if needed elsewhere
// module.exports = {
//   startBillingApi,
//   startRabbitMQListener,
//   stopBillingApi,
//   stopRabbitMQListener,
//   restartAll
// };



const { exec } = require('child_process');

// Function to start the Flask Billing API
function startBillingApi() {
  exec('pm2 start python3 --name billing-api -- app/__init__.py -- start_billing_service', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting Billing API: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Function to start the RabbitMQ listener
function startRabbitMQListener() {
  exec('pm2 start python3 --name rabbitmq-listener -- app/__init__.py -- start_rabbitmq_listener', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting RabbitMQ Listener: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Function to stop the Billing API
function stopBillingApi() {
  exec('pm2 stop billing-api', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error stopping Billing API: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Function to stop the RabbitMQ listener
function stopRabbitMQListener() {
  exec('pm2 stop rabbitmq-listener', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error stopping RabbitMQ Listener: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`STDERR: ${stderr}`);
    }
    console.log(`STDOUT: ${stdout}`);
  });
}

// Function to restart both services
function restartAll() {
  stopBillingApi();
  stopRabbitMQListener();
  startBillingApi();
  startRabbitMQListener();
}

// Start both services when the script runs
startBillingApi();
startRabbitMQListener();

// Export functions if needed elsewhere
module.exports = {
  startBillingApi,
  startRabbitMQListener,
  stopBillingApi,
  stopRabbitMQListener,
  restartAll
};
