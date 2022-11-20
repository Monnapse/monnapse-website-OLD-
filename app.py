from flask import Flask, render_template, url_for
import json

# Open Posts file

"""
    Made by MonkeyDev#7578
"""

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('home.html')


@app.route("/projects")
def projects():
    f = open('data/posts.json')
    PostsData = json.load(f)

    PostsData["current"] = None
    return render_template('projects.html',posts=PostsData)

@app.route("/projects/<post_name>")
def project(post_name):
    f = open('data/posts.json')
    PostsData = json.load(f)

    PostsData["current"] = post_name
    return render_template('projects.html',posts=PostsData)


@app.route("/models")
def models():
    f = open('data/posts.json')
    PostsData = json.load(f)

    PostsData["current"] = None
    return render_template('models.html',posts=PostsData)

@app.route("/models/<post_name>")
def model(post_name):
    f = open('data/posts.json')
    PostsData = json.load(f)

    PostsData["current"] = post_name
    return render_template('models.html',posts=PostsData)


@app.route("/digitalart")
def graphics():
    f = open('data/posts.json')
    PostsData = json.load(f)

    PostsData["current"] = None
    return render_template('DigitalArt.html',posts=PostsData)

@app.route("/digitalart/<post_name>")
def graphic(post_name):
    f = open('data/posts.json')
    PostsData = json.load(f)

    PostsData["current"] = post_name
    return render_template('DigitalArt.html',posts=PostsData)

@app.route("/about")
def about():
    return render_template('about.html')

@app.route('/api')
def api():
    with open('data.json', mode='r') as my_file:
        text = my_file.read()
        return text