FROM ubuntu:16.04
MAINTAINER Perseids Project "perseids@tufts.edu"
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
ADD ./ /app
WORKDIR /app
RUN pip3 install -r requirements.txt
CMD ["python3", "run.py"]
