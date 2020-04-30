FROM python:3.8-buster


# Create worker directory
WORKDIR /usr/src/worker

# Copying the requirements
COPY requirements.txt ./

# Installing dependencies
RUN pip install -r requirements.txt

# Copying the files over
COPY . .

CMD [ "python", "worker.py" ]
