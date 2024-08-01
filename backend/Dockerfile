#cria imagem do backend 

FROM python:3.9

#define o diretório no conteiner 
WORKDIR /app   

#copia para o conteiner dependencias 
COPY requirements.txt .

RUN pip install -r requirements.txt

#copia diretório atual no conteiner
COPY . .

#execução 
CMD ["python", "app.py"]


