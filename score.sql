-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2019-01-14 02:40:26
-- 服务器版本： 5.7.19
-- PHP Version: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `score`
--

-- --------------------------------------------------------

--
-- 表的结构 `contestants`
--

DROP TABLE IF EXISTS `contestants`;
CREATE TABLE IF NOT EXISTS `contestants` (
  `speaker_id` int(10) NOT NULL AUTO_INCREMENT,
  `speaker_name` varchar(100) NOT NULL COMMENT '名字',
  `speaker_subject` varchar(255) NOT NULL COMMENT '演讲题目',
  `speaker_department` varchar(100) NOT NULL COMMENT '所在部门',
  `speaker_average` varchar(10) DEFAULT '0' COMMENT '平均分',
  `speaker_number` int(10) NOT NULL DEFAULT '0' COMMENT '评分人数',
  PRIMARY KEY (`speaker_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `contestants`
--

INSERT INTO `contestants` (`speaker_id`, `speaker_name`, `speaker_subject`, `speaker_department`, `speaker_average`, `speaker_number`) VALUES
(1, '陈大', '放下', '南天门', '0', 0),
(2, '玉二', '用人之道', '凌霄殿', '0', 0),
(3, '王三', '宫斗', '瑶池', '0', 0),
(4, '太四', '博学', '兜率宫', '0', 0),
(5, '弼五', '多学', '御马监', '0', 0);

-- --------------------------------------------------------

--
-- 表的结构 `rules`
--

DROP TABLE IF EXISTS `rules`;
CREATE TABLE IF NOT EXISTS `rules` (
  `rules_id` int(10) NOT NULL AUTO_INCREMENT,
  `rules_desc` varchar(255) NOT NULL COMMENT '规则介绍',
  `rules_score` int(10) NOT NULL COMMENT '规则所占分值',
  `rules_level` int(10) NOT NULL COMMENT '规则级别',
  `rules_pid` int(10) NOT NULL,
  PRIMARY KEY (`rules_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `rules`
--

INSERT INTO `rules` (`rules_id`, `rules_desc`, `rules_score`, `rules_level`, `rules_pid`) VALUES
(1, '整体形象分', 15, 1, 0),
(2, '演讲内容', 40, 1, 0),
(3, '演讲技巧', 20, 1, 0),
(4, '形象风度', 15, 1, 0),
(5, '会场效果', 10, 1, 0),
(6, '仪表端庄、着装规范', 5, 2, 1),
(7, '是否脱稿', 5, 2, 1),
(8, '时间控制5-8分钟', 5, 2, 1),
(9, '围绕主题、观点正确、内容充实', 15, 2, 2),
(10, '措辞准确、造句流畅', 10, 2, 2),
(11, '结构合理、逻辑清晰', 15, 2, 2),
(12, '语言规范、吐字清晰、声音洪亮', 5, 2, 3),
(13, '表达准确、流畅自然、语速恰当', 5, 2, 3),
(14, '节奏合理、感情丰富', 10, 2, 3),
(15, '精神饱满、仪态大方', 10, 2, 4),
(16, '良好运用姿态动作、手势、表情', 5, 2, 4),
(17, '具有较强的吸引力、感染力和号召力，能较好地与听众感情融在一起，营造良好的演讲效果', 10, 2, 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
