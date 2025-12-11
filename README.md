⏰ SMS → Alarm Automation (iOS Automation + Shortcuts + Backend)

This project allows users to automatically create alarms on iOS based on incoming SMS messages.
An iOS Automation triggers a Shortcut whenever an SMS is received, the Shortcut sends the message to a backend parser, and the Shortcut then sets an alarm according to user-defined rules.

Because alarm preferences vary, users must edit a small part of the Shortcut to customize their own alarm time logic.

⸻

🚀 How It Works

1️⃣ iOS Automation (Runs Automatically)

An Automation is configured in the Shortcuts app:
	•	Trigger: When a Message is Received
	•	Action: Run Shortcut → SMS Alarm Parser

When a new SMS arrives, the automation runs the Shortcut automatically (with user confirmation, as required by iOS).

⸻

2️⃣ iOS Shortcut (User-Configurable)

The Shortcut:
	1.	Receives the SMS text
	2.	Sends it to the backend (POST /parse-sms)
	3.	Receives a parsed result like:

{
  "time": "06:30",
  "label": "Wake me up"
}


	4.	Runs the user-configured logic to decide exactly what alarm time to set
	5.	Creates a new Alarm on the device

🔧 Users must edit one section of the Shortcut
This project intentionally allows users to define how the alarm time should be processed:
	•	convert backend time into local time
	•	add an offset
	•	use fixed times
	•	ignore SMS content and always set a preset alarm
	•	etc.

This keeps the Shortcut flexible and adaptable to everyone’s preferences.

⸻

🧩 Backend Parser (Node.js + TypeScript)

The backend receives SMS text and extracts:
	•	Time (e.g., 7am, 18:30, tomorrow 6:00)
	•	Optional label
	•	Optional metadata

It returns strongly structured JSON so the Shortcut can work with a clean dictionary.

⸻

📲 Overall Flow Diagram

Incoming SMS
    ↓
iOS Automation: “When Message is Received”
    ↓
Shortcut (SMS Alarm Parser)
    ↓
POST /parse-sms → Backend
    ↓
Backend returns { time, label }
    ↓
User-configured alarm logic
    ↓
Set Alarm on iOS


⸻

✨ Features
	•	Automatic SMS-triggered alarm creation
	•	Lightweight backend for parsing natural text
	•	Fully customizable Shortcut logic
	•	Handles many time formats (6pm, 07:30, tomorrow 6, etc.)
	•	Works entirely within Apple’s Shortcuts ecosystem

⸻

📌 Why User Customization Is Required

iOS Shortcuts does not provide:
	•	absolute timezone handling
	•	default alarm logic
	•	built-in rules for adjusting parsed times

This project gives users full control over:
	•	How the alarm time should be interpreted
	•	How far into the future alarms should be scheduled
	•	Whether parsed data should be modified or ignored
	•	Custom alarm labels

This makes the Shortcut adaptable for:
	•	consistent wake-up alarms
	•	reminder alarms
	•	scheduled activity alarms
	•	medication reminders
	•	and more.

⸻

🔧 Setup Instructions

1. Clone this repo

git clone https://github.com/your/repo.git

2. Deploy the backend

Node.js + Express server.
(Instructions included in /server folder.)

3. Import the iOS Shortcut

Users import SMS_Alarm_Parser.shortcut.

4. Edit the Shortcut section labeled “Customize Alarm Time Logic Here”

Users set:
	•	Alarm hour and minute
	•	Optional adjustments
	•	Custom naming

5. Enable iOS Automation

Create automation:
	•	When a Message is Received
	•	Run → SMS Alarm Parser
	•	Allow prompt as required by iOS

⸻

🧪 Example JSON Returned From Backend

{
  "time": "05:45",
  "label": "Gym time"
}


⸻

🔐 Important Notes
	•	iOS does not allow fully silent SMS automation
→ The user may still need to tap “Run” depending on iOS restrictions
	•	Alarm creation happens on-device; the backend never sets alarms
	•	Users must customize their alarm behavior inside the Shortcut

⸻

Shortcut Link: https://www.icloud.com/shortcuts/88564510c2ee4a989cf8a80ccbdc965c
