const fs = require("fs");

fs.mkdirSync("allure-results",  { recursive: true });

fs.writeFileSync("allure-results/executor.json",
    JSON.stringify({
        name: "Teste",
        type: "Teste",
        buildOrder: Date.now(),
        buildName: `Run ${new Date().toLocaleDateString("pt-br")}`
    }, null, 2));

console.log("executor.json criado");