Данная программа получает тикеты криптовалюты раз в 30 секунд и выводит на экран данные
Данные бурутся из 3 популярных бирж криптовалют
-https://exmo.me
-https://btc-e.nz
-https://poloniex.com

<hr>

### Обновите индекс пакетов<br>
sudo apt-get upgrade -y<br>

### Установить CURL<br>
sudo apt-get install curl<br>

### Установите nodejs из репозитория<br>
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

### Установить request
sudo npm i request

### Установить sequelize
sudo npm i sequelize

### Установить MySQL
sudo apt-get install mysql-server
sudo service mysql stop
sudo mysqld --skip-grant-tables --user=root
//Если команда не сработает, добавьте строку «skip-grant-tables» в секцию «[mysqld]» файла /etc/mysql/mysql.conf.d/mysqld.cnf. //Затем выполните sudo service mysql restart. После выполнения операций удалите эту строку.
mysql -u root
UPDATE mysql.user SET authentication_string=PASSWORD('123'), plugin='mysql_native_password' WHERE User='root' AND Host='localhost';    
FLUSH PRIVILEGES;
sudo service mysql restart
mysql -u root -p
create database '<название базы данных>';

### Установите YARN<br>
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -<br>
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list<br>
sudo apt-get update<br>
sudo apt-get install yarn<br>

### Установите GIT<br>
sudo apt-get install git<br>

### Скопируйте репозиторий<br>
sudo git clone https://github.com/nnatthebest/apiTicketsPr63biyakov<br>

### Подключить зависимости<br>
cd apiTicketsPr63biyakov<br>
$ sudo yarn install<br>

### Сделайте миграцию в базу данных<br>
sequelize db:migrate

### Запустить приложение<br>
node index.js
