-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-07-2020 a las 14:37:59
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmpleado`, `Nombre`, `Correo`, `Usuario`, `Password`, `Jerarquia`) VALUES
(1, 'Empleado de prueba', 'prueba@hotmail.com', 'prueba', '123', 'admin'),
(14, 'Prueba', '', 'aver123', '$2y$10$R5rN.4obWjZX8OtaqPtKU.MF8WJ9LzJrPiVrIi6AfDKWaE/t8dBYu', 'vendedor'),
(16, 'PruebaSesion', '', 'aver', '$2y$10$nNQ2W4Oh23ti3zVTulAu3OoFacbX1uj1boaKUANWNVdihDPxty1pu', 'vendedor');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

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
(13, 2, 14, 'Recarga de salgo', '2299458623', 'Movistar', 50, 150, 0, 'c', '2020-07-04 14:37:37', 0),
(14, 2, 14, 'Recarga de salgo', '2299346534', 'Movistar', 50, 150, 0, 'c', '2020-07-04 14:53:13', 0),
(15, 2, 14, 'Servicio de prueba 4', NULL, NULL, NULL, 3000, 1, 'prueba ', '2020-07-04 14:53:37', 0),
(16, 2, 14, 'Recarga de salgo', '2299346534', 'Movistar', 300, 350, 0, 'c', '2020-07-04 14:56:59', 0);

--
-- Restricciones para tablas volcadas
--

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
