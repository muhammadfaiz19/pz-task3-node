Task3 - ProductZilla - NodeJs 


$ ts-node index.ts encrypt ./test.txt myPassword
File 'test.txt' berhasil dienkripsi menjadi 'test_encrypted.txt'

$ ts-node index.ts decrypt ./test_encrypted.txt myPassword
File 'test_encrypted.txt' berhasil didekripsi menjadi 'test_decrypted.txt'

$ ts-node index.ts decrypt ./test_encrypted.txt wrongPassword
Error: Password yang dimasukkan salah
