# PoC 1: สำหรับ Technical Spike เรื่อง date/time และ UTF-8 
code นี้ส่วนใหญ่เขียนคล้ายกับที่เรียนในวิชา Backend (week4)

- **Frontend:** HTML + JS 
- **Backend:** Node.js + Express  
- **Database:** MySQL  

---

## Database
สร้าง Database (เขียนใน MySQL Workbench)

```sql
CREATE DATABASE poc1_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 
USE poc1_db;
CREATE TABLE study_plan ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    plan_code VARCHAR(2) NOT NULL UNIQUE, 
    name_eng VARCHAR(60) NOT NULL, 
    name_th VARCHAR(100) NOT NULL, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Note เพิ่มเติม (เรียนรู้มาจาก Stack overflow)
- ใช้ utf8mb4 แทน utf8 เพื่อให้มันรองรับทุกอักขระใน Unicode เพราะ utf8 รองรับเพียง 3 bytes
- COLLATE คือวิธีเปรียบเทียบและเรียงลำดับข้อความในฐานข้อมูล
- เรา set DEFAULT CHARSET... เเค่ใน table study_plan เพราะ name_th จะเก็บภาษาไทย ซึ่งมันจะทำให้ทุก column ใน table นี้ใช้ UTF-8 อัตโนมัติ

---

## set ระบบ project ใน vs code
```bash
npm init -y      //เพราะเราจะใช้ node.js 
npm install express mysql2 dotenv
```

---

## BACKEND
- ไฟล์ db.js (ทำ db connection)
- ใช้ mysql2 library แล้วสร้าง connection ผ่าน pooling connection เเล้วก็ใช้เรื่องที่อ.สอนตอน week10 ใช้ dotenv เพื่อจะ access ข้อมูลใน .env

---

## ลองกรอกข้อมูลจาก Front ไป นี่คือสิ่งที่บันทึกใน database
<img width="824" height="193" alt="image" src="https://github.com/user-attachments/assets/f6e4c8a9-a7db-493f-bd62-b9162ed9106b" />

---

## Technical Spike Answers :
###  which (data type should we use for date/time)
ใน database ตรง created_at กับ updated_at ให้ใช้ datatype เป็น DATETIME  
แล้วกำหนด DEFAULT เป็น current_timestamp เพื่อให้ database มัน auto-generate timestamp เพราะ DATETIME ไม่ผูกกับ timezone ของ server ทำให้เก็บค่าเป็น UTC ตรงตาม requirement ที่อ.ให้ และให้ Database เป็นคนสร้างค่า created_at / updated_at โดยอัตโนมัติ


### how (to store/send/receive date/time)
- ในไฟล์ db.js ที่เชื่อม backend กับ database ต้องกำหนด timezone: "Z" บอก backend ให้ใช้ UTC 
- ในเรื่องการทำให้มันรองรับ UTF-8 ในไฟล์ db.js ก็กำหนด charset: "utf8mb4"  
และใน database ตอน create database กับ table ก็เขียน CHARACTER SET utf8mb4


