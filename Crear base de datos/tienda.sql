-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2024 a las 16:35:49
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(20) NOT NULL,
  `type` varchar(100) NOT NULL,
  `name` varchar(500) NOT NULL,
  `data` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `type`, `name`, `data`) VALUES
(9, 'image/jpeg', 'Disco duro SATA3 1TB.jpg', 'ÿØÿà\0JFIF\0\0`\0`\0\0ÿþ\0;CREATOR: gd-jpeg v1.0 (using IJG JPEG v62), quality = 90\nÿÛ\0C\0\n\n\n\r\rÿÛ\0C		\r\rÿÂ\0  \0ÿÄ\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿÄ\0\Z\0\0\0\0\0\0\0\0\0\0ÿÚ\0\0\0\0ú¤\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `img` varchar(500) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `inventario` int(20) NOT NULL,
  `precio` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `img`, `descripcion`, `inventario`, `precio`) VALUES
(1, 'Nike', 'nike1.jpg', 'nike ', 1, 170000),
(2, 'Nike', 'nike2.jpg', 'nike ', 1, 200000),
(4, 'New Balance', 'newBalance.jpg', 'New Balance ', 1, 170000),
(36, 'Converse pruebas', 'Disco duro SATA3 1TB.jpg', 'Converse all start', 1, 230000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `terceros`
--

CREATE TABLE `terceros` (
  `id` int(20) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `terceros`
--

INSERT INTO `terceros` (`id`, `cedula`, `nombre`, `correo`, `telefono`, `direccion`) VALUES
(1, 1143873478, 'JHONATAN ALBEIRO GALLEGO TORRES', 'JGALLEGO@GMAIL.COM', '3102457600', 'CARRERA 20 A CALLE 6 93 YUMBO VALLE'),
(2, 123, 'pruebas nombre', 'jgallego@gmail.com', '304125596', 'av 8 oeste #25 bis 23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_identificacion`
--

CREATE TABLE `tipo_identificacion` (
  `id` varchar(5) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_identificacion`
--

INSERT INTO `tipo_identificacion` (`id`, `descripcion`) VALUES
('A', 'Nit'),
('C', 'Cedula'),
('D', 'Carnet Diplomático'),
('E', 'Cedula de Extranjería'),
('F', 'Fideicomiso'),
('M', 'Permiso Especial de Permanencia'),
('N', 'Nit de Extranjería'),
('O', 'Otros'),
('P', 'Pasaporte'),
('Q', 'Permiso de Proteccion Temporal'),
('R', 'Registro Civil'),
('S', 'Tarjeta Seguro Social Extranjero'),
('T', 'Tarjeta de Identidad'),
('U', 'NUIP'),
('V', 'Salvoconducto de permanencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cedula_tercero` int(20) NOT NULL,
  `activo` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla que almacena los usuarios';

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user`, `password`, `cedula_tercero`, `activo`) VALUES
('admin', '1234', 1143873478, 'Y'),
('jonathangallegotorres@gmail.com', 'rr', 435345, 'Y');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `terceros`
--
ALTER TABLE `terceros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `tipo_identificacion`
--
ALTER TABLE `tipo_identificacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user`),
  ADD KEY `id_tercero` (`cedula_tercero`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `terceros`
--
ALTER TABLE `terceros`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
