# Monochromacy

Aplikasi web untuk membantu penderita buta warna

Project Senior TI
Departemen Teknologi Elektro dan Teknologi Informasi, Fakultas Teknik, Universitas Gadjah Mada

---

**Nama Kelompok:** Daredevil  
**Ketua:** Firdaus Bisma Suryakusuma - 19/444051/TK/49247 (Software Engineer)  
**Anggota:**
Abdurikho Min Khoiri - 19/440885/TK/48679 (Cloud Engineer)
Fathan Hudyaussie Santoso - 19/446776/TK/49881 (AI Engineer)
Tsalis Amalia - 19/444075/TK/49271 (UI UX Designer)

---

## PERUMUSAN PERMASALAHAN 
Nama Produk: Monochromacy 
Jenis Produk: Aplikasi Web 

### Permasalahan yang dipecahkan 

#### Latar Belakang
Buta warna merupakan kelainan yang dimiliki seseorang yang tidak mampu melihat warna objek seperti yang dilihat oleh orang normal. penderita buta warna di Indonesia sendiri tidak sedikit. setidaknya ada 0,7% dari 255 juta warga indonesia menderita buta warna. akan tetapi, banyak pekerjaan yang mensyaratkan pegawainya bukan merupakan penderita buta warna. Dalam masalah ini, terjadi diskriminasi terhadap para penderita buta warna dalam memperoleh hak mendapatkan pekerjaan. Misalnya dalam tes kedinasan terdapat beberapa tahapan tes yang harus dilakukan dan salah satunya adalah tes buta warna. Seseorang yang menderita buta warna akan otomatis gugur karena kelainan yang dimiliki meski dalam tes lain dia unggul. selain dalam hal mendapatkan pekerjaan, terkadang seorang penderita buta warna sendiri merasa minder dan menyembunyikan kelainan yang dimiliki tersebut agar tidak direndahkan dalam lingkungannya 

#### Rumusan Permasalahan
* Bagaimana cara mengidentifikasi warna suatu objek menggunakan machine learning? 
* Bagaimana cara mengidentifikasi seseorang yang mengidap penyakit buta warna menggunakan machine learning? 
* Bagaimana cara menjelaskan hasil dari identifikasi warna objek pada pengidap buta warna? 
* Bagaimana solusi untuk meningkatkan kesadaran masyarakat akan pengidap penyakit buta warna serta penanganan terhadap pengidap itu sendiri? 

#### Daftar Pustaka: 
* https://docplayer.info/213572003-Perancangan-sistem-deteksi-warna-untuk-membantu-orang-buta-warna-berbasis-machine-learning-menggunakan-tensorflow-i-putu-ari-susila.html 

#### Ide solusi yang diusulkan beserta rancangan fitur  
Sebuah website untuk mendeteksi warna dari sebuah benda berdasarkan input dari kamera maupun file foto. 

#### Rancangan Fitur Solusi

|Fitur|Keterangan|
|---|---|
|Color Object Detector|Mengidentifikasi warna dari suatu objek|
|Color blind detector|Mengidentifikasi apakah pengguna merupakan pengidap buta warna atau tidak|
|Artikel|Memberikan bahan bacaan seputar penyakit buta warna dan penanganan yang dapat dilakukan|
|Deteksi objek otomatis|End user tidak perlu menunjuk ke objek yang ingin diketahui warnanya secara manual|
|Offline-available|Dapat diimplementasikan dengan teknologi Progressive Web Apps (PWA) sehingga aplikasi web tetap dapat diakses meskipun end user tidak memiliki koneksi ke internet| 

### Analisis Kompetitor (Minimal 3 Kompetitor) 

#### KOMPETITOR 1 (Color Blind Pal)
* Jenis Kompetitor: Direct competitor  
* Jenis Produk: Aplikasi asistensi penderita buta warna  
* Target Customer: Penderita buta warna 

|Kelebihan|Kekurangan|
|---|---|
|Dapat menampilkan berbagai jenis nama untuk warna (common, scientific & colloquial names)|Tidak ada fitur object detection sehingga deteksi warna cukup merepotkan karena perlu menunjukkan kamera ke masing – masing objek|
|Dapat mengaktifkan flash pada smartphone untuk mengatasi kondisi pencahayaan kurang|Hanya tersedia untuk iOS, Android dan Mac|

**Key Competitive Advantage & Unique Value:** Aplikasi Color Blind Pal lebih cocok untuk membantu penderita buta warna untuk membaca diagram yang kurang ramah untuk penderita buta warna

#### KOMPETITOR 2 (Chromatic Glass)
* Jenis Kompetitor: Direct Competitors 
* Jenis Produk: Aplikasi asistensi penderita buta warna 
* Target Customer: Penderita buta warna 

|Kelebihan|Kekurangan|
|---|---|
|User interface yang sangat sederhana|Hanya tersedia di iOS|
|Dapat men-pinpoint secara lebih akurat titik yang ingin dicari warnanya|Hanya menerima input gambar dari kamera|

**Key Competitive Advantage & Unique Value:** Memiliki user interface yang sederhana sehingga mudah digunakan oleh orang awam

#### KOMPETITOR 3 (Colorblind Avenger)
* Jenis Kompetitor: Direct competitor 
* Jenis Produk: Aplikasi asistensi penderita buta warna 
* Target Customer: Penderita buta warna 

|Kelebihan|Kekurangan|
|---|---|
|User interface yang sangat sederhana|Tidak ada fitur object detection sehingga deteksi warna cukup merepotkan karena perlu menunjukkan kamera ke masing – masing objek|
|Dapat men-pinpoint secara lebih akurat titik yang ingin dicari warnanya|Tidak ada fitur pengujian buta warna|
| |Hanya tersedia untuk iOS|

**Key Competitive Advantage & Unique Value:** Aplikasi Colorblind Avenger memiliki user interface yang sangat intuitif, sederhana dan mudah digunakan
