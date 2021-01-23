# MCU SPA

La idea es hacer una app refactorizada de https://auth0.com/blog/using-python-flask-and-angular-to-build-modern-apps-part-1/


# API

1. Crear Dockerfile

        FROM python

        ENV FLASK_APP api.py

        WORKDIR /api 

        RUN pip install flask pymongo flask-cors requests

        COPY api.py ./api.py

        EXPOSE 5000

        CMD flask run --host=0.0.0.0

2. Crear un docker-compose.yml

        web:
            build: ./
            ports: 
                - '5000:5000'
            volumes:
                - .:/api
            links:
                - "db:mongomcu"

        db:
            image: mongo
            ports:
                - "27017:27017"

3. Ir a la carpeta **/codigo/api** y ejecutar

        $ docker-compose build

    Y despues

        $ docker-compose up


# Cliente