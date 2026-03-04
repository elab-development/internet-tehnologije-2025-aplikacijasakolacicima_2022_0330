/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - cookieapp
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cookieapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `cookieapp`;

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_resets_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2019_12_14_000001_create_personal_access_tokens_table',1),
(5,'2026_01_28_000216_create_vehicle_table',1),
(6,'2026_01_28_000853_add_role_to_users_table',1),
(7,'2026_01_28_002848_create_rentals_table',2),
(8,'2026_01_28_003301_create_payments_table',3),
(9,'2026_01_28_003717_add_foreign_keys_to_rentals_table',4),
(10,'2026_01_28_003827_add_status_to_rentals_table',4),
(11,'2026_01_28_004116_modify_status_enum_in_rentals_table',4),
(12,'2026_01_28_004205_remove_doors_from_vehicle_table',4),
(13,'2026_02_01_113505_create_user_preferences_table',5),
(14,'2026_02_04_001408_create_sessions_table',6);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `payments` */

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rental_id` bigint(20) unsigned NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `method` varchar(255) NOT NULL DEFAULT 'katrica',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_rental_id_foreign` (`rental_id`),
  CONSTRAINT `payments_rental_id_foreign` FOREIGN KEY (`rental_id`) REFERENCES `rentals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `payments` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

insert  into `personal_access_tokens`(`id`,`tokenable_type`,`tokenable_id`,`name`,`token`,`abilities`,`last_used_at`,`expires_at`,`created_at`,`updated_at`) values 
(1,'App\\Models\\User',2,'auth_token','87a0a694a1712a7366a930dec4eaa1cabfef688e098373023c295c7a20c01f68','[\"*\"]',NULL,NULL,'2026-02-03 13:31:54','2026-02-03 13:31:54'),
(2,'App\\Models\\User',2,'auth_token','c3a28e2ef613b07df561b17854512a68fd88c2c7b521f1148a25da5081fa11b4','[\"*\"]',NULL,NULL,'2026-02-03 13:32:12','2026-02-03 13:32:12'),
(3,'App\\Models\\User',3,'auth_token','298ad614c3bb6044337d19613ae427529d10d6a8202d36caae8253d5239f5983','[\"*\"]',NULL,NULL,'2026-02-03 13:33:44','2026-02-03 13:33:44'),
(4,'App\\Models\\User',3,'auth_token','1c467f3058125aad9a6c307b9221c0aa5566661c0be0ae3bf15ab615481a7fee','[\"*\"]',NULL,NULL,'2026-02-03 13:34:04','2026-02-03 13:34:04'),
(5,'App\\Models\\User',3,'auth_token','917f797e8484194ecfa438d10714464bfaed6f3aabbce5a92ccc6a7405013c47','[\"*\"]',NULL,NULL,'2026-02-03 16:03:53','2026-02-03 16:03:53');

/*Table structure for table `rentals` */

DROP TABLE IF EXISTS `rentals`;

CREATE TABLE `rentals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `vehicle_id` bigint(20) unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` int(10) unsigned NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'na_cekanju',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rentals_vehicle_id_start_date_end_date_index` (`vehicle_id`,`start_date`,`end_date`),
  KEY `rentals_user_id_index` (`user_id`),
  CONSTRAINT `rentals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rentals_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `rentals` */

insert  into `rentals`(`id`,`user_id`,`vehicle_id`,`start_date`,`end_date`,`total_price`,`status`,`created_at`,`updated_at`) values 
(1,4,1,'2026-02-11','2026-02-15',600,'na_cekanju','2026-02-08 13:16:35','2026-02-08 13:16:35'),
(2,3,2,'2026-02-25','2026-02-28',18000,'na_cekanju','2026-02-24 16:53:36','2026-02-24 16:53:36'),
(3,3,2,'2026-03-24','2026-03-29',27000,'na_cekanju','2026-02-24 16:53:46','2026-02-24 16:53:46'),
(4,4,1,'2026-03-10','2026-03-14',150000,'na_cekanju','2026-02-28 12:47:09','2026-02-28 12:47:09'),
(5,4,2,'2026-03-09','2026-03-11',13500,'na_cekanju','2026-02-28 12:49:31','2026-02-28 12:49:31'),
(6,4,2,'2026-04-14','2026-04-16',13500,'na_cekanju','2026-02-28 12:49:50','2026-02-28 12:49:50');

/*Table structure for table `user_preferences` */

DROP TABLE IF EXISTS `user_preferences`;

CREATE TABLE `user_preferences` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'srpski',
  `theme` varchar(255) NOT NULL DEFAULT 'light',
  `cookies_accepted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_preferences_user_id_foreign` (`user_id`),
  CONSTRAINT `user_preferences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user_preferences` */

insert  into `user_preferences`(`id`,`user_id`,`language`,`theme`,`cookies_accepted`,`created_at`,`updated_at`) values 
(1,4,'srpski','dark',1,'2026-02-08 01:39:25','2026-02-08 13:23:24'),
(2,3,'srpski','dark',1,'2026-02-08 17:06:46','2026-02-25 09:50:44'),
(3,5,'srpski','dark',1,'2026-02-25 09:19:48','2026-02-25 09:19:50');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','registered_user','unregistered_user') NOT NULL DEFAULT 'unregistered_user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`email_verified_at`,`password`,`remember_token`,`created_at`,`updated_at`,`role`) values 
(2,'ana','a@gmail.com',NULL,'$2y$10$p/SCaXXsXJNoniuLslWVM.YWor9Y/s9aJf3leK4eTUp93GIPEHOnC',NULL,'2026-02-03 13:31:53','2026-02-03 13:31:53','registered_user'),
(3,'admin','admin@gmail.com',NULL,'$2y$10$l50ipDvZ0U2mghajzIbkQeKfRLaEPOVeYzputKqBEUrS/Kq71QwCy',NULL,'2026-02-03 13:33:44','2026-02-24 17:01:39','admin'),
(4,'marija','m@gmail.com',NULL,'$2y$10$0j.nobNS9j2Zxn7lj5yWf.XnXOuo0OqikdH0HwCExhnooiQLBG5BS',NULL,'2026-02-05 15:11:00','2026-02-10 18:27:17','registered_user'),
(5,'Andjela','a1@gmail.com',NULL,'$2y$10$tOqWLYUif.xpLAC020phWufoJzBrR30.rxT9Mk3VdDE1dKpjt4daG',NULL,'2026-02-25 09:19:32','2026-02-25 09:19:32','registered_user');

/*Table structure for table `vehicle` */

DROP TABLE IF EXISTS `vehicle`;

CREATE TABLE `vehicle` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `year` int(10) unsigned NOT NULL,
  `daily_price` int(10) unsigned NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `mileage` int(10) unsigned NOT NULL DEFAULT 0,
  `fuel_type` enum('dizel','benzin','električni','hibrid') NOT NULL,
  `transmission` enum('manuelni','automatski') NOT NULL,
  `seats` int(10) unsigned NOT NULL,
  `status` enum('available','rented','maintenance') NOT NULL DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicle_registration_number_unique` (`registration_number`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `vehicle` */

insert  into `vehicle`(`id`,`brand`,`model`,`registration_number`,`year`,`daily_price`,`color`,`mileage`,`fuel_type`,`transmission`,`seats`,`status`,`created_at`,`updated_at`) values 
(1,'BMW','X5','BG12341453',2022,30000,'red',123,'benzin','manuelni',5,'available',NULL,NULL),
(2,'Skoda','Karavan','KI13141411',2011,4500,'blue',0,'dizel','manuelni',0,'available',NULL,NULL),
(3,'Opel','Astra','BG121313314',2022,2000,'white',0,'dizel','manuelni',0,'available',NULL,NULL),
(4,'Audi','A6','SM121411556',2001,27500,'green',0,'električni','manuelni',5,'available',NULL,NULL),
(5,'Mercedes','C200','KI144995943',2014,12000,NULL,0,'dizel','manuelni',0,'available',NULL,NULL),
(6,'G Class','Mercedes','BG182352252',2025,580,NULL,0,'dizel','manuelni',0,'available',NULL,NULL),
(7,'Seat Ibiza','Seat','KS115252626',2003,20,NULL,0,'dizel','manuelni',0,'available',NULL,NULL),
(8,'audi','a4','KI134141412',2022,120,'bela',123,'benzin','automatski',3,'available','2026-02-07 00:10:41','2026-02-07 00:10:41');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
