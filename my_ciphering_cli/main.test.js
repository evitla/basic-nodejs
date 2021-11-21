const main = require('./main');
const handleError = require('./error-handler');

describe('Testing main', () => {
  it('should not throw an error', async () => {
    await main(['-c', 'C1', '-i', './input.txt', '-o', './output.txt']);
    await main(['-c', 'C1']);
    await main(['--config', 'C1']);
  });

  it('should exit with code 1', () => {
    main(['-c', 'C2']).catch((err) => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
      handleError(err);
      expect(mockExit).toHaveBeenCalledWith(1);
      process.exit.mockRestore();
    });
  });
});
