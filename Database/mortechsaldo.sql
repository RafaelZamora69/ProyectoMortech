-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-07-2020 a las 19:47:31
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(70) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `Nombre`) VALUES
(1, 'Cliente de prueba'),
(2, 'caca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corte`
--

DROP TABLE IF EXISTS `corte`;
CREATE TABLE IF NOT EXISTS `corte` (
  `idCorte` int(11) NOT NULL AUTO_INCREMENT,
  `idEmpleado` int(11) NOT NULL,
  `IniciadoEl` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `RealizadoEl` timestamp NOT NULL DEFAULT current_timestamp(),
  `SubTotal` double NOT NULL,
  `IngresoCorte` double NOT NULL,
  PRIMARY KEY (`idCorte`),
  UNIQUE KEY `idEmpleado` (`idEmpleado`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `PrecioVenta` float NOT NULL,
  `Pagado` tinyint(1) NOT NULL,
  `Observaciones` varchar(300) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Corte` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`idVenta`),
  KEY `idCliente` (`idCliente`),
  KEY `idVendedor` (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`idVenta`, `idCliente`, `idEmpleado`, `NombreServicio`, `NumeroTelefono`, `Operadora`, `Monto`, `PrecioVenta`, `Pagado`, `Observaciones`, `Fecha`, `Corte`) VALUES
(1, 1, 14, 'Recarga Saldo', '2292235413', 'Telcel', 20, 50, 1, 'Observación de prueba', '2020-06-29 18:58:31', 0),
(2, 1, 14, 'Recarga Saldo', '2292235413', 'Telcel', 20, 50, 1, 'Observación de prueba', '2020-06-29 18:58:43', 0),
(3, 2, 14, 'Recarga de salgo', '22', 'Telcel', 23, 23, 0, 'c', '2020-07-01 15:17:26', 0),
(4, 2, 14, 'Recarga de salgo', '2292141516', 'Telcel', 23, 23, 0, 'InserciÃ³n de varios nÃºmeros', '2020-07-01 15:18:55', 0),
(5, 2, 14, 'Recarga de salgo', '22441225', 'Telcel', 23, 23, 0, 'InserciÃ³n de varios nÃºmeros', '2020-07-01 15:18:55', 0),
(6, 2, 14, 'Recarga de salgo', '22995447', 'Telcel', 23, 23, 0, 'InserciÃ³n de varios nÃºmeros', '2020-07-01 15:18:55', 0),
(7, 2, 14, 'Recarga de salgo', '2292141516', 'Telcel', 20, 40, 0, 'Prueba con la API', '2020-07-01 16:13:35', 0),
(8, 2, 14, 'Recarga de salgo', '2292141516', 'Telcel', 20, 40, 0, 'Prueba con la API', '2020-07-01 19:39:37', 0),
(9, 2, 14, 'Recarga de salgo', '2292141516', 'Telcel', 20, 40, 0, 'Prueba con la API', '2020-07-01 19:40:01', 0),
(10, 2, 14, 'Recarga de salgo', '2292141687', 'Telcel', 20, 20, 1, 'Prueba 2', '2020-07-01 19:47:38', 0),
(11, 2, 14, 'Recarga de salgo', '2299345267', 'Telcel', 20, 20, 1, 'Prueba 2', '2020-07-01 19:48:11', 0),
(12, 2, 14, 'Recarga de salgo', '2292834353', 'Telcel', 20, 20, 1, 'Prueba 2', '2020-07-01 19:48:13', 0),
(13, 2, 14, 'Recarga de salgo', '2299245167', 'Telcel', 20, 40, 1, 'Prueba je', '2020-07-03 02:56:36', 0),
(14, 2, 14, 'Recarga de salgo', '2291456578', 'Telcel', 20, 30, 0, 'Prueba modal', '2020-07-03 03:04:48', 0),
(15, 2, 14, 'Recarga de salgo', '2292567423', 'Telcel', 20, 20, 0, 'c', '2020-07-03 03:14:11', 0),
(16, 2, 14, 'Recarga de salgo', '2292567423', 'Telcel', 20, 20, 0, 'c', '2020-07-03 03:14:40', 0),
(17, 2, 14, 'Recarga de salgo', '2291345782', 'Telcel', 20, 20, 0, 'c', '2020-07-03 03:14:42', 0),
(18, 2, 14, 'Recarga de salgo', '2297462345', 'Telcel', 20, 20, 0, 'c', '2020-07-03 03:14:44', 0),
(19, 2, 14, 'Recarga de salgo', '2299435678', 'Movistar', 20, 20, 0, 'c', '2020-07-03 03:16:01', 0),
(20, 2, 14, 'Recarga de salgo', '2299457214', 'Telcel', 20, 20, 0, 'c', '2020-07-03 03:30:53', 0),
(21, 2, 14, 'Recarga de salgo', '2292436789', 'Telcel', 20, 20, 0, 'pene', '2020-07-03 03:33:02', 0),
(29, 2, 14, 'Servicio de prueba', NULL, NULL, NULL, 1500, 0, 'Prueba', '2020-07-03 18:16:10', 0),
(30, 2, 14, 'Servicio de prueba 2', NULL, NULL, NULL, 200, 1, 'Prueba 2', '2020-07-03 18:56:25', 0),
(31, 2, 14, 'Servicio de prueba 2', NULL, NULL, NULL, 200, 0, 'Prueba 2', '2020-07-03 19:00:19', 0),
(32, 2, 14, 'Recarga de salgo', '2292456523', 'Telcel', 20, 20, 0, 'Aver', '2020-07-03 21:14:25', 0),
(33, 2, 14, 'Recarga de salgo', '2299456423', 'Telcel', 20, 20, 0, 'Aver', '2020-07-04 01:24:52', 0),
(34, 2, 14, 'Recarga de salgo', '2299456423', 'Telcel', 20, 20, 0, 'Aver', '2020-07-04 01:24:52', 0),
(35, 2, 14, 'Recarga de salgo', '2299456423', 'Telcel', 20, 20, 0, 'Aver', '2020-07-04 01:25:04', 0),
(36, 2, 14, 'Recarga de salgo', '2299567823', 'Telcel', 20, 20, 0, 'cc', '2020-07-04 02:00:25', 0),
(37, 2, 14, 'Servicio de prueba 3', NULL, NULL, NULL, 3000, 0, 'Prueba 3', '2020-07-04 02:00:45', 0),
(38, 2, 14, 'Recarga de salgo', '2292456728', 'Telcel', 20, 30, 1, 'c', '2020-07-04 02:44:17', 0),
(39, 2, 14, 'Recarga de salgo', '2299254678', 'Telcel', 100, 150, 0, 'Falta por pagar', '2020-07-08 00:49:18', 0),
(40, 2, 16, 'Recarga de salgo', '2299346589', 'Telcel', 100, 150, 0, 'c', '2020-07-08 01:03:30', 0),
(41, 2, 16, 'Recarga de salgo', '2299457894', 'Telcel', 100, 120, 0, 'c', '2020-07-08 01:10:46', 0),
(42, 2, 16, 'Recarga de salgo', '2299457610', 'Unefon', 200, 220, 0, 'Pagado', '2020-07-08 01:14:47', 0),
(43, 2, 16, 'Recarga de salgo', '2299564876', 'Telcel', 100, 30, 0, 'c', '2020-07-08 01:41:38', 0),
(44, 2, 16, 'Recarga de salgo', '2299564876', 'Telcel', 100, 30, 0, 'c', '2020-07-08 01:41:48', 0),
(45, 2, 16, 'Recarga de salgo', '2299113546', 'Telcel', 100, 150, 0, 'c', '2020-07-08 01:53:31', 0),
(46, 2, 17, 'Recarga de salgo', '2299135676', 'Telcel', 100, 200, 0, 'c', '2020-07-10 03:48:45', 0);

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
