import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Logging function
function logMessage(message: string) {
    const now = new Date();
    const timestamp = `${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}_${now.getMonth() + 1}_${now.getDate()}_${now.getFullYear()}.log`;
    fs.appendFileSync(timestamp, `${message}\n`);
}

// Hash function
function createHash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Encryption function
function encrypt(text: string, password: string): string {
    const algorithm = 'aes-192-cbc';
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ":" + encrypted;
}

// Decryption function
function decrypt(encryptedText: string, password: string): string {
    const algorithm = 'aes-192-cbc';
    const key = crypto.scryptSync(password, 'salt', 24);
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Handle file encryption and decryption
function processFile(filePath: string, password: string, mode: 'encrypt' | 'decrypt') {
    try {
        logMessage(`Mulai ${mode === 'encrypt' ? 'mengenkripsi' : 'mendekripsi'} file ${filePath}`);

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const result = mode === 'encrypt'
            ? encrypt(fileContent, password)
            : decrypt(fileContent, password);

        const ext = path.extname(filePath);
        const newFilePath = mode === 'encrypt'
            ? filePath.replace(ext, '_encrypted' + ext)
            : filePath.replace(ext, '_decrypted' + ext); // Change made here

        fs.writeFileSync(newFilePath, result);
        logMessage(`Berhasil ${mode === 'encrypt' ? 'mengenkripsi' : 'mendekripsi'} file ${filePath}`);
        console.log(`File '${filePath}' berhasil di${mode} menjadi '${newFilePath}'`);
    } catch (error) {
        const errorAsError = error as Error;
        logMessage(`Error ketika ${mode === 'encrypt' ? 'mengenkripsi' : 'mendekripsi'} file: ${errorAsError.message}`);
        console.error(`Error: ${errorAsError.message}`);
        process.exit(1);
    }
}


const command = process.argv[2]; 
const filePath = process.argv[3]; 
const password = process.argv[4];

if (!command || !filePath || !password) {
    console.error('Please provide the correct command: encrypt/decrypt, file path, and password.');
    process.exit(1);
}

if (command === 'encrypt' || command === 'decrypt') {
    processFile(filePath, password, command as 'encrypt' | 'decrypt');
} else {
    console.error('Invalid command. Use "encrypt" or "decrypt".');
}
