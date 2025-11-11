CREATE DATABASE ProyectoAuthDB;
GO

USE ProyectoAuthDB;
GO

-- Tabla de usuarios para login
CREATE TABLE Usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(100) NULL
);

-- Tabla de logs de carga CSV
CREATE TABLE Cargas (
    id INT PRIMARY KEY IDENTITY(1,1),
    archivo NVARCHAR(255),
    estado NVARCHAR(50),
    fecha DATETIME DEFAULT GETDATE()
);

