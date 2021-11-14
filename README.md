# Ciphering CLI Tool

## Ciphering CLI tool encodes and decodes a text by 3 substitution ciphers:

- [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
- [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

CLI tool accepts 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
    Config is a string with pattern `{XY(-)}n`, where:

- `X` is a cipher mark:
  - `C` is for Caesar cipher (with shift 1)
  - `A` is for Atbash cipher
  - `R` is for ROT-8 cipher
- `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
  - `1` is for encoding
  - `0` is for decoding

2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

## Details:

1. CLI tool uses **pure Node.js**.
2. `Config` option is required and should be validated. In case of invalid config `InvalidArgumentError` will be thrown and the process will end.
3. If any option is duplicated (i.e. `bash $ node my_ciphering_cli -c C1-C1-A-R0 -c C0`) then `InvalidArgumentError` will be thrown and the process will end.
4. If the input file option is missed - write your text to encode/decode in the console.
5. If the output file option is missed - your encoded/decoded text will be printed in the console.
6. If the input and/or output file is given but doesn't exist or you can't access it (e.g. because of permissions or it's a directory) - `FileNotFoundError` will be thrown and the process will end.
7. If passed params are fine the output (file or console) should contain transformed content of input (file or console).
8. For encoding/decoding **use only the English alphabet**, all other characters will be kept untouched.
9. CLI tool uses `streams` for reading, writing and transformation of text.
10. Each cipher is implemented in the form of a **transform stream**.
11. Streams are piped inside each other according to `config`.

**Usage example:**

```bash
$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`
