-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-07-2020 a las 21:53:31
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mortechsaldo`
--
CREATE DATABASE IF NOT EXISTS `mortechsaldo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mortechsaldo`;

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `ActualizarCorte`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarCorte` (IN `idEmpleado` INT)  NO SQL
update venta set Corte = 1 where pagado = 1 and corte = 0 and venta.idEmpleado = idEmpleado and Fecha BETWEEN (select Fecha from venta where Corte = 0 and venta.idEmpleado = idEmpleado and Pagado = 1 GROUP by Fecha asc limit 1) and CURRENT_TIMESTAMP$$

DROP PROCEDURE IF EXISTS `DetalleCorte`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DetalleCorte` (IN `idEmpleado` INT)  NO SQL
select empleado.Nombre,
COALESCE((select sum(Monto) from venta where venta.idEmpleado = idEmpleado and fecha between (select Fecha from venta where Corte = 0 and venta.idEmpleado = idEmpleado GROUP by Fecha asc limit 1) and CURRENT_TIMESTAMP()),0) As 'SaldoVendido',
COALESCE((select sum(Usd) from venta where venta.idEmpleado = idEmpleado and NombreServicio != 'Recarga de saldo' and Pagado = 1 and fecha between (select Fecha from venta where Corte = 0 and venta.idEmpleado = idEmpleado GROUP by Fecha asc limit 1) and CURRENT_TIMESTAMP()),0) As 'DolaresServicios',
COALESCE((select sum(Mxn) from venta where venta.idEmpleado = idEmpleado and NombreServicio != 'Recarga de saldo' and Pagado = 1 and fecha between (select Fecha from venta where Corte = 0 and venta.idEmpleado = idEmpleado GROUP by Fecha asc limit 1) and CURRENT_TIMESTAMP()),0) As 'PesosServicios',
COALESCE((select sum(Usd) from venta where venta.idEmpleado = idEmpleado and Pagado = 1 and Corte = 0 and fecha between (select Fecha from venta where Corte = 0 and venta.idEmpleado = idEmpleado GROUP by Fecha asc limit 1) and CURRENT_TIMESTAMP()),0) As 'Dolares',
COALESCE((select sum(Mxn) from venta where venta.idEmpleado = idEmpleado and Pagado = 1 and Corte = 0 and fecha between (select Fecha from venta where Corte = 0 and venta.idEmpleado = idEmpleado GROUP by Fecha asc limit 1) and CURRENT_TIMESTAMP()),0) As 'Mxn',
COALESCE((select sum(Usd) from venta where venta.idEmpleado = idEmpleado and Pagado = 0),0) As 'CreditoUsd',
COALESCE((select sum(Mxn) from venta where venta.idEmpleado = idEmpleado and Pagado = 0),0) As 'CreditoMxn'
from venta inner join empleado on empleado.idEmpleado = venta.idEmpleado where venta.idEmpleado = idEmpleado limit 1$$

DROP PROCEDURE IF EXISTS `InsertarCorte`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarCorte` (IN `idEmpleado` INT, IN `Usd` FLOAT, IN `Mxn` FLOAT)  begin
        set @fecha = '';
        select fecha into @fecha from venta where corte = 0 and pagado = 0 and venta.idEmpleado = idEmpleado order by fecha asc limit 1;
        insert into corte(idEmpleado, IniciadoEl, RealizadoEl, Usd, Mxn)
        values (idEmpleado, @fecha,now(), Usd, Mxn);
    end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(70) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `Nombre`) VALUES
(1, 'Cliente de prueba'),
(2, 'caca'),
(3, 'Aver');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corte`
--

DROP TABLE IF EXISTS `corte`;
CREATE TABLE IF NOT EXISTS `corte` (
  `idCorte` int(11) NOT NULL AUTO_INCREMENT,
  `idEmpleado` int(11) NOT NULL,
  `IniciadoEl` timestamp NULL DEFAULT NULL,
  `RealizadoEl` timestamp NOT NULL DEFAULT current_timestamp(),
  `Usd` double DEFAULT NULL,
  `Mxn` double DEFAULT NULL,
  PRIMARY KEY (`idCorte`),
  KEY `idEmpleado` (`idEmpleado`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `corte`
--

INSERT INTO `corte` (`idCorte`, `idEmpleado`, `IniciadoEl`, `RealizadoEl`, `Usd`, `Mxn`) VALUES
(1, 14, '2020-07-16 16:03:09', '2020-07-16 20:27:34', 0, 0),
(4, 14, '2020-07-16 16:03:09', '2020-07-16 20:39:40', 0, 0),
(5, 14, '2020-07-16 16:03:09', '2020-07-16 21:11:18', 0, 0),
(7, 14, '2020-07-16 16:03:09', '2020-07-16 21:29:29', 25, 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

DROP TABLE IF EXISTS `empleado`;
CREATE TABLE IF NOT EXISTS `empleado` (
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(70) NOT NULL,
  `Correo` varchar(40) NOT NULL,
  `Usuario` varchar(20) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Jerarquia` varchar(50) NOT NULL,
  PRIMARY KEY (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmpleado`, `Nombre`, `Correo`, `Usuario`, `Password`, `Jerarquia`) VALUES
(1, 'Empleado de prueba', 'prueba@hotmail.com', 'prueba', '123', 'admin'),
(14, 'Prueba', '', 'aver123', '$2y$10$R5rN.4obWjZX8OtaqPtKU.MF8WJ9LzJrPiVrIi6AfDKWaE/t8dBYu', 'vendedor'),
(16, 'PruebaSesion', '', 'aver', '$2y$10$nNQ2W4Oh23ti3zVTulAu3OoFacbX1uj1boaKUANWNVdihDPxty1pu', 'vendedor'),
(17, 'Linntae', 'Linntae@ejemplo.com', 'demoLinntaews', '$2y$10$l0eE2ZUDPTBqE44c1EpB8uuwS7.u4wPabkLZmtA70p82Y42Ofw7qK', 'vendedor');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `total_corte`
-- (Véase abajo para la vista actual)
--
DROP VIEW IF EXISTS `total_corte`;
CREATE TABLE IF NOT EXISTS `total_corte` (
`idEmpleado` int(11)
,`Nombre` varchar(70)
,`Mxn` double
,`Usd` double
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

DROP TABLE IF EXISTS `venta`;
CREATE TABLE IF NOT EXISTS `venta` (
  `idVenta` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `NombreServicio` varchar(100) NOT NULL,
  `NumeroTelefono` varchar(10) DEFAULT NULL,
  `Operadora` varchar(50) DEFAULT NULL,
  `Monto` float DEFAULT NULL,
  `Usd` float DEFAULT NULL,
  `Mxn` float DEFAULT NULL,
  `Pagado` tinyint(1) NOT NULL,
  `Observaciones` varchar(300) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Corte` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`idVenta`),
  KEY `idCliente` (`idCliente`),
  KEY `idVendedor` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`idVenta`, `idCliente`, `idEmpleado`, `NombreServicio`, `NumeroTelefono`, `Operadora`, `Monto`, `Usd`, `Mxn`, `Pagado`, `Observaciones`, `fecha`, `Corte`) VALUES
(3, 2, 14, 'Recarga de saldo', '22', 'Telcel', 23, 0, 23, 0, 'c', '2020-07-16 16:03:09', 0),
(4, 2, 14, 'Recarga de saldo', '2292141516', 'Telcel', 23, 0, 23, 0, 'InserciÃ³n de varios nÃºmeros', '2020-07-16 16:03:09', 0),
(5, 2, 14, 'Recarga de saldo', '22441225', 'Telcel', 23, 0, 23, 0, 'InserciÃ³n de varios nÃºmeros', '2020-07-16 16:03:09', 0),
(6, 2, 14, 'Recarga de saldo', '22995447', 'Telcel', 23, 0, 23, 0, 'InserciÃ³n de varios nÃºmeros', '2020-07-16 16:03:09', 0),
(7, 2, 14, 'Recarga de saldo', '2292141516', 'Telcel', 20, 0, 40, 0, 'Prueba con la API', '2020-07-16 16:03:09', 0),
(8, 2, 14, 'Recarga de saldo', '2292141516', 'Telcel', 20, 0, 40, 0, 'Prueba con la API', '2020-07-16 16:03:09', 0),
(9, 2, 14, 'Recarga de saldo', '2292141516', 'Telcel', 20, 0, 40, 0, 'Prueba con la API', '2020-07-16 16:03:09', 0),
(10, 2, 14, 'Recarga de saldo', '2292141687', 'Telcel', 20, 0, 20, 1, 'Prueba 2', '2020-07-16 16:03:09', 0),
(11, 2, 14, 'Recarga de saldo', '2299345267', 'Telcel', 20, 0, 20, 1, 'Prueba 2', '2020-07-16 16:03:09', 0),
(12, 2, 14, 'Recarga de saldo', '2292834353', 'Telcel', 20, 0, 20, 1, 'Prueba 2', '2020-07-16 16:03:09', 0),
(13, 2, 14, 'Recarga de saldo', '2299245167', 'Telcel', 20, 0, 40, 1, 'Prueba je', '2020-07-16 16:03:09', 0),
(14, 2, 14, 'Recarga de saldo', '2291456578', 'Telcel', 20, 0, 30, 0, 'Prueba modal', '2020-07-16 16:03:09', 0),
(15, 2, 14, 'Recarga de saldo', '2292567423', 'Telcel', 20, 0, 20, 0, 'c', '2020-07-16 16:03:09', 0),
(16, 2, 14, 'Recarga de saldo', '2292567423', 'Telcel', 20, 0, 20, 0, 'c', '2020-07-16 16:03:09', 0),
(17, 2, 14, 'Recarga de saldo', '2291345782', 'Telcel', 20, 0, 20, 0, 'c', '2020-07-16 16:03:09', 0),
(18, 2, 14, 'Recarga de saldo', '2297462345', 'Telcel', 20, 0, 20, 0, 'c', '2020-07-16 16:03:09', 0),
(19, 2, 14, 'Recarga de saldo', '2299435678', 'Movistar', 20, 0, 20, 0, 'c', '2020-07-16 16:03:09', 0),
(20, 2, 14, 'Recarga de saldo', '2299457214', 'Telcel', 20, 0, 20, 0, 'c', '2020-07-16 16:03:09', 0),
(21, 2, 14, 'Recarga de saldo', '2292436789', 'Telcel', 20, 0, 20, 0, 'pene', '2020-07-16 16:03:09', 0),
(29, 2, 14, 'Servicio de prueba', NULL, NULL, NULL, 0, 1500, 0, 'Prueba', '2020-07-16 16:03:09', 0),
(30, 2, 14, 'Servicio de prueba 2', NULL, NULL, NULL, 0, 200, 1, 'Prueba 2', '2020-07-16 16:03:09', 0),
(31, 2, 14, 'Servicio de prueba 2', NULL, NULL, NULL, 0, 200, 0, 'Prueba 2', '2020-07-16 16:03:09', 0),
(32, 2, 14, 'Recarga de saldo', '2292456523', 'Telcel', 20, 0, 20, 0, 'Aver', '2020-07-16 16:03:09', 0),
(33, 2, 14, 'Recarga de saldo', '2299456423', 'Telcel', 20, 0, 20, 0, 'Aver', '2020-07-16 16:03:09', 0),
(34, 2, 14, 'Recarga de saldo', '2299456423', 'Telcel', 20, 0, 20, 0, 'Aver', '2020-07-16 16:03:09', 0),
(35, 2, 14, 'Recarga de saldo', '2299456423', 'Telcel', 20, 0, 20, 0, 'Aver', '2020-07-16 16:03:09', 0),
(36, 2, 14, 'Recarga de saldo', '2299567823', 'Telcel', 20, 0, 20, 0, 'cc', '2020-07-16 16:03:09', 0),
(37, 2, 14, 'Servicio de prueba 3', NULL, NULL, NULL, 0, 3000, 0, 'Prueba 3', '2020-07-16 16:03:09', 0),
(38, 2, 14, 'Recarga de saldo', '2292456728', 'Telcel', 20, 0, 30, 1, 'c', '2020-07-16 16:03:09', 0),
(39, 2, 14, 'Recarga de saldo', '2299254678', 'Telcel', 100, 0, 150, 0, 'Falta por pagar', '2020-07-16 16:03:09', 0),
(40, 2, 16, 'Recarga de saldo', '2299346589', 'Telcel', 100, 0, 150, 0, 'c', '2020-07-16 16:03:09', 0),
(41, 2, 16, 'Recarga de saldo', '2299457894', 'Telcel', 100, 0, 120, 0, 'c', '2020-07-16 16:03:09', 0),
(42, 2, 16, 'Recarga de saldo', '2299457610', 'Unefon', 200, 0, 220, 0, 'Pagado', '2020-07-16 16:03:09', 0),
(43, 2, 16, 'Recarga de saldo', '2299564876', 'Telcel', 100, 0, 30, 0, 'c', '2020-07-16 16:03:09', 0),
(44, 2, 16, 'Recarga de saldo', '2299564876', 'Telcel', 100, 0, 30, 0, 'c', '2020-07-16 16:03:09', 0),
(45, 2, 16, 'Recarga de saldo', '2299113546', 'Telcel', 100, 0, 150, 0, 'c', '2020-07-16 16:03:09', 0),
(46, 2, 17, 'Recarga de saldo', '2299135676', 'Telcel', 100, 0, 200, 0, 'c', '2020-07-16 16:03:09', 0),
(47, 3, 17, 'Prueba servicio xd', NULL, NULL, NULL, 0, 0, 1, '', '2020-07-16 19:55:04', 0);

-- --------------------------------------------------------

--
-- Estructura para la vista `total_corte`
--
DROP TABLE IF EXISTS `total_corte`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `total_corte`  AS  select distinct `venta`.`idEmpleado` AS `idEmpleado`,`empleado`.`Nombre` AS `Nombre`,(select sum(`venta`.`Mxn`) from `venta` where `venta`.`idEmpleado` = `empleado`.`idEmpleado`) AS `Mxn`,(select sum(`venta`.`Usd`) from `venta` where `venta`.`idEmpleado` = `empleado`.`idEmpleado`) AS `Usd` from (`venta` join `empleado` on(`empleado`.`idEmpleado` = `venta`.`idEmpleado`)) ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `corte`
--
ALTER TABLE `corte`
  ADD CONSTRAINT `corte_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `idCliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idVendedor` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
