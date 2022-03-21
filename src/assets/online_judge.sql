/*
 Navicat Premium Data Transfer

 Source Server         : mysql_root
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : online_judge

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 21/03/2022 15:58:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `user_id` int(22) NULL DEFAULT NULL COMMENT '用户id',
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '评论内容',
  `level` int(1) NOT NULL COMMENT '1=一级评论，2=二级评论。首先展示一级评论，展开一级评论时，查询二级评论的comment_id=一级评论id的评论',
  `comment_id` int(22) NULL DEFAULT NULL COMMENT '所回复评论的id',
  `good` int(20) NULL DEFAULT NULL COMMENT '点赞的人数',
  `bad` int(20) NULL DEFAULT NULL COMMENT '点踩的人数',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int(22) NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for favorite
-- ----------------------------
DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite`  (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `problem_id` int(22) NULL DEFAULT NULL COMMENT '收藏的题目id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int(22) NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for language
-- ----------------------------
DROP TABLE IF EXISTS `language`;
CREATE TABLE `language`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(22) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '语言',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of language
-- ----------------------------
INSERT INTO `language` VALUES (1, 'C', '2022-02-17 23:19:39', NULL);
INSERT INTO `language` VALUES (2, 'Java', '2022-02-17 23:19:50', NULL);

-- ----------------------------
-- Table structure for point_record
-- ----------------------------
DROP TABLE IF EXISTS `point_record`;
CREATE TABLE `point_record`  (
  `id` int(20) NOT NULL,
  `user_id` int(20) NULL DEFAULT NULL COMMENT '用户id',
  `point` int(20) NULL DEFAULT NULL COMMENT '积分（正数为增加积分，负数为扣除积分）',
  `create_by` int(20) NULL DEFAULT NULL COMMENT '操作者',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '积分流水记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for problem
-- ----------------------------
DROP TABLE IF EXISTS `problem`;
CREATE TABLE `problem`  (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `difficulty` int(1) NULL DEFAULT NULL COMMENT '难度（3困难，2中等，1简单）',
  `question_type` int(22) NULL DEFAULT NULL COMMENT '题型（1普通代码题，2简答题，填写答案即可）',
  `ispublic` int(1) NULL DEFAULT NULL COMMENT '是否公开？（1是，2不是）',
  `problem_stem` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '题干',
  `in_format` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '输入格式',
  `out_format` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '输出格式',
  `in_example` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '示例输入',
  `out_example` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '示例输出',
  `submit_times` int(20) NULL DEFAULT NULL COMMENT '提交次数',
  `submit_pass_times` int(20) NULL DEFAULT NULL COMMENT '提交通过次数',
  `submit_number` int(20) NULL DEFAULT NULL COMMENT '提交人数',
  `submit_pass_number` int(20) NULL DEFAULT NULL COMMENT '提交通过人数',
  `solution` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '题解',
  `point` int(20) NULL DEFAULT NULL COMMENT '积分值',
  `good` int(20) NULL DEFAULT NULL COMMENT '点赞的人数',
  `bad` int(20) NULL DEFAULT NULL COMMENT '点踩的人数',
  `latest_submit` datetime(0) NULL DEFAULT NULL COMMENT '最后提交时间',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int(22) NULL DEFAULT NULL COMMENT '创建人',
  `modify_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `modify_by` int(22) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of problem
-- ----------------------------
INSERT INTO `problem` VALUES (1, '两数之和', 1, 1, 1, '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。\r\n\r\n你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。\r\n\r\n你可以按任意顺序返回答案。', '[数字,数字,数字]', '[0,1]', 'nums = [2,7,11,15], target = 9', '[0,1]', 0, 0, 0, 0, '', 1, 0, 0, NULL, '2022-03-19 18:56:04', 1, NULL, NULL);

-- ----------------------------
-- Table structure for problem_tag
-- ----------------------------
DROP TABLE IF EXISTS `problem_tag`;
CREATE TABLE `problem_tag`  (
  `id` int(22) NOT NULL,
  `problem_id` int(22) NULL DEFAULT NULL COMMENT '题目id',
  `tag_id` int(22) NULL DEFAULT NULL COMMENT '标签id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int(22) NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '题目和标签的中间表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for submit
-- ----------------------------
DROP TABLE IF EXISTS `submit`;
CREATE TABLE `submit`  (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `problem_id` int(22) NULL DEFAULT NULL COMMENT '题目id',
  `exec_time` int(10) NULL DEFAULT NULL COMMENT '执行时间。单位：ms',
  `consume_memory` int(10) NULL DEFAULT NULL COMMENT '消耗内存。单位：MB',
  `pass_use_cases` int(10) NULL DEFAULT NULL COMMENT '通过用例',
  `use_cases` int(10) NULL DEFAULT NULL COMMENT '用例总个数',
  `status` int(1) NULL DEFAULT NULL COMMENT '状态（1通过，2解答出错，3执行出错）',
  `code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '提交的代码',
  `language` int(22) NULL DEFAULT NULL COMMENT '使用语言',
  `error_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '出错信息（如果是解答出错：最后执行的输入。如果是执行出错：报错信息）',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int(22) NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '提交表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签名',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '标签名，标签与问题的关系是多对一' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, '数组', '2022-03-19 19:00:22');
INSERT INTO `tag` VALUES (2, '字符串', '2022-03-21 14:38:09');
INSERT INTO `tag` VALUES (3, '排序', '2022-03-21 14:38:21');
INSERT INTO `tag` VALUES (4, '栈', '2022-03-21 14:38:42');

-- ----------------------------
-- Table structure for use_cases
-- ----------------------------
DROP TABLE IF EXISTS `use_cases`;
CREATE TABLE `use_cases`  (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `problem_id` int(22) NULL DEFAULT NULL COMMENT '题目编号',
  `input` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '测试用例的输入',
  `output` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '测试用例的输出',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_by` int(22) NULL DEFAULT NULL COMMENT '创建人',
  `modify_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `modify_by` int(22) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '测试用例表。' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of use_cases
-- ----------------------------
INSERT INTO `use_cases` VALUES (1, 1, '2,7,11,15', '0,1', '2022-03-19 18:57:31', 1, NULL, NULL);
INSERT INTO `use_cases` VALUES (2, 1, '3,2,4', '1,2', '2022-03-19 18:57:52', 1, NULL, NULL);
INSERT INTO `use_cases` VALUES (3, 1, '3,3', '0,1', '2022-03-19 18:58:14', 1, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(22) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `sex` int(1) NULL DEFAULT NULL COMMENT '性别（0是女，1是男）',
  `role` int(1) NULL DEFAULT NULL COMMENT '角色（1是普通用户，2是管理员）',
  `birthday` datetime(0) NULL DEFAULT NULL COMMENT '生日',
  `email` varchar(22) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子邮箱',
  `email_status` int(1) NULL DEFAULT NULL COMMENT '邮箱激活状态（0是未激活，1是已激活）',
  `verify_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱验证码',
  `point` int(20) NULL DEFAULT NULL COMMENT '积分',
  `prefer_language` int(20) NULL DEFAULT NULL COMMENT '偏好语言',
  `picture` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像（这里存的是图片地址）',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'mo', 'mo', 1, 2, '2021-10-07 18:22:55', 'moxy520527@163.com', 1, 'bcf0f2', 0, NULL, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '2022-03-19 18:36:15', '2022-03-20 23:52:01');
INSERT INTO `user` VALUES (2, 'TheGod', 'Mo2287993381', 1, 1, '1997-02-13 18:37:16', '2287993381@qq.com', 0, '7b8dd3', 0, NULL, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '2022-03-19 18:37:55', '2022-03-21 01:05:36');
INSERT INTO `user` VALUES (3, 'moo', '1234567', NULL, 1, NULL, '2287993381@qq.co', 0, '7b8dd3', 0, NULL, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '2022-03-21 00:58:51', '2022-03-21 01:05:36');
INSERT INTO `user` VALUES (4, '666', 'moxy520527', NULL, 1, NULL, '2287993381@qq.c', 0, '7b8dd3', 0, NULL, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '2022-03-21 01:05:05', '2022-03-21 01:05:54');
INSERT INTO `user` VALUES (5, 'The', 'm2287993381', NULL, 1, NULL, '2287993381@qq.c', 0, NULL, 0, NULL, 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', '2022-03-21 13:29:23', NULL);

SET FOREIGN_KEY_CHECKS = 1;
