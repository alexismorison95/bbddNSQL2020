FROM python

ENV FLASK_APP api.py

WORKDIR /api 

RUN pip install flask pymongo flask-cors requests firebase python_jwt gcloud sseclient pycrypto requests_toolbelt oauth2client

COPY api.py ./api.py

EXPOSE 5000

CMD flask run --host=0.0.0.0