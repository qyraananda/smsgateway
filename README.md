# smscenter-gammu


1. SMS Center menggunakan GAMMU https://wammu.eu/gammu/
2. Menggunakan Ubuntu 18.04 LTS dan modem stick HUAWEI

# Error :
Log filename is "/var/log/gammulog" 

gammu-smsd[5340]: Error connecting to database!

gammu-smsd[5340]: Error code: 2002, Error: Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)

gammu-smsd[5340]: Initialisation failed, stopping Gammu smsd: Unknown error. (UNKNOWN[27])

Failed to run SMSD: Unknown error.

# Solusi :
sudo mkdir /var/run/mysqld

sudo ln -s /opt/lampp/var/mysql/mysql.sock /var/run/mysqld/mysqld.sock

Fungsi di atas berguna untuk membuat sorthcut agar ketika mysqld.sock yang ada pada direktori /var/run/mysqld/ dipanggil, maka mysqld.sock yang ada pada direktori /opt/lampp/var/mysql/ yang dijalankan.
