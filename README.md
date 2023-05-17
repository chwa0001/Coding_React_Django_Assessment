# Coding_React_Django_Assessment
 Software Development Coding Assessment

## Stack

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Django](https://www.djangoproject.com/) - Django makes it easier to build better web apps more quickly and with less code.
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Typescript](https://www.typescriptlang.org/) - JavaScript with syntax for types.

## Project structure

```
$PROJECT_ROOT
│   
├── backend # backend service files
│   
├── dicom # backend application config file
│   
├── frontend # frontend React files
│   
├── backend/templates # Django Templates
│   
├── staticfiles # Django Static Files built by Vite
```
---

### Get the Code

#### For Backend

- Clone Repo

```
mkdir myDemo
cd myDemo
git clone https://github.com/chwa0001/Coding_React_Django_Assessment.git .
```
- Create Virtual Environment for Python

```
cd Coding_React_Django_Assessment
pip install virtualenv
python -m venv venv
```

- Activate Virtual Environment

```
.\venv\Scripts\activate
```

- Install Dependencies

```
pip install -r requirements.txt
```

- Make Migrations

```
python manage.py makemigrations backend
python manage.py migrate
```
- Run Server

```
python manage.py runserver
```
> **_NOTE:_** Include the argument `--insecure` if the static files are served by Django<br/>
> ``
> python manage.py runserver --insecure
> ``

####  For Frontend

- Install Dependencies

```
cd frontend/
npm i
```
- Run Vite to create staticfiles in `dist/`

```
npm run build
```
> **_NOTE:_** Copy the staticfiles to be served by Django if it is required<br/>
> ``
> python manage.py collectstatic
> ``

<br/>


> **_NOTE:_**     To Use Django & React in With hot reload in Django Templates Run: <br/>
> Go to dicom/settings.py to edit the variable DEBUG to True
> ``` 
> python manage.py runserver
> ```
> and 
> ```
> cd frontend/
> npm run dev
> ``` 