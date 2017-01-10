-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2016 at 10:09 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `ID_Address_PK` int(11) NOT NULL,
  `City` varchar(20) DEFAULT NULL,
  `Address_ID` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`ID_Address_PK`, `City`, `Address_ID`) VALUES
(1, 'Egypt', 0),
(2, 'Cairo', 1),
(3, 'Mohandeseen', 2),
(4, 'Dubai', 0),
(5, 'Al-Shareqa', 4),
(7, 'Maadi', 2),
(9, 'Bahrain', 0),
(10, 'Kuwait', 0),
(11, 'Manama', 9),
(12, 'Al-Ahmadi', 10),
(13, 'Al-Ta3awon', 5),
(14, 'Al-Suqeya', 11),
(15, 'Al-Wafra', 12);

-- --------------------------------------------------------

--
-- Table structure for table `contactmessages`
--

CREATE TABLE `contactmessages` (
  `idContactMessages` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Message` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contactmessages`
--

INSERT INTO `contactmessages` (`idContactMessages`, `Name`, `Email`, `Phone`, `Message`) VALUES
(0, 'BelalMohammed', 'belal.mohammed.acu@gmail.com', '01114124461', 'this is my test message');

-- --------------------------------------------------------

--
-- Table structure for table `full_report`
--

CREATE TABLE `full_report` (
  `Full_Report_ID` int(11) NOT NULL,
  `Report_Reservations_Report_Reservations_ID` int(11) NOT NULL,
  `Report_Order_Report_Order_ID` int(11) NOT NULL,
  `SQL_Statement` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `Items_id` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Current_Price` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Item_Category_ID_Item_Category` int(11) NOT NULL,
  `Item_isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`Items_id`, `Name`, `Current_Price`, `Quantity`, `Item_Category_ID_Item_Category`, `Item_isDeleted`) VALUES
(2, 'Pudding', 30, 3, 2, 0),
(7, 'Apple Pie', 300, 1, 1, 0),
(8, 'Orange', 30, 5, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE `item_category` (
  `ID_Item_Category` int(11) NOT NULL,
  `Category_Name` varchar(45) DEFAULT 'UnNamed Category',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`ID_Item_Category`, `Category_Name`, `isDeleted`) VALUES
(1, 'Savory', 0),
(2, 'Food', 0),
(3, 'Drinks', 0),
(5, 'Breakfast', 0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `idMessages` int(11) NOT NULL,
  `Notifications_idNotifications` int(11) NOT NULL,
  `ContactMessages_idContactMessages` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `idNotifications` int(11) NOT NULL,
  `FROM` varchar(45) NOT NULL,
  `TO_User_ID` int(11) NOT NULL,
  `Body` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`idNotifications`, `FROM`, `TO_User_ID`, `Body`) VALUES
(5, 'abdallah@gmail.com', 13, 'I think eno el notifications is working :D'),
(6, 'admin@admin.com', 13, 'this is the 2nd notification ya prince. 5od balak men nafsak :D'),
(7, 'admin@admin.com', 13, '5od balak men nafsak ya prince :D'),
(8, 'raghad@test.com', 13, 'this is a notification'),
(9, 'admin@admin.com', 15, 'this is a notification message to test the functionality of notification system.'),
(10, 'belal.mohammed.acu@gmail.com', 13, 'test ayman');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `idOrder` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`idOrder`, `Date`, `Time`) VALUES
(1, '2016-05-19', '12:59:00'),
(2, '2016-05-19', '23:59:00'),
(3, '2016-05-19', '22:59:00'),
(4, '2016-05-19', '23:59:00');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id_OrderDetails` int(11) NOT NULL,
  `Order_idOrder` int(11) NOT NULL,
  `Items_Items_id` int(11) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Payment_Visa` int(11) DEFAULT NULL,
  `Payment_Cash` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id_OrderDetails`, `Order_idOrder`, `Items_Items_id`, `Quantity`, `Payment_Visa`, `Payment_Cash`) VALUES
(1, 1, 2, 3, 123, 123),
(2, 2, 7, 0, 123, 123),
(3, 3, 2, 3, 123, 123),
(4, 4, 2, 5, 123, 0);

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `Page_ID` int(11) NOT NULL,
  `Friendly_Name` varchar(45) DEFAULT NULL,
  `Physical_Address` varchar(45) DEFAULT NULL,
  `Html` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`Page_ID`, `Friendly_Name`, `Physical_Address`, `Html`) VALUES
(3, 'Admin', 'admin-panel/index.php', NULL),
(4, 'Chief', 'admin-panel/item/listItems.php', NULL),
(6, 'Reservations Agent', 'admin-panel/reservation/viewReservation.php', NULL),
(7, 'User', 'index1.php', NULL),
(8, 'test', 'test.php', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `report_order`
--

CREATE TABLE `report_order` (
  `Report_Order_ID` int(11) NOT NULL,
  `SQL_Statement` varchar(45) DEFAULT NULL,
  `Total_Price` int(11) DEFAULT NULL,
  `order_details_id_OrderDetails` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `report_reservations`
--

CREATE TABLE `report_reservations` (
  `Report_Reservations_ID` int(11) NOT NULL,
  `SQL_Statement` varchar(45) DEFAULT NULL,
  `reservation_id_Reservation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id_Reservation` int(11) NOT NULL,
  `Time_From` int(2) DEFAULT NULL,
  `Time_To` int(2) DEFAULT NULL,
  `Date_Reservation` date DEFAULT NULL,
  `Num_Users` int(11) DEFAULT NULL,
  `Branch` varchar(50) NOT NULL,
  `Table_Table_id` int(11) NOT NULL,
  `User_User_ID` int(11) NOT NULL,
  `reservation_isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`id_Reservation`, `Time_From`, `Time_To`, `Date_Reservation`, `Num_Users`, `Branch`, `Table_Table_id`, `User_User_ID`, `reservation_isDeleted`) VALUES
(1, 17, 18, '2016-05-20', 3, 'Egypt-Dokki', 1, 13, 1),
(2, 17, 18, '2016-05-20', 3, 'Egypt-Maadi', 1, 13, 1),
(3, 17, 18, '2016-05-20', 3, 'Egypt-Maadi', 1, 13, 1),
(4, 19, 20, '2016-05-20', 3, 'Egypt-Dokki', 2, 13, 0);

-- --------------------------------------------------------

--
-- Table structure for table `table`
--

CREATE TABLE `table` (
  `Table_id` int(11) NOT NULL,
  `Maximum` int(11) DEFAULT NULL,
  `table_isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `table`
--

INSERT INTO `table` (`Table_id`, `Maximum`, `table_isDeleted`) VALUES
(1, 5, 1),
(2, 5, 0),
(3, 5, 0),
(4, 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_ID` int(11) NOT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Mobile` text NOT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Address_ID_Address_PK` int(11) NOT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `FirstName`, `LastName`, `Mobile`, `Email`, `Address_ID_Address_PK`, `Password`, `isDeleted`) VALUES
(12, 'Belal', 'Mohammed', '01114124461', 'belal.mohammed.acu@gmail.com', 3, '123', 0),
(13, 'Test', 'Test', '01114124461', 'test@test.com', 13, '123', 0),
(14, 'Belal', 'Mohammed', '01114124461', '11belal.mohammed.acu@gmail.com', 3, '123', 0),
(15, 'Belal test', 'Test', '01114124461', 'test2@test.com', 3, '123', 0),
(16, 'mahmoud', 'Mohammed', '01114124461', 'mahmoud@test.com', 3, '123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_has_order`
--

CREATE TABLE `user_has_order` (
  `User_User_ID` int(11) NOT NULL,
  `Order_idOrder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_has_order`
--

INSERT INTO `user_has_order` (`User_User_ID`, `Order_idOrder`) VALUES
(13, 1),
(13, 2),
(13, 3),
(13, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_type_page`
--

CREATE TABLE `user_type_page` (
  `idUser_Type` int(11) NOT NULL,
  `Page_ID` int(11) NOT NULL,
  `User_User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_type_page`
--

INSERT INTO `user_type_page` (`idUser_Type`, `Page_ID`, `User_User_ID`) VALUES
(24, 6, 12),
(25, 7, 13),
(26, 7, 14),
(27, 7, 15),
(28, 7, 16);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`ID_Address_PK`);

--
-- Indexes for table `contactmessages`
--
ALTER TABLE `contactmessages`
  ADD PRIMARY KEY (`idContactMessages`);

--
-- Indexes for table `full_report`
--
ALTER TABLE `full_report`
  ADD PRIMARY KEY (`Full_Report_ID`,`Report_Reservations_Report_Reservations_ID`,`Report_Order_Report_Order_ID`),
  ADD KEY `fk_Full_Report_Report_Reservations1_idx` (`Report_Reservations_Report_Reservations_ID`),
  ADD KEY `fk_Full_Report_Report_Order1_idx` (`Report_Order_Report_Order_ID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`Items_id`,`Item_Category_ID_Item_Category`),
  ADD KEY `fk_Items_Item_Category1_idx` (`Item_Category_ID_Item_Category`);

--
-- Indexes for table `item_category`
--
ALTER TABLE `item_category`
  ADD PRIMARY KEY (`ID_Item_Category`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`idMessages`,`Notifications_idNotifications`,`ContactMessages_idContactMessages`),
  ADD KEY `fk_Messages_Notifications1_idx` (`Notifications_idNotifications`),
  ADD KEY `fk_Messages_ContactMessages1_idx` (`ContactMessages_idContactMessages`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`idNotifications`,`TO_User_ID`),
  ADD KEY `fk_Notifications_user_idx` (`TO_User_ID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`idOrder`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id_OrderDetails`),
  ADD KEY `fk_Order_has_Items_Items1_idx` (`Items_Items_id`),
  ADD KEY `fk_Order_has_Items_Order1_idx` (`Order_idOrder`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`Page_ID`);

--
-- Indexes for table `report_order`
--
ALTER TABLE `report_order`
  ADD PRIMARY KEY (`Report_Order_ID`,`order_details_id_OrderDetails`),
  ADD KEY `fk_report_order_order_details1_idx` (`order_details_id_OrderDetails`);

--
-- Indexes for table `report_reservations`
--
ALTER TABLE `report_reservations`
  ADD PRIMARY KEY (`Report_Reservations_ID`,`reservation_id_Reservation`),
  ADD KEY `fk_report_reservations_reservation1_idx` (`reservation_id_Reservation`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_Reservation`),
  ADD KEY `fk_Reservation_User1_idx` (`User_User_ID`),
  ADD KEY `fk_Reservation_Table1` (`Table_Table_id`);

--
-- Indexes for table `table`
--
ALTER TABLE `table`
  ADD PRIMARY KEY (`Table_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`,`Address_ID_Address_PK`),
  ADD UNIQUE KEY `ID_UNIQUE` (`User_ID`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`),
  ADD KEY `fk_User_Address1_idx` (`Address_ID_Address_PK`);

--
-- Indexes for table `user_has_order`
--
ALTER TABLE `user_has_order`
  ADD PRIMARY KEY (`User_User_ID`,`Order_idOrder`),
  ADD KEY `fk_User_has_Order_Order1_idx` (`Order_idOrder`),
  ADD KEY `fk_User_has_Order_User1_idx` (`User_User_ID`);

--
-- Indexes for table `user_type_page`
--
ALTER TABLE `user_type_page`
  ADD PRIMARY KEY (`idUser_Type`,`Page_ID`,`User_User_ID`),
  ADD KEY `fk_User_Type_Page_Page1_idx` (`Page_ID`),
  ADD KEY `fk_User_Type_Page_User1_idx` (`User_User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `ID_Address_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `full_report`
--
ALTER TABLE `full_report`
  MODIFY `Full_Report_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `Items_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `item_category`
--
ALTER TABLE `item_category`
  MODIFY `ID_Item_Category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `idMessages` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `idNotifications` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `idOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id_OrderDetails` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `Page_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `report_order`
--
ALTER TABLE `report_order`
  MODIFY `Report_Order_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `report_reservations`
--
ALTER TABLE `report_reservations`
  MODIFY `Report_Reservations_ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_Reservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `table`
--
ALTER TABLE `table`
  MODIFY `Table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `user_type_page`
--
ALTER TABLE `user_type_page`
  MODIFY `idUser_Type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `full_report`
--
ALTER TABLE `full_report`
  ADD CONSTRAINT `fk_Full_Report_Report_Order1` FOREIGN KEY (`Report_Order_Report_Order_ID`) REFERENCES `report_order` (`Report_Order_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Full_Report_Report_Reservations1` FOREIGN KEY (`Report_Reservations_Report_Reservations_ID`) REFERENCES `report_reservations` (`Report_Reservations_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk_Items_Item_Category1` FOREIGN KEY (`Item_Category_ID_Item_Category`) REFERENCES `item_category` (`ID_Item_Category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_Messages_ContactMessages1` FOREIGN KEY (`ContactMessages_idContactMessages`) REFERENCES `contactmessages` (`idContactMessages`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Messages_Notifications1` FOREIGN KEY (`Notifications_idNotifications`) REFERENCES `notifications` (`idNotifications`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_Notifications_user` FOREIGN KEY (`TO_User_ID`) REFERENCES `user` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_Order_has_Items_Items1` FOREIGN KEY (`Items_Items_id`) REFERENCES `items` (`Items_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Order_has_Items_Order1` FOREIGN KEY (`Order_idOrder`) REFERENCES `order` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report_order`
--
ALTER TABLE `report_order`
  ADD CONSTRAINT `fk_report_order_order_details1` FOREIGN KEY (`order_details_id_OrderDetails`) REFERENCES `order_details` (`id_OrderDetails`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `report_reservations`
--
ALTER TABLE `report_reservations`
  ADD CONSTRAINT `fk_report_reservations_reservation1` FOREIGN KEY (`reservation_id_Reservation`) REFERENCES `reservation` (`id_Reservation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_Reservation_Table1` FOREIGN KEY (`Table_Table_id`) REFERENCES `table` (`Table_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Reservation_User1` FOREIGN KEY (`User_User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_User_Address1` FOREIGN KEY (`Address_ID_Address_PK`) REFERENCES `address` (`ID_Address_PK`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_has_order`
--
ALTER TABLE `user_has_order`
  ADD CONSTRAINT `fk_User_has_Order_Order1` FOREIGN KEY (`Order_idOrder`) REFERENCES `order` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_User_has_Order_User1` FOREIGN KEY (`User_User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_type_page`
--
ALTER TABLE `user_type_page`
  ADD CONSTRAINT `fk_User_Type_Page_Page1` FOREIGN KEY (`Page_ID`) REFERENCES `page` (`Page_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_User_Type_Page_User1` FOREIGN KEY (`User_User_ID`) REFERENCES `user` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
