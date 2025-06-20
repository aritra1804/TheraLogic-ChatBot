from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from pydantic import BaseModel, Field
from typing_extensions import TypedDict
from typing import Annotated, Literal
from langchain_community.llms import Ollama
from langchain_core.messages import HumanMessage, SystemMessage
import logging

load_dotenv()

llm = Ollama(model="llama3.2:latest")  # Use your preferred local model

class MessageClassifier(BaseModel):
    message_type: Literal["emotional", "logical"] = Field(
        ...,
        description="Classify if the message requires an emotional (therapist) or logical response."
    )

class State(TypedDict):
    messages: Annotated[list, add_messages]
    message_type: str | None

def classify_message(state: State):
    try:
        last_message = state["messages"][-1]
        content = last_message["content"] if isinstance(last_message, dict) else last_message.content
        system_prompt = (
            "Classify the user message as either:\n"
            "- 'emotional': if it asks for emotional support, therapy, deals with feelings, or personal problems\n"
            "- 'logical': if it asks for facts, information, logical analysis, or practical solutions"
        )
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=content)
        ]
        reply = llm.invoke(messages)
        reply_text = reply.strip().lower()
        if "emotional" in reply_text:
            message_type = "emotional"
        elif "logical" in reply_text:
            message_type = "logical"
        else:
            message_type = "logical"  # fallback
        return {"message_type": message_type}
    except Exception as e:
        logging.exception("Error in classify_message")
        return {"message_type": "logical"}

def router(state: State):
    message_type = state.get("message_type", "logical")
    if message_type == "emotional":
        return {"next": "therapist"}
    return {"next": "logical"}

def therapist_agent(state: State):
    try:
        last_message = state["messages"][-1]
        content = last_message["content"] if isinstance(last_message, dict) else last_message.content
        system_prompt = (
            "You are a supportive journaling companion. "
            "Show empathy, validate the user's feelings, and help them process their emotions. "
            "Ask thoughtful questions to help them explore their feelings more deeply. "
            "If the user references a previous day or entry, gently help them reflect on their progress. "
            "Avoid giving logical solutions unless explicitly asked."
        )
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=content)
        ]
        reply = llm.invoke(messages)
        return {"messages": [{"role": "assistant", "content": reply}]}
    except Exception as e:
        logging.exception("Error in therapist_agent")
        return {"messages": [{"role": "assistant", "content": "Error: LLM failed."}]}

def logical_agent(state: State):
    try:
        last_message = state["messages"][-1]
        content = last_message["content"] if isinstance(last_message, dict) else last_message.content
        system_prompt = (
            "You are a purely logical assistant. Focus only on facts and information.\n"
            "Provide clear, concise answers based on logic and evidence.\n"
            "Do not address emotions or provide emotional support.\n"
            "Be direct and straightforward in your responses."
        )
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=content)
        ]
        reply = llm.invoke(messages)
        return {"messages": [{"role": "assistant", "content": reply}]}
    except Exception as e:
        logging.exception("Error in logical_agent")
        return {"messages": [{"role": "assistant", "content": "Error: LLM failed."}]}

graph_builder = StateGraph(State)
graph_builder.add_node("classifier", classify_message)
graph_builder.add_node("router", router)
graph_builder.add_node("therapist", therapist_agent)
graph_builder.add_node("logical", logical_agent)
graph_builder.add_edge(START, "classifier")
graph_builder.add_edge("classifier", "router")
graph_builder.add_conditional_edges(
    "router",
    lambda state: state.get("next"),
    {"therapist": "therapist", "logical": "logical"}
)
graph_builder.add_edge("therapist", END)
graph_builder.add_edge("logical", END)
graph = graph_builder.compile()

def run_chatbot_logic(user_message, history=None):
    if history is None:
        history = []
    state = {"messages": history + [{"role": "user", "content": user_message}], "message_type": None}
    try:
        state = graph.invoke(state)
        if state.get("messages") and len(state["messages"]) > 0:
            last_message = state["messages"][-1]
            return state, last_message["content"] if isinstance(last_message, dict) else last_message.content
        return state, ""
    except Exception as e:
        logging.exception("Error in run_chatbot_logic")
        return state, "Error: Backend failed to process the message."

def serialize_message(msg):
    if isinstance(msg, dict):
        return msg
    return {
        "role": getattr(msg, "role", "user"),
        "content": getattr(msg, "content", str(msg))
    }

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

@app.route("/chat", methods=["POST"])
def chat():
    print("Received /chat request")  # Debug print
    data = request.get_json()
    user_message = data.get("message", "")
    history = data.get("history", [])
    state, response = run_chatbot_logic(user_message, history)
    # Serialize messages for JSON
    if "messages" in state:
        state["messages"] = [serialize_message(m) for m in state["messages"]]
    print("Sending response from /chat")  # Debug print
    return jsonify({
        "response": response,
        "state": state
    })

@app.route("/chat_dummy", methods=["POST"])
def chat_dummy():
    print("Received /chat_dummy request")  # Debug print
    return jsonify({"response": "test", "state": {}})

@app.route("/test", methods=["GET"])
def test():
    return "test"

@app.route("/test_post", methods=["POST"])
def test_post():
    return jsonify({"result": "ok"})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == "__main__":
    app.run(debug=True, port=5050) 