//Script de la bd para el proyecto CloudArch en MongoDB
//Autor: Erick Morales

use CloudArch;

db.createCollection("usuario");
/*
    *Atributos
        -id
        -name
        -username
        -password
        -rol
*/
db.createCollection("carpeta");
/*
    *Atributos
        -id
        -usuario
        -path
        -nombre
        -fecha_creacion

 */
db.createCollection("archivo");
/* 
    *Atributos
        -id
        -name
        -type
        -path
        -fecha_creacion
        -content

*/
db.createCollection("compartido");
/*
    *Atributos
        -id
        -principal_user
        -shared_user
        -archivo[objeto]
*/
db.createCollection("papelera");
/*
    *Atributos
        -id
        -name
        -type
        -content
*/




