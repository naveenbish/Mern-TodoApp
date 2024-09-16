#!/bin/bash

# Function to kill a process running on a specific port
kill_port() {
  PORT=$1
  PID=$(lsof -t -i:$PORT)

  if [ -z "$PID" ]; then
    echo "No process found running on port $PORT."
  else
    echo "Killing process on port $PORT (PID: $PID)..."
    kill -9 $PID
    echo "Process on port $PORT killed."
  fi
}

# Stop the frontend process (port 5173)
FRONTEND_PORT=5173
kill_port $FRONTEND_PORT

# Stop the backend process (port 3000)
BACKEND_PORT=3000
kill_port $BACKEND_PORT

# Notify user
echo "Mern-TodoApp Frontend and Backend processes stopped."
