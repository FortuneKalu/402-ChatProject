from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -----------------------------
# In-memory chat storage
# -----------------------------
# This list holds all chat messages for the lifetime
# of the server process. When the server restarts,
# the list is reset (no database in this simple version).
messages = []


@app.route("/messages", methods=["GET"])
def get_messages():
    """
    Return the full chat history as JSON.
    The frontend calls this to display messages.
    """
    return jsonify(messages)


@app.route("/messages", methods=["POST"])
def post_message():
    """
    Add a new message to the in-memory list.

    Expected JSON payload:
      {
        "username": "Fortune",
        "text": "Hello world"
      }
    """
    data = request.get_json() or {}

    msg = {
        "username": data.get("username", "Anon"),
        "text": data.get("text", "")
    }

    # Only append if there is actually some text.
    if msg["text"].strip():
        messages.append(msg)

    # 201 = Created
    return jsonify({"status": "ok"}), 201


@app.route("/messages/clear", methods=["DELETE"])
def clear_messages():
    """
    Clear all messages from the in-memory list.

    The frontend calls this when the user clicks
    the "Clear All" button.
    """
    messages.clear()
    return jsonify({"status": "cleared"}), 200


if __name__ == "__main__":
    # Run on port 5000 so the Vite frontend (default 5173)
    # can talk to it via http://127.0.0.1:5000
    app.run(port=5000, debug=True)
