from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
# staticfiles = index, css, java 등의 파일들을 의미한다

app = FastAPI()

answer = 'APPLE'


@app.get('/answer')
def get_answer():
    return answer


# FastAPI 홈페이지에서 찾을 수 있다
app.mount("/", StaticFiles(directory="static", html=True), name="static")