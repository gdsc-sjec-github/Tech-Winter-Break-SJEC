from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get the directory of app.py
DB_PATH = os.path.join(BASE_DIR, 'usersA.db')
# Database setup
DATABASE = 'usersA.db'


def init_db():
    if not os.path.exists(DATABASE):
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    academic_year TEXT NOT NULL
                )
            ''')
            conn.commit()
            print(f"Database initialized at {DB_PATH}")

# Initialize the database
init_db()

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/message')
def message():
    return render_template('messaging.html')

@app.route('/about')
def about():
    return render_template('About.html')

@app.route('/forgot')
def forgot():
    return render_template('Forgot_password.html')


@app.route('/register')
    
def register():
    return render_template('registration.html')


@app.route('/signup', methods=['POST'])
def signup():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    academic_year = request.form['academicYear']

    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO users (name, email, password, academic_year)
                VALUES (?, ?, ?, ?)
            ''', (name, email, password, academic_year))
            conn.commit()

        flash('Signup successful! Please login.')
        return redirect(url_for('register'))

    except sqlite3.IntegrityError:
        flash('Email already registered. Please login.')
        return redirect(url_for('register'))

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT * FROM users WHERE email = ? AND password = ?
        ''', (email, password))
        user = cursor.fetchone()


        if user:
            return redirect(url_for('message'))

    flash('Invalid credentials. Please try again.')
    return redirect(url_for('register'))

# Database setup
# Initialize the database
# Initialize the database
def init_db2():
    conn = sqlite3.connect('qa1.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS questions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        question TEXT NOT NULL
                      )''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS answers (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        question_id INTEGER,
                        answer TEXT NOT NULL,
                        reference TEXT,
                        FOREIGN KEY (question_id) REFERENCES questions (id)
                      )''')
    conn.commit()
    conn.close()

init_db2()

@app.route('/post', methods=['GET', 'POST'])
def post():
    if request.method == 'POST' and 'question' in request.form:
        question_text = request.form['question']
        if question_text.strip():  # Check for non-empty question
            conn = sqlite3.connect('qa1.db')
            cursor = conn.cursor()
            cursor.execute('INSERT INTO questions (question) VALUES (?)', (question_text,))
            conn.commit()
            conn.close()
            return redirect(url_for('post'))  # Redirect after posting a question
    
    # Fetch questions and recent answers
    conn = sqlite3.connect('qa1.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions ORDER BY id DESC')  # Fetch all questions in descending order
    questions = cursor.fetchall()
    cursor.execute('SELECT * FROM answers ORDER BY id DESC LIMIT 5')  # Fetch the 5 most recent answers
    recent_answers = cursor.fetchall()
    conn.close()
    
    # Render the template with questions and recent answers
    return render_template('messaging.html', questions=questions, recent_answers=recent_answers)

@app.route('/answer/<int:question_id>', methods=['POST'])
def answer_question(question_id):
    answer_text = request.form['answer']
    reference_link = request.form['reference']
    if answer_text.strip():  # Check for non-empty answer
        conn = sqlite3.connect('qa1.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO answers (question_id, answer, reference) VALUES (?, ?, ?)',
                       (question_id, answer_text, reference_link))
        conn.commit()
        conn.close()
    return redirect(url_for('post'))  # Redirect after posting an answer
if __name__ == '__main__':
    app.run(debug=True)
