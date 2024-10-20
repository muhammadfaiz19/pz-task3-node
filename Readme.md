# Task3 - ProductZilla - NodeJs 

## file test.txt
![LOGO](https://github.com/muhammadfaiz19/pz-task3-node/blob/main/img/test.png)

## Encrypt
```bash
$ ts-node index.ts encrypt ./test.txt myPassword
```
![LOGO](https://github.com/muhammadfaiz19/pz-task3-node/blob/main/img/test-encrypted.png)

File 'test.txt' berhasil dienkripsi menjadi 'test_encrypted.txt'

## Decrypt
``` bash
$ ts-node index.ts decrypt ./test_encrypted.txt myPassword
```
![LOGO](https://github.com/muhammadfaiz19/pz-task3-node/blob/main/img/test-encrypted-decrypted.png)

File 'test_encrypted.txt' berhasil didekripsi menjadi 'test_decrypted.txt'

``` bash
$ ts-node index.ts decrypt ./test_encrypted.txt wrongPassword
````
Error: Password yang dimasukkan salah
