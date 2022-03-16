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

## SDLC  
**Metodologi yang digunakan :** AGILE  
**Alasan Pemilihan metodologi :** Agile adalah sekumpulan metode pengembangan software yang dilakukan secara bertahap dan berulang (iterasi). Dengan Agile, kami dapat dengan cepat menerapkan setiap feedback dari konsumen di iterasi selanjutnya. Baik itu tentang penambahan fitur atau memperbaiki bug. Agile mempunyai iterasi rutin yang fokus pada pengembangan bertahap. Jadi, pengembangan software kami akan lebih terprediksi, sehingga bisa mengetahui berbagai pengeluaran / output dengan baik.  

### Perancangan
**Tujuan Produk :** Tujuan dari produk kami adalah untuk membantu orang yang ingin mengetahui apakah mereka menderita buta warna atau tidak. Selain itu produk kami juga memiliki tujuan untuk membantu para penderita buta warna untuk mengenali warna dari suatu objek.  

**Pengguna potensial dari produk dan kebutuhan para pengguna tersebut :** Pengguna dari aplikasi kami adalah mereka yang memiliki kelainan dalam melihat warna suatu objek. Selain itu juga mereka yang ingin mengetahui apakah dirinya memiliki kelainan buta warna atau tidak. Kebutuhan dari penggunanya adalah mengetahui warna yang sebenarnya dari objek yang dilihat. Karena penderita buta warna biasanya melihat warna suatu objek agak berbeda dari warna asli objek tersebut.  

#### Use Case Diagram
{diagram here}  

#### Requirements untuk Use Case yang Telah Dirancang
|FR|Deskripsi|
|---|---|
|FR&#160;1|End user perlu dapat melihat nama warna dalam representasi hex dan bahasa manusia untuk objek-objek yang ditangkap oleh kamera. Representasi bahasa manusia diperoleh dengan mencari warna terdekat yang ada di dalam database.|
|FR&#160;2|End user perlu dapat memilih bahasa yang digunakan untuk representasi warna dalam bahasa manusia.|
|FR&#160;3|End user perlu dapat mengerjakan tes buta warna untuk berbagai jenis buta warna dan mendapatkan hasil diagnosa ketika semua pertanyaan sudah dijawab.|
|FR&#160;4|End user perlu dapat membaca dan mencari artikel berdasarkan jenis buta warna. Artikel diurutkan berdasarkan tanggal publikasi.|
|FR&#160;5|Admin perlu dapat mengubah kata sandi akun mereka sendiri.|
|FR&#160;6|Admin perlu dapat menambah akun admin baru dengan memasukkan username akun baru dan sistem akan men-generate kata sandi sementara untuk akun tersebut.|
|FR&#160;7|Admin perlu dapat menghapus akun admin lain yang sudah ada namun bukan akun miliknya sendiri.|
|FR&#160;8|Admin dapat menambahkan bahasa baru dan menghapus bahasa yang sudah ada.|
|FR&#160;9|Admin dapat menambahkan dan menghapus representasi bahasa manusia warna tertentu untuk suatu bahasa.|
|FR&#160;10|Admin dapat menghapus representasi bahasa manusia untuk warna.|
|FR&#160;11|Admin dapat menulis, dan mengedit artikel terkait buta warna dalam format markdown.|
|FR&#160;12|Admin dapat menghapus artikel yang sudah ada.|
|FR&#160;13|Admin dapat menambahkan dan menghapus pertanyaan yang digunakan untuk tes buta warna.|

#### Entity-Relationship Diagram
{diagram here}  

#### Low-Fidelity Wireframe
|Layar|Wireframe|
|---|---|
|Account Management (Admin) |
|Color Names (Admin) |
|Articles (Admin) |
|Article Writing and Editing (Admin) |
|Color Blindness Test Questions (Admin) |
|Home Page ||
|Object Color Detector ||
|Object Color Detector-2 ||
|Color Blind Detector ||
|Color Blind Detector-2 ||
|Blogs list page ||
|Blog-detail ||
|About Us Page ||

#### Gantt-Chart Pengerjaan Proyek dalam Kurun Waktu Satu Semester
{chart here}  