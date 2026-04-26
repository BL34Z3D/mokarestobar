-- --------------------------------------------------------
-- BASE DE DATOS: moka_db
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `moka_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `moka_db`;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `admin_users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `admin_users`
-- Usuario por defecto: admin
-- Contraseña: Moka2026!
-- --------------------------------------------------------
INSERT INTO `admin_users` (`username`, `password`, `created_at`) VALUES
('admin', '$2a$10$oX6mF6uN9Sg7m6q1N8oB/.o1H4U6K8y0O1P2Q3R4S5T6U7V8W9X', CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE username=username; 
-- Nota: Si usas esta base, recuerda generar la contraseña correcta desde la API o usar Prisma. 

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `promotions`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
