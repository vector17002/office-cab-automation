import { parseCabSMS, CabDetails } from "./smsParser";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post("/parse-sms", (req: Request, res: Response) => {
    const text: string | undefined = req.body?.text;
    const expectedAlarm: string | undefined = req.body?.expectedAlarm;

    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "text is required" });
    }

    try {
        const parsed = parseCabSMS(text, expectedAlarm);
        console.log(parsed)
        return res.json(parsed);
    } catch (err: any) {
        console.error("parse error:", err);
        return res.status(422).json({ error: "Unable to parse SMS" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
