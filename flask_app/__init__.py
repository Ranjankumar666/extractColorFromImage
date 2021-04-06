from flask import Flask, request, jsonify, render_template
from flask_wtf import FlaskForm
from wtforms import SubmitField
from flask_wtf.file import FileField, FileAllowed
from PIL import Image
from collections import Counter
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)


class FileForm(FlaskForm):
    image = FileField('Upload your image',
                      validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
    submit = SubmitField("Upload")


app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers["Cache-Control"] = "public, max-age=0"
    return r


@app.route("/", methods=["POST", "GET"])
def home():
    form = FileForm()

    if form.validate_on_submit():
        data = request.files['image']
        i = Image.open(data)
        # i.show()
        colors = Counter(i.getdata())
        colors = list(set(colors))
        most_common_colors = colors[0:5]
        # return {"message": "Done"}
        return render_template("home.html",
                               form=form,
                               colors=list(set(most_common_colors)))

    return render_template("home.html", form=form)
