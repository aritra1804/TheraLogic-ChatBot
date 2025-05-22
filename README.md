# TheraLogic Chatbot

A stateful chatbot that classifies incoming messages as **emotional** or **logical** and routes them to specialized agents—either a therapist-style responder or a purely logical assistant. Built using **LangGraph** for flow orchestration and **LangChain** (Anthropic Claude 3.5 Sonnet) for LLM-based classification and response generation.

---

## 🚀 Features

- **Message Classification**: Automatically determines whether the user's query needs an emotional (therapist) or logical response.  
- **Emotional Support Agent**: Provides empathetic, therapist-like replies for emotional messages.  
- **Logical Assistant**: Delivers fact-based, concise answers for logical inquiries.  
- **Composable Flow**: Orchestrates a multi-step pipeline (classifier → router → agent) via a StateGraph.  
- **Environment Configuration**: API credentials and settings managed via `.env`.  

---

## 🛠️ Tech Stack

- **Python 3.8+**  
- **LangGraph**: Stateful graph-based workflow orchestration  
- **LangChain**: LLM integration (Anthropic Claude)  
- **Pydantic**: Structured output validation  
- **dotenv**: Environment variable management  

---

## 📦 Installation

1. **Clone the repository**  
    ```bash
    git clone https://github.com/aritra1804/theralogic-chatbot.git
    cd theralogic-chatbot
    ```
2. **Create and activate a virtual environment (optional but recommended)**  
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```
3. **Install the dependencies**  
    ```bash
    pip install -r requirements.txt
    ```
4. **Configure the environment**  
    Duplicate the `.env.example` file, rename it to `.env`, and update the necessary API keys and settings.

---

## 🚀 Usage

Run the chatbot using the following command:
```bash
python main.py
```
Follow the on-screen instructions to interact with the chatbot. The system will analyze your input and provide an appropriate response based on the classification.

---

## 🔧 Configuration

You can adjust the behavior of TheraLogic Chatbot via configuration settings in the `.env` file. Key settings include:
- API keys for Anthropic Claude or other llm of your choice.
- Parameters for the message classifier and agent behaviors.
- Optional logging configurations for debugging.

---

## 📝 Examples

Below are some sample interactions:
- **Emotional Query**:
  > User: "I'm feeling really down today…"
  >
  > Chatbot: "I'm sorry you're feeling that way. Would you like to talk about what's on your mind?"
- **Logical Query**:
  > User: "What is the capital of France?"
  >
  > Chatbot: "The capital of France is Paris."




