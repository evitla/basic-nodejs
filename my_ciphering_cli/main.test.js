const main = require('./main');
const handleError = require('./error-handler');

describe('Testing main', () => {
  it('should not throw an error if all arguments are valid', async () => {
    await main(['-c', 'C1', '-i', './input.txt', '-o', './output.txt']);
    await main(['-c', 'C1']);
    await main(['--config', 'C1']);
  });

  it('should exit with code 1 if cli argument passed twice', () => {
    main(['-c', 'C1', '-c', 'R0-A']).catch((err) => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
      handleError(err);
      expect(mockExit).toHaveBeenCalledWith(1);
      process.exit.mockRestore();
    });
  });

  it('should exit with code 1 if -c or --config is not passed', () => {
    main(['-i', './input.txt']).catch((err) => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
      handleError(err);
      expect(mockExit).toHaveBeenCalledWith(1);
      process.exit.mockRestore();
    });
  });

  it('should exit with code 1 if -c or --config argument is not valid', () => {
    main(['-c', 'C2']).catch((err) => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
      handleError(err);
      expect(mockExit).toHaveBeenCalledWith(1);
      process.exit.mockRestore();
    });
  });

  it('should exit with code 1 if input file not found or accesible', () => {
    const nonExistingFile = './inputs.txt';
    main(['-c', 'C1', '-i', nonExistingFile]).catch((err) => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
      handleError(err);
      expect(mockExit).toHaveBeenCalledWith(1);
      process.exit.mockRestore();
    });
  });

  it('should exit with code 1 if output file not found or accesible', () => {
    const nonExistingFile = './outputs.txt';
    main(['-c', 'C1', '-o', nonExistingFile]).catch((err) => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
      handleError(err);
      expect(mockExit).toHaveBeenCalledWith(1);
      process.exit.mockRestore();
    });
  });
});
