const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const { dbConfig, connection } = require("./config");

// Use Thick mode by setting the libDir
try {
    oracledb.initOracleClient({
        libDir:
            "C:\\Users\\Sumaiya\\Downloads\\instantclient-basic-windows.x64-23.4.0.24.05\\instantclient_23_4",
    });
} catch (err) {
    console.error("Error initializing Oracle client:", err);
    process.exit(1);
}

const app = express();
const PORT = 5127;

// Middleware setup
app.use(cors());
app.use(express.json()); // This is the built-in body parser middleware

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/passengers", async (req, res) => {
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT ID, Name, Email, password, TO_CHAR(Start_date, 'DD-MM-YY'), TO_CHAR(end_date, 'DD-MM-YY'), 
            TO_CHAR(date_of_birth, 'DD-MM-YY'),p.address.STREET, p.address.BLOCK, p.address.AVENUE, p.address.AREA FROM PASSENGER p`
        );

        console.log("Query Result:", result.rows); // Log the query result for debugging
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching passengers:", err);
        res.status(500).json({ error: "Failed to fetch passengers" });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});
app.get("/drivers", async (req, res) => {
    let conn;

    try {
        conn = await oracledb.getConnection(dbConfig);

        const result = await conn.execute(
            `SELECT 
            d.ID, d.NAME, d.EMAIL, d.DATE_OF_BIRTH, d.address.STREET, d.address.BLOCK, d.address.AVENUE, d.address.AREA,
            v.PLATE_NO, v.TYPE, v.PARKING_SLOT, v.TOTAL_SEATS, v.FEEDBACKSCORE
         FROM DRIVER d
         LEFT JOIN VEHICLE v ON d.PLATE_NO = v.PLATE_NO`
        );

        console.log("Query Result:", result.rows); // Log the query result for debugging

        const drivers = result.rows.map((row) => ({
            id: row[0],
            name: row[1],
            email: row[2],
            date_of_birth: row[3],
            street: row[4],
            block: row[5],
            avenue: row[6],
            area: row[7],
            vehicle: row[8]
                ? {
                    plate_no: row[8],
                    type: row[9],
                    parking_slot: row[10],
                    total_seats: row[11],
                    feedbackscore: row[12],
                }
                : null,
        }));

        res.json(drivers); // Send the response as JSON
    } catch (err) {
        console.error("Error fetching drivers:", err);
        res.status(500).json({ error: "Failed to fetch drivers" });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});

app.post("/payment", async (req, res) => {
    const { passengerId } = req.body;
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT payment.PAYMENT_ID, TO_CHAR(payment.payment_DATE, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "DATE", payment.AMOUNT, payment.FINE, payment.STATUS
             FROM PAYMENT, PAYS
             WHERE PAYS.ID = :passengerId
             AND PAYS.PAYMENT_ID = PAYMENT.PAYMENT_ID`,
            [passengerId]
        );

        console.log("Query Result:", result); // Log the query result for debugging
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching payments:", err);
        res
            .status(500)
            .json({ error: "Failed to fetch payments", details: err.message });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});

app.get("/passengersfine", async (req, res) => {
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT passenger.id, passenger.name, passenger.email, payment.PAYMENT_ID, TO_CHAR(payment.payment_DATE, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "DATE", payment.AMOUNT, payment.FINE, payment.STATUS
             FROM PAYMENT, passenger, pays
             WHERE payment.FINE > 0
             AND pays.Id = passenger.id
             AND pays.payment_id = payment.payment_id`
        );

        console.log("Query Result:", result.rows); // Log the query result for debugging
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching payments with fine:", err);
        res.status(500).json({
            error: "Failed to fetch payments with fine",
            details: err.message,
        });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});
app.get("/routees", async (req, res) => {
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT * FROM ROUTE ORDER BY TO_TIMESTAMP(SOURCE_TIME, 'HH24:MI') DESC`
        );

        console.log("Query Result:", result.rows); // Log the query result for debugging
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching routes:", err);
        res.status(500).json({ error: "Failed to fetch routes" });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});
app.get("/pendingpassenger", async (req, res) => {
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT passenger.id, passenger.name, passenger.email, payment.PAYMENT_ID, TO_CHAR(payment.payment_DATE, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "DATE", payment.AMOUNT, payment.FINE, payment.STATUS
             FROM PAYMENT, passenger, pays
             WHERE payment.Status = 'Pending'
             AND pays.Id = passenger.id
             AND pays.payment_id = payment.payment_id`
        );

        console.log("Query Result:", result.rows); // Log the query result for debugging
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching payments with pending:", err);
        res.status(500).json({
            error: "Failed to fetch payments with pending",
            details: err.message,
        });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});
app.post("/loginstaff", async (req, res) => {
    const { id, password } = req.body;
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT ID, password FROM PASSENGER WHERE ID = :id AND PASSWORD = :password`,
            [id, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res
                .status(401)
                .json({ success: false, message: "Invalid ID or password" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Login failed" });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});
app.post("/logindriver", async (req, res) => {
    const { id, password } = req.body;
    let conn;

    try {
        conn = await connection();

        const result = await conn.execute(
            `SELECT ID, password FROM PASSENGER WHERE ID = :id AND PASSWORD = :password`,
            [id, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res
                .status(401)
                .json({ success: false, message: "Invalid ID or password" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Login failed" });
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
});

app.post("/student/signup", async (req, res) => {
    const {
        id,
        name,
        email,
        phoneNumbers,
        department,
        level,
        dob,
        todayDate,
        street,
        avenue,
        block,
        area,
        password,
        confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    let conn;
    try {
        conn = await connection();

        const result = await conn.execute(
            `INSERT INTO passenger (
                ID, 
                NAME, 
                EMAIL, 
                PASSWORD, 
                START_DATE, 
                END_DATE, 
                DATE_OF_BIRTH, 
                ADDRESS, 
                DEPT, 
                POST, 
                LVL
                ) 
                VALUES (
                    :id, 
                    :name, 
                    :email, 
                    :password, 
                    :todayDate, 
                    NULL, 
                    :dob, 
                    :address, 
                    :department, 
                    NULL, 
                    :level
                )`,
            {
                id,
                name,
                email,
                password,
                todayDate,
                dob,
                address: `${street}, ${avenue}, ${block}, ${area}`,
                department,
                level,
            }
        );

        res.status(200).json({ message: "Signup successful", result });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            await conn.close();
        }
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
