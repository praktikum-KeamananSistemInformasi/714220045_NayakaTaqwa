
// Fungsi untuk enkripsi AES
function encryptAES(message, key) {
    return CryptoJS.AES.encrypt(message, key).toString();
}

// Fungsi untuk dekripsi AES
function decryptAES(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Fungsi untuk enkripsi DES
function encryptDES(message, key) {
    return CryptoJS.TripleDES.encrypt(message, key).toString();
}

// Fungsi untuk dekripsi DES
function decryptDES(ciphertext, key) {
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Fungsi untuk menangani form submit
document.getElementById('cryptoForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form mengirimkan data secara normal

    // Ambil nilai input dari form
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;
    const algorithm = document.getElementById('algorithm').value;
    const action = document.getElementById('action').value;

    let result = '';

    try {
        // Cek apakah key valid
        if ((algorithm === 'aes' && key.length !== 16) || (algorithm === 'des' && key.length !== 24)) {
            throw new Error('Panjang kunci tidak valid.');
        }

        // Proses berdasarkan aksi (Encrypt atau Decrypt)
        if (action === 'encrypt') {
            if (algorithm === 'aes') {
                result = encryptAES(message, key);
            } else if (algorithm === 'des') {
                result = encryptDES(message, key);
            }
        } else if (action === 'decrypt') {
            if (algorithm === 'aes') {
                result = decryptAES(message, key);
            } else if (algorithm === 'des') {
                result = decryptDES(message, key);
            }
        }

        // Tampilkan hasil di area resultArea
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        resultArea.innerHTML = `${result}`;

    } catch (error) {
        // Tampilkan pesan error
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        resultArea.classList.add('alert-danger');
        resultArea.classList.remove('alert-info');
        resultArea.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
});
