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

