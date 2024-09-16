#!/bin/bash

# Function to check if a port is in use
check_port() {
  if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null; then
    echo "Port $1 is already in use."
    return 1
  else
    return 0
  fi
}

# Truncate log files before starting processes
truncate_logs() {
  truncate -s 0 ./logs/frontend.log
  truncate -s 0 ./logs/backend.log
  echo "Logs truncated."
}

# Truncate the logs before starting
truncate_logs

# Frontend Next project
FRONTEND_PORT=5173 # Frontend port

if check_port $FRONTEND_PORT; then
  echo "Starting Frontend on port $FRONTEND_PORT..."
  cd /home/naveen/Desktop/Project/Mern-TodoApp/frontend/
  nohup yarn dev >../logs/frontend.log 2>&1 &
else
  echo "Frontend not started due to port conflict on port $FRONTEND_PORT."
fi

# Backend Node project
BACKEND_PORT=3000 # Backend port

if check_port $BACKEND_PORT; then
  echo "Starting Backend on port $BACKEND_PORT..."
  cd /home/naveen/Desktop/Project/Mern-TodoApp/backend/
  nohup yarn dev >../logs/backend.log 2>&1 &
else
  echo "Backend not started due to port conflict on port $BACKEND_PORT."
fi

# Notify the user that the processes are started or failed
echo "Port checks complete. Mern-TodoApp Frontend and Backend processes handled."
