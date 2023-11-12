//Script de la bd para el proyecto CloudArch en MongoDB
//Autor: Erick Morales
mongosh
use cloud-arch;

db.createCollection("users");
/*
    *Atributos
        -id
        -name
        -username
        -password
        -rol
*/
db.createCollection("carpetas");
/*
    *Atributos
        -id
        -user
        -path
        -name
        -fecha_creacion

 */
db.createCollection("archivos");
/* 
    *Atributos
        -id
        -name
        -type
        -path
        -user
        -fecha_creacion
        -content

*/
db.createCollection("shareds");
/*
    *Atributos
        -id
        -name
        -type
        -path
        -user_shared
        -content
        -fecha_compartido
        -hora_compartido
        -user
*/
db.createCollection("papeleras");
/*
    *Atributos
        -id
        -name
        -type
        -path
        -user
        -content
        -tipo_eliminacion

*/

db.users.insertMany([
    {
        "name": "Erick Morales",
        "username": "erick",
        "password": "123",
        "rol": 1
    },
    {
        "name": "Juan Perez",
        "username": "juan",
        "password": "123",
        "rol": 2
    },
    {
        "name": "Maria Lopez",
        "username": "maria",
        "password": "123",
        "rol": 2
    }
]);

db.carpetas.insertMany([
    {
        "user": "erick",
        "path": "root",
        "name": "Carpeta1",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "erick",
        "path": "root",
        "name": "Carpeta2",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "erick",
        "path": "root/Carpeta1",
        "name": "Carpeta3",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "juan",
        "path": "root",
        "name": "Carpeta1",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "juan",
        "path": "root",
        "name": "Carpeta2",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "juan",
        "path": "root/Carpeta2",
        "name": "Carpeta3",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "maria",
        "path": "root",
        "name": "Carpeta1",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "maria",
        "path": "root",
        "name": "Carpeta2",
        "fecha_creacion": "2021-05-01"
    },
    {
        "user": "maria",
        "path": "root/Carpeta2",
        "name": "Carpeta3",
        "fecha_creacion": "2021-05-01"
    }
]);

db.archivos.insertMany([
    {
        "name": "Archivo1.txt",
        "type": "txt",
        "path": "root",
        "user": "erick",
        "fecha_creacion": "2021-05-01",
        "content": "Hola mundo"
    },
    {
        "name": "Archivo2.html",
        "type": "html",
        "path": "root/Carpeta1",
        "user": "erick",
        "fecha_creacion": "2021-05-01",
        "content": "Hola mundo 2"   
    },
    {
        "name": "Archivo1.html",
        "type": "html",
        "path": "root",
        "user": "juan",
        "fecha_creacion": "2021-05-01",
        "content": "Hola mundo juan"   
    },
    {
        "name": "Archivo2.txt",
        "type": "txt",
        "path": "root/Carpeta2",
        "user": "juan",
        "fecha_creacion": "2021-05-01",
        "content": "Hola mundo juan 2"   
    },
    {
        "name": "Archivo1.txt",
        "type": "txt",
        "path": "root",
        "user": "maria",
        "fecha_creacion": "2021-05-01",
        "content": "Hola mundo maria 1"   
    },
    {
        "name": "Archivo2.html",
        "type": "html",
        "path": "root/Carpeta1",
        "user": "maria",
        "fecha_creacion": "2021-05-01",
        "content": "Hola mundo maria 2"  
    }
]);


