// Objek deskripsi nilai untuk setiap kategori DREAD
const descriptions = {
    damage: [
        "1-3: Dampak sangat rendah (ketidaknyamanan kecil, tidak ada data penting rusak).",
        "4-6: Dampak sedang (beberapa data terganggu, sistem masih dapat berfungsi).",
        "7-9: Dampak tinggi (gangguan besar atau kerusakan data sensitif).",
        "10: Dampak sangat tinggi (kehancuran total atau kebocoran data kritis)."
    ],
    reproducibility: [
        "1-3: Sangat sulit direproduksi (memerlukan kondisi khusus).",
        "4-6: Cukup mudah direproduksi dengan usaha lebih.",
        "7-9: Mudah direproduksi (dapat diulangi dengan mudah).",
        "10: Sangat mudah direproduksi (ancaman dapat dieksploitasi kapan saja)."
    ],
    exploitability: [
        "1-3: Sangat sulit dieksploitasi (butuh banyak usaha atau akses khusus).",
        "4-6: Moderat (membutuhkan beberapa upaya teknis atau sumber daya).",
        "7-9: Mudah dieksploitasi (penyerang dapat dengan mudah memanfaatkan kelemahan).",
        "10: Sangat mudah dieksploitasi (hampir tanpa hambatan)."
    ],
    affected_users: [
        "1-3: Pengaruh sangat rendah (sedikit pengguna atau elemen sistem).",
        "4-6: Pengaruh moderat (sejumlah kecil pengguna atau komponen).",
        "7-9: Pengaruh tinggi (sebagian besar pengguna terkena dampak).",
        "10: Pengaruh sangat tinggi (semua pengguna atau seluruh sistem)."
    ],
    discoverability: [
        "1-3: Sangat sulit ditemukan (hanya dengan pemeriksaan mendalam).",
        "4-6: Moderat (dapat ditemukan dengan usaha, tidak langsung terlihat).",
        "7-9: Mudah ditemukan (ditemukan dengan pemeriksaan standar).",
        "10: Sangat mudah ditemukan (dapat ditemukan hampir tanpa usaha)."
    ]
};

// Fungsi untuk menampilkan deskripsi nilai yang dipilih
function showDescription(category, value) {
    const descriptionElement = document.getElementById(`${category}-description`);
    let descriptionText = "";

    if (value >= 1 && value <= 3) {
        descriptionText = descriptions[category][0];
    } else if (value >= 4 && value <= 6) {
        descriptionText = descriptions[category][1];
    } else if (value >= 7 && value <= 9) {
        descriptionText = descriptions[category][2];
    } else if (value == 10) {
        descriptionText = descriptions[category][3];
    }

    descriptionElement.innerText = descriptionText;
}

// Fungsi untuk menghitung risiko
// Objek mitigasi berdasarkan aset dan ancaman STRIDE
const mitigations = {
    server: {
        spoofing: {
            high: [
                "1. Terapkan otentikasi multifaktor (MFA) untuk semua akses admin.",
                "2. Gunakan sistem pengenalan pengguna yang kuat.",
                "3. Audit akses pengguna secara rutin."
            ],
            medium: [
                "1. Terapkan kebijakan password yang ketat.",
                "2. Gunakan protokol komunikasi yang aman seperti HTTPS.",
                "3. Implementasikan logging untuk semua aktivitas masuk."
            ],
            low: [
                "1. Perbarui perangkat lunak dan sistem secara berkala.",
                "2. Lakukan pemeriksaan keamanan berkala."
            ]
        },
        tampering: {
            high: [
                "1. Terapkan enkripsi data baik saat transit maupun saat disimpan.",
                "2. Gunakan kontrol akses berbasis peran (RBAC) untuk membatasi modifikasi.",
                "3. Lakukan audit keamanan secara berkala."
            ],
            medium: [
                "1. Terapkan checksum atau hash untuk memverifikasi integritas data.",
                "2. Batasi akses ke sistem hanya untuk pengguna yang berwenang."
            ],
            low: [
                "1. Monitor log aktivitas untuk mendeteksi perilaku yang mencurigakan.",
                "2. Edukasi pengguna tentang risiko dan tanda-tanda pencurian data."
            ]
        },
        repudiation: {
            high: [
                "1. Implementasikan logging yang komprehensif untuk semua transaksi.",
                "2. Pastikan log tidak dapat diubah atau dihapus oleh pengguna.",
                "3. Lakukan audit log secara rutin."
            ],
            medium: [
                "1. Berikan pelatihan kepada pengguna tentang tanggung jawab mereka.",
                "2. Gunakan tanda tangan digital untuk membuktikan identitas."
            ],
            low: [
                "1. Tetap perbarui kebijakan keamanan untuk mencakup tindakan penegakan.",
                "2. Monitoring sistem untuk mencegah tindakan yang tidak sah."
            ]
        },
        information_disclosure: {
            high: [
                "1. Terapkan enkripsi untuk semua data sensitif.",
                "2. Gunakan kontrol akses ketat untuk membatasi akses data.",
                "3. Lakukan audit akses data secara berkala."
            ],
            medium: [
                "1. Batasi pengungkapan informasi kepada pengguna berdasarkan kebutuhan.",
                "2. Implementasikan kebijakan privasi yang kuat."
            ],
            low: [
                "1. Edukasi pengguna tentang praktik keamanan informasi.",
                "2. Lakukan evaluasi risiko berkala."
            ]
        },
        dos: {
            high: [
                "1. Implementasikan solusi mitigasi DDoS.",
                "2. Lakukan pemantauan jaringan secara real-time.",
                "3. Gunakan firewall untuk mencegah serangan DoS."
            ],
            medium: [
                "1. Sediakan redundansi server untuk memastikan ketersediaan.",
                "2. Lakukan pembatasan laju untuk mencegah lonjakan lalu lintas."
            ],
            low: [
                "1. Pantau dan evaluasi lalu lintas secara rutin.",
                "2. Edukasi pengguna tentang pengaruh serangan DoS."
            ]
        },
        elevation_privilege: {
            high: [
                "1. Terapkan kontrol akses berbasis peran (RBAC).",
                "2. Lakukan audit izin pengguna secara berkala.",
                "3. Gunakan otentikasi multifaktor (MFA) untuk akses admin."
            ],
            medium: [
                "1. Batasi hak akses pengguna sesuai dengan peran mereka.",
                "2. Monitor perubahan hak akses secara rutin."
            ],
            low: [
                "1. Lakukan evaluasi berkala terhadap izin pengguna.",
                "2. Edukasi pengguna tentang konsekuensi penyalahgunaan hak akses."
            ]
        }
    },
    database: {
        spoofing: {
            high: [
                "1. Implementasikan otentikasi kuat untuk akses database.",
                "2. Gunakan enkripsi untuk komunikasi database.",
                "3. Audit akses database secara rutin."
            ],
            medium: [
                "1. Terapkan kebijakan password yang kuat untuk akun database.",
                "2. Batasi akses database hanya untuk IP terpercaya."
            ],
            low: [
                "1. Pantau log akses database untuk mendeteksi upaya spoofing.",
                "2. Perbarui sistem database secara teratur."
            ]
        },
        tampering: {
            high: [
                "1. Terapkan kontrol akses ketat untuk mencegah modifikasi data.",
                "2. Gunakan enkripsi untuk data sensitif dalam database.",
                "3. Lakukan audit keamanan data secara berkala."
            ],
            medium: [
                "1. Implementasikan mekanisme pengawasan untuk memonitor perubahan data.",
                "2. Gunakan hashing untuk memastikan integritas data."
            ],
            low: [
                "1. Edukasi pengguna tentang pentingnya melindungi data.",
                "2. Pastikan semua perangkat lunak database diperbarui."
            ]
        },
        repudiation: {
            high: [
                "1. Catat semua transaksi dan akses ke database.",
                "2. Pastikan catatan tidak dapat diubah oleh pengguna.",
                "3. Lakukan audit rutin pada log akses database."
            ],
            medium: [
                "1. Berikan pelatihan pada pengguna tentang pentingnya catatan.",
                "2. Gunakan tanda tangan digital untuk verifikasi transaksi."
            ],
            low: [
                "1. Tinjau dan perbarui kebijakan catatan secara berkala.",
                "2. Lakukan pemantauan sistem untuk mencegah penyalahgunaan."
            ]
        },
        information_disclosure: {
            high: [
                "1. Terapkan enkripsi untuk semua data sensitif di database.",
                "2. Gunakan kontrol akses untuk membatasi informasi yang diakses.",
                "3. Lakukan audit untuk memastikan kepatuhan kebijakan privasi."
            ],
            medium: [
                "1. Edukasi pengguna tentang pengungkapan informasi.",
                "2. Implementasikan kebijakan pengungkapan data yang jelas."
            ],
            low: [
                "1. Lakukan peninjauan reguler terhadap data yang disimpan.",
                "2. Pastikan semua data tidak lagi diperlukan dihapus dengan aman."
            ]
        },
        dos: {
            high: [
                "1. Gunakan solusi pengelolaan beban untuk menangani lonjakan lalu lintas.",
                "2. Terapkan firewall untuk melindungi dari serangan DoS.",
                "3. Lakukan pemantauan aktif terhadap lalu lintas database."
            ],
            medium: [
                "1. Sediakan server cadangan untuk memastikan ketersediaan.",
                "2. Batasi koneksi dari alamat IP yang mencurigakan."
            ],
            low: [
                "1. Pantau lalu lintas untuk mendeteksi pola serangan.",
                "2. Edukasi pengguna tentang risiko serangan DoS."
            ]
        },
        elevation_privilege: {
            high: [
                "1. Terapkan kontrol akses berbasis peran (RBAC) untuk pengguna database.",
                "2. Lakukan audit akses untuk mendeteksi penyalahgunaan.",
                "3. Gunakan otentikasi multifaktor (MFA) untuk akses admin database."
            ],
            medium: [
                "1. Batasi hak akses berdasarkan peran pengguna.",
                "2. Lakukan peninjauan izin secara berkala."
            ],
            low: [
                "1. Edukasi pengguna tentang konsekuensi dari penyalahgunaan hak akses.",
                "2. Tinjau dan perbarui kebijakan akses secara berkala."
            ]
        }
    },
    user_data: {
        spoofing: {
            high: [
                "1. Gunakan otentikasi multifaktor untuk akses data pengguna.",
                "2. Terapkan enkripsi untuk semua data pengguna saat transit.",
                "3. Audit akses data pengguna secara rutin."
            ],
            medium: [
                "1. Terapkan kebijakan password yang kuat untuk akun pengguna.",
                "2. Batasi akses data pengguna berdasarkan kebutuhan."
            ],
            low: [
                "1. Lakukan pemeriksaan berkala pada sistem untuk mendeteksi spoofing.",
                "2. Perbarui perangkat lunak secara teratur."
            ]
        },
        tampering: {
            high: [
                "1. Gunakan enkripsi untuk melindungi data pengguna.",
                "2. Terapkan kontrol akses ketat untuk mencegah perubahan data.",
                "3. Lakukan audit untuk memeriksa integritas data pengguna."
            ],
            medium: [
                "1. Implementasikan pengawasan untuk memantau perubahan data.",
                "2. Gunakan hashing untuk memverifikasi integritas data pengguna."
            ],
            low: [
                "1. Edukasi pengguna tentang pentingnya melindungi data mereka.",
                "2. Pastikan semua perangkat lunak terkait pengguna diperbarui."
            ]
        },
        repudiation: {
            high: [
                "1. Catat semua interaksi pengguna dengan sistem.",
                "2. Pastikan catatan tidak dapat diubah oleh pengguna.",
                "3. Lakukan audit log secara rutin."
            ],
            medium: [
                "1. Berikan pelatihan kepada pengguna tentang tanggung jawab mereka.",
                "2. Gunakan tanda tangan digital untuk transaksi penting."
            ],
            low: [
                "1. Tinjau dan perbarui kebijakan pencatatan secara berkala.",
                "2. Lakukan pemantauan untuk mencegah penyalahgunaan."
            ]
        },
        information_disclosure: {
            high: [
                "1. Terapkan enkripsi untuk semua data pengguna.",
                "2. Gunakan kontrol akses ketat untuk membatasi akses ke data pengguna.",
                "3. Lakukan audit akses data secara berkala."
            ],
            medium: [
                "1. Batasi pengungkapan informasi kepada pengguna berdasarkan kebutuhan.",
                "2. Implementasikan kebijakan privasi yang kuat."
            ],
            low: [
                "1. Edukasi pengguna tentang praktik keamanan informasi.",
                "2. Lakukan evaluasi risiko berkala."
            ]
        },
        dos: {
            high: [
                "1. Implementasikan solusi mitigasi DDoS untuk melindungi data pengguna.",
                "2. Gunakan firewall untuk mencegah serangan DoS.",
                "3. Lakukan pemantauan aktif terhadap lalu lintas akses data."
            ],
            medium: [
                "1. Sediakan redundansi server untuk memastikan ketersediaan akses data.",
                "2. Lakukan pembatasan laju untuk mencegah serangan DoS."
            ],
            low: [
                "1. Pantau dan evaluasi lalu lintas secara rutin.",
                "2. Edukasi pengguna tentang pengaruh serangan DoS."
            ]
        },
        elevation_privilege: {
            high: [
                "1. Terapkan kontrol akses berbasis peran (RBAC) untuk data pengguna.",
                "2. Lakukan audit izin pengguna secara berkala.",
                "3. Gunakan otentikasi multifaktor (MFA) untuk akses ke data sensitif."
            ],
            medium: [
                "1. Batasi hak akses pengguna sesuai dengan peran mereka.",
                "2. Monitor perubahan hak akses secara rutin."
            ],
            low: [
                "1. Lakukan evaluasi berkala terhadap izin pengguna.",
                "2. Edukasi pengguna tentang konsekuensi penyalahgunaan hak akses."
            ]
        }
    },
    external_api: {
        spoofing: {
            high: [
                "1. Terapkan otentikasi kuat untuk akses ke API.",
                "2. Gunakan enkripsi untuk semua komunikasi dengan API.",
                "3. Audit akses API secara rutin."
            ],
            medium: [
                "1. Terapkan kebijakan kunci API yang ketat.",
                "2. Batasi akses ke API hanya untuk IP terpercaya."
            ],
            low: [
                "1. Pantau log akses API untuk mendeteksi upaya spoofing.",
                "2. Perbarui dokumentasi API secara teratur."
            ]
        },
        tampering: {
            high: [
                "1. Gunakan enkripsi untuk melindungi data yang ditransfer melalui API.",
                "2. Terapkan kontrol akses untuk mencegah modifikasi data.",
                "3. Lakukan audit keamanan API secara berkala."
            ],
            medium: [
                "1. Implementasikan pengawasan untuk memantau perubahan data melalui API.",
                "2. Gunakan hashing untuk memastikan integritas data yang dikirim."
            ],
            low: [
                "1. Edukasi pengguna tentang pentingnya melindungi data API.",
                "2. Pastikan semua perangkat lunak terkait API diperbarui."
            ]
        },
        repudiation: {
            high: [
                "1. Catat semua interaksi dengan API.",
                "2. Pastikan log tidak dapat diubah oleh pengguna.",
                "3. Lakukan audit log akses API secara rutin."
            ],
            medium: [
                "1. Berikan pelatihan kepada pengguna tentang pentingnya catatan API.",
                "2. Gunakan tanda tangan digital untuk transaksi API yang penting."
            ],
            low: [
                "1. Tinjau dan perbarui kebijakan pencatatan API secara berkala.",
                "2. Lakukan pemantauan untuk mencegah penyalahgunaan."
            ]
        },
        information_disclosure: {
            high: [
                "1. Terapkan enkripsi untuk semua data sensitif dalam API.",
                "2. Gunakan kontrol akses ketat untuk membatasi akses ke API.",
                "3. Lakukan audit akses API secara berkala."
            ],
            medium: [
                "1. Batasi pengungkapan informasi kepada pengguna berdasarkan kebutuhan.",
                "2. Implementasikan kebijakan privasi yang kuat untuk data API."
            ],
            low: [
                "1. Edukasi pengguna tentang praktik keamanan API.",
                "2. Lakukan evaluasi risiko berkala untuk API."
            ]
        },
        dos: {
            high: [
                "1. Gunakan solusi mitigasi DDoS untuk API.",
                "2. Terapkan firewall untuk melindungi API dari serangan DoS.",
                "3. Lakukan pemantauan aktif terhadap lalu lintas API."
            ],
            medium: [
                "1. Sediakan redundansi server untuk memastikan ketersediaan API.",
                "2. Lakukan pembatasan laju untuk mencegah serangan DoS pada API."
            ],
            low: [
                "1. Pantau dan evaluasi lalu lintas API secara rutin.",
                "2. Edukasi pengguna tentang pengaruh serangan DoS."
            ]
        },
        elevation_privilege: {
            high: [
                "1. Terapkan kontrol akses berbasis peran (RBAC) untuk API.",
                "2. Lakukan audit izin akses API secara berkala.",
                "3. Gunakan otentikasi multifaktor (MFA) untuk akses ke API sensitif."
            ],
            medium: [
                "1. Batasi hak akses pengguna sesuai dengan peran mereka dalam API.",
                "2. Monitor perubahan hak akses API secara rutin."
            ],
            low: [
                "1. Lakukan evaluasi berkala terhadap izin akses API.",
                "2. Edukasi pengguna tentang konsekuensi penyalahgunaan hak akses API."
            ]
        }
    }
};



// Fungsi untuk menghitung risiko
function calculateRisk() {
    const asset = document.getElementById("asset").value;
    const threat = document.getElementById("threat").value;
    const damage = parseInt(document.getElementById("damage").value);
    const reproducibility = parseInt(document.getElementById("reproducibility").value);
    const exploitability = parseInt(document.getElementById("exploitability").value);
    const affectedUsers = parseInt(document.getElementById("affected_users").value);
    const discoverability = parseInt(document.getElementById("discoverability").value);
    
    const totalScore = damage + reproducibility + exploitability + affectedUsers + discoverability;
    document.getElementById("riskScore").innerText = `Total Skor Risiko untuk ${asset} dengan ancaman ${threat}: ${totalScore}`;

    // Rekomendasi mitigasi berdasarkan total skor
    let mitigation;
    let mitigationSteps = [];
    
    // Menentukan tingkat mitigasi berdasarkan skor
    if (totalScore >= 40) {
        mitigation = "Prioritas Tinggi: Ancaman yang sangat signifikan.";
        mitigationSteps = mitigations[asset][threat].high;
    } else if (totalScore >= 30) {
        mitigation = "Prioritas Sedang: Ancaman yang memerlukan perhatian.";
        mitigationSteps = mitigations[asset][threat].medium;
    } else if (totalScore >= 20) {
        mitigation = "Prioritas Rendah: Ancaman yang dapat dikelola.";
        mitigationSteps = mitigations[asset][threat].low;
    } else {
        mitigation = "Risiko Minimal: Sistem relatif aman.";
        mitigationSteps = ["1. Lanjutkan pemantauan keamanan secara rutin.", "2. Tingkatkan kesadaran keamanan di antara pengguna."];
    }

    // Menampilkan rekomendasi mitigasi
    document.getElementById("mitigation").innerText = `${mitigation}\n\nmitigasi risiko\n${mitigationSteps.join("\n")}`;
}




// Fungsi untuk mereset formulir
function resetForm() {
    document.getElementById("asset").selectedIndex = 0;
    document.getElementById("threat").selectedIndex = 0;
    document.getElementById("damage").value = '';
    document.getElementById("reproducibility").value = '';
    document.getElementById("exploitability").value = '';
    document.getElementById("affected_users").value = '';
    document.getElementById("discoverability").value = '';

    // Reset deskripsi
    const descriptions = document.querySelectorAll(".description");
    descriptions.forEach(desc => desc.innerText = '');

    document.getElementById("riskScore").innerText = '';
    document.getElementById("mitigation").innerText = '';
}
