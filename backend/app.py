from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb+srv://chanchalmalik1214_db_user:kG6Rb6U7LFOnnMIu@cluster.ymawgpb.mongodb.net/newsletter_db")
db = client["newsletter_db"]
users_collection = db["users"]

@app.route("/")
def home():
    return "Backend is running 🚀"

@app.route("/signup", methods=["POST", "OPTIONS"])
def signup():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.json
    email = data.get("email")

    # Check duplicate
    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    user = {
        "email": email,
        "signup_date": datetime.now(),
        "last_sent": None
    }

    users_collection.insert_one(user)

    return jsonify({
        "message": "User added successfully",
        "user": user
    })

@app.route("/users", methods=["GET"])
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))
    return jsonify(users)
def send_email(to_email):
    sender_email = "your_real_email@gmail.com"
    sender_password = "your_generated_app_password"

    subject = "Monthly Newsletter"
    body = "Hello! This is your newsletter 🚀"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())
        server.quit()

        print(f"Email sent to {to_email}")

    except Exception as e:
        print("Error sending email:", e)

def send_newsletter():
    today = datetime.now()

    users = users_collection.find()

    for user in users:
        # Case 1: New user (never received newsletter)
        if user.get("last_sent") is None:
            send_email(user["email"])

            users_collection.update_one(
                {"email": user["email"]},
                {"$set": {"last_sent": today}}
            )

        # Case 2: First day of month
        elif today.day == 1:
            send_email(user["email"])

            users_collection.update_one(
                {"email": user["email"]},
                {"$set": {"last_sent": today}}
            )
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

# Start scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(send_newsletter, 'interval', minutes=1)  # for testing
scheduler.start()

if __name__ == "__main__":
    app.run(debug=True)