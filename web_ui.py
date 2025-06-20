import streamlit as st
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from pydantic import BaseModel, Field
from typing_extensions import TypedDict
from typing import Annotated, Literal
from langchain_community.llms import Ollama
from langchain_core.messages import HumanMessage, SystemMessage

load_dotenv()

llm = Ollama(model="llama3.2")  # Change to your preferred local model

class MessageClassifier(BaseModel):
    message_type: Literal["emotional", "logical"] = Field(
        ...,
        description="Classify if the message requires an emotional (therapist) or logical response."
    )

class State(TypedDict):
    messages: Annotated[list, add_messages]
    message_type: str | None

def classify_message(state: State):
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
    # Try to extract the type from the reply text
    reply_text = reply.strip().lower()
    if "emotional" in reply_text:
        message_type = "emotional"
    elif "logical" in reply_text:
        message_type = "logical"
    else:
        message_type = "logical"  # fallback
    return {"message_type": message_type}

def router(state: State):
    message_type = state.get("message_type", "logical")
    if message_type == "emotional":
        return {"next": "therapist"}
    return {"next": "logical"}

def therapist_agent(state: State):
    last_message = state["messages"][-1]
    content = last_message["content"] if isinstance(last_message, dict) else last_message.content
    system_prompt = (
        "You are a compassionate therapist. Focus on the emotional aspects of the user's message.\n"
        "Show empathy, validate their feelings, and help them process their emotions.\n"
        "Ask thoughtful questions to help them explore their feelings more deeply.\n"
        "Avoid giving logical solutions unless explicitly asked."
    )
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=content)
    ]
    reply = llm.invoke(messages)
    return {"messages": [{"role": "assistant", "content": reply}]}

def logical_agent(state: State):
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

def get_chatbot_response(state, user_input):
    state["messages"] = state.get("messages", []) + [
        {"role": "user", "content": user_input}
    ]
    state = graph.invoke(state)
    if state.get("messages") and len(state["messages"]) > 0:
        last_message = state["messages"][-1]
        return state, last_message["content"] if isinstance(last_message, dict) else last_message.content
    return state, ""

st.set_page_config(page_title="TheraLogic Chatbot", page_icon="🧠")
st.title("🧠 TheraLogic Chatbot")
st.markdown("""A stateful chatbot that classifies your message as emotional or logical and responds accordingly.""")

if "state" not in st.session_state:
    st.session_state.state = {"messages": [], "message_type": None}
    st.session_state.history = []

with st.form("chat_form", clear_on_submit=True):
    user_input = st.text_input("You:", "", key="user_input")
    submitted = st.form_submit_button("Send")

if submitted and user_input.strip():
    state, response = get_chatbot_response(st.session_state.state, user_input)
    st.session_state.state = state
    st.session_state.history.append((user_input, response))

for user_msg, bot_msg in st.session_state.history:
    st.markdown(f"**You:** {user_msg}")
    st.markdown(f"**Assistant:** {bot_msg}") 