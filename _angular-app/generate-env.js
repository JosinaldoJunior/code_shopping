const fs = require('fs');
const path =  require('path');

const envsPath = "srs/environments";
const envMockDev = path.join(envsPath, 'environment.mock_dev.ts');
const envMockProd = path.join(envsPath, 'environment.mock_prod.ts');

const envDev = path.join(envsPath, 'environment.ts');
const envProd = path.join(envsPath, 'environment.prod.ts');

fs.createReadStream(envMockDev)
	.pipe(fs.createWriteStream(envDev));

fs.createReadStream(envMockProd)
	.pipe(fs.createWriteStream(envProd));
