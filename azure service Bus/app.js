const { ServiceBusClient } = require("@azure/service-bus"); 

// Define connection string and related Service Bus entity names here
const connectionString = "Endpoint=sb://nineleapswo.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=46yWvOai8z7LQifkxht32yFq7zHsRKTH/Uy+4froWPc=";
const queueName = "WO"; 

async function main(){
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString); 
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  try {
    for (let i = 0; i < 10; i++) {
      const message= {
        body: `Hello world! ${i}`,
        to:'+918920028634',
        label: `test`,
        userProperties: {
            myCustomPropertyName: `my custom property value ${i}`
       }
      };
      console.log(`Sending message: ${message.body}`);
      await sender.send(message);
    }

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});