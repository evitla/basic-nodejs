const fsPromises = require('fs/promises');
const { exec } = require('child_process');

const main = require('./main');
const path = require('path');

const CRLF = Buffer.from('0d0a', 'hex').toString();

describe('Testing success scenarios', () => {
  it('should cipher text according to "C1-C1-R0-A" config', async () => {
    const output = './output-test-1.txt';
    const dest = path.join(__dirname, output);
    const commands = `node my_ciphering_cli -c C1-C1-R0-A -i ./input.txt -o ${output}`;
    await fsPromises.writeFile(dest, '', 'utf-8');
    await main(commands.split(' '));
    const text = await fsPromises.readFile(dest, 'utf-8');

    expect(text).toBe('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!' + CRLF);
    await fsPromises.unlink(dest);
  });

  it('should cipher text according to "C1-C0-A-R1-R0-A-R0-R0-C1-A" config', async () => {
    const output = './output-test-2.txt';
    const dest = path.join(__dirname, output);
    const commands = `node my_ciphering_cli --config C1-C0-A-R1-R0-A-R0-R0-C1-A -i ./input.txt -o ${output}`;
    await fsPromises.writeFile(dest, '', 'utf-8');
    await main(commands.split(' '));
    const text = await fsPromises.readFile(dest, 'utf-8');

    expect(text).toBe('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!' + CRLF);
    await fsPromises.unlink(dest);
  });

  it('should cipher text according to "A-A-A-R1-R0-R0-R0-C1-C1-A" config', async () => {
    const output = './output-test-3.txt';
    const dest = path.join(__dirname, output);
    const commands = `node my_ciphering_cli -c A-A-A-R1-R0-R0-R0-C1-C1-A --input ./input.txt -o ${output}`;
    await fsPromises.writeFile(dest, '', 'utf-8');
    await main(commands.split(' '));
    const text = await fsPromises.readFile(dest, 'utf-8');

    expect(text).toBe('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!' + CRLF);
    await fsPromises.unlink(dest);
  });

  it('should cipher text according to "C1-R1-C0-C0-A-R0-R1-R1-A-C1" config', async () => {
    const output = './output-test-4.txt';
    const dest = path.join(__dirname, output);
    const commands = `node my_ciphering_cli -c C1-R1-C0-C0-A-R0-R1-R1-A-C1 -i ./input.txt --output ${output}`;
    await fsPromises.writeFile(dest, '', 'utf-8');
    await main(commands.split(' '));
    const text = await fsPromises.readFile(dest, 'utf-8');

    expect(text).toBe('This is secret. Message about "_" symbol!' + CRLF);
    await fsPromises.unlink(dest);
  });
});

describe('Testing error scenarios', () => {
  it('should handle an error if cli argument passed twice', () => {
    exec('node my_ciphering_cli -c C1 -c R0', (err, stdout, stderr) => {
      expect(stderr).toBe('InvalidArgumentError: "-c/--config" found multiple argument.\n');
    });
  });

  it('should handle an error if cli argument passed twice', () => {
    exec('node my_ciphering_cli -c C1 --config R0', (err, stdout, stderr) => {
      expect(stderr).toBe('InvalidArgumentError: "-c/--config" found multiple argument.\n');
    });
  });

  it('should handle an error if -c or --config is not passed', () => {
    exec('node my_ciphering_cli -i input.txt', (err, stdout, stderr) => {
      expect(stderr).toBe('InvalidArgumentError: Config not found\n');
    });
  });

  it('should handle an error if -c or --config argument is not valid', () => {
    exec('node my_ciphering_cli --config R0-A0-A', (err, stdout, stderr) => {
      expect(stderr).toBe('InvalidArgumentError: "A0" cipher mark not found\n');
    });
  });

  it('should handle an error if input file not found or accesible', () => {
    const nonExistingFile = './inputs.txt';
    const nonExistingSrc = path.join(__dirname, nonExistingFile);
    exec(`node my_ciphering_cli -i ${nonExistingFile}`, (err, stdout, stderr) => {
      expect(stderr).toBe(
        `FileNotFoundError: "${nonExistingSrc}" doesn't exist or no permission to read/write.\n`,
      );
    });
  });

  it('should handle an error if output file not found or accesible', () => {
    const nonExistingFile = './outputs.txt';
    const nonExistingDest = path.join(__dirname, nonExistingFile);
    exec(`node my_ciphering_cli -i ${nonExistingFile}`, (err, stdout, stderr) => {
      expect(stderr).toBe(
        `FileNotFoundError: "${nonExistingDest}" doesn't exist or no permission to read/write.\n`,
      );
    });
  });
});
