-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2025 at 01:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `technest_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `address`, `phone`, `total`, `items`, `created_at`) VALUES
(1, 'sara', 'Saudi', '0559094302', 798.00, '[{\"name\":\"Wireless Headphones\",\"price\":499,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/headphones.png\",\"quantity\":1},{\"name\":\"Mechanical Keyboard\",\"price\":299,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/keyboard.png\",\"quantity\":1}]', '2025-11-08 02:09:30'),
(2, 'il85o', 'Saudi', '0559094302', 897.00, '[{\"name\":\"Mechanical Keyboard\",\"price\":299,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/keyboard.png\",\"quantity\":3}]', '2025-11-08 03:31:27'),
(3, 'il85o', 'Saudi', '0559094302', 1915.00, '[{\"name\":\"Wireless Headphones\",\"price\":499,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/headphones.png\",\"quantity\":2},{\"name\":\"Smart Speaker\",\"price\":399,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/Smart%20Speaker.png\",\"quantity\":1},{\"name\":\"Smart Security Camera\",\"price\":259,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/Smart%20Security%20Camera.png\",\"quantity\":2}]', '2025-11-08 05:20:56'),
(4, 'sara10', 'Saudi', '0559094302', 2374.00, '[{\"name\":\"Smartwatch\",\"price\":599,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/watch.png\",\"quantity\":1},{\"name\":\"Wireless Headphones\",\"price\":499,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/headphones.png\",\"quantity\":2},{\"name\":\"Smart Security Camera\",\"price\":259,\"image\":\"http:\\/\\/localhost\\/technest\\/frontend\\/assets\\/images\\/Smart%20Security%20Camera.png\",\"quantity\":3}]', '2025-11-08 11:22:08');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`) VALUES
(1, 'Wireless Headphones', 'Noise cancelling headphones with 40h battery life', 499.00, 'headphones.png'),
(2, 'Mechanical Keyboard', 'RGB backlit keyboard with blue switches', 299.00, 'keyboard.png'),
(3, 'Smartwatch', 'AMOLED smartwatch with fitness tracking', 599.00, 'watch.png'),
(4, 'Smart Speaker', 'Voice-controlled smart speaker with 360° sound and Alexa built-in', 399.00, 'Smart Speaker.png'),
(5, 'Wireless Charger', '15W fast charging pad compatible with all Qi-enabled devices', 129.00, 'Wireless Charger.png'),
(6, 'Smart Lamp', 'Adjustable RGB lamp controllable via app and voice commands', 179.00, 'Smart Lamp.png'),
(7, 'Smart Security Camera', '1080p night vision camera with motion detection and cloud storage', 259.00, 'Smart Security Camera.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'SaraAljuraybah', 'Saraaljrebah1@gmail.com', 'Ss1234567', '2025-11-07 23:54:57'),
(3, 'dalal', '', '$2y$10$6BLuxtXZZEqw3DHXYKNZxuRA5o9f3Bj6GNnrMXgd6lexQwp5BCir6', '2025-11-08 06:28:39'),
(4, 'sara', 'soso@gmail.com', '$2y$10$4LZcRxxUr6HcXeTLXhrkLu1U8QYKuIRI4IQ8Ni032BNYbMeBIGNDK', '2025-11-08 09:51:17'),
(5, 'sara2', 'sara2@gmail.com', '$2y$10$721WHxeQPxC0tWyVG.qlIuS/E/gLb8ab7pTeiJzsDRsAl.jAdM3jG', '2025-11-08 10:00:13'),
(6, 'Ahmed', 'Ahmed1@gmail.com', '$2y$10$9mSbbeqIPQS4QN7lKOhUOuvsdn88RM8eEA5aMeZp0YYSgosPfPqo6', '2025-11-08 10:01:53'),
(7, 'khaled', 'khaled@gmail.com', '$2y$10$SPTJhu8DN1TPOzrNY5Y7muC6F2G/7bG48B./0/jVBEQFU7zoiPHki', '2025-11-08 10:03:01'),
(8, 'Mohammed', 'Mohammed@gmail.com', '$2y$10$8BtrUR9yCGqzBhbRqJIriurStD15c7GFaLh.ju78PhTGl0v5OeC.q', '2025-11-08 10:23:25'),
(9, 'noor', 'noor@gmail.com', '$2y$10$Sw.BP4XyaeUQcsxyH4dlA.3SmXdKilqLeWwINwiKLTvrJ1kkDRf1W', '2025-11-08 11:13:25'),
(10, 'sara10', 'sara10@gmail.com', '$2y$10$6Baz5TYDC.p.V.tGmRKBAefdYr3LHlxRF8tQApciK25lThB.ljbp2', '2025-11-08 11:20:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
