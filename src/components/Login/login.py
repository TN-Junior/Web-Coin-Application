from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'  # Alterar para uma chave secreta segura
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://uprojetojr:wwz&4sB}]1}pMU*@rds1222.cmnsyxnxgllg.us-east-2.rds.amazonaws.com:3306/dbprojetojr'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class Users(db.Model):
    __tablename__ = 'users'  # Nome explícito da tabela
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Por favor, preencha todos os campos'}), 400

    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Usuário já registrado com este email'}), 400

    hashed_password = generate_password_hash(password, method='sha256')
    new_user = Users(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso'}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Por favor, preencha todos os campos'}), 400

    user = Users.query.filter_by(email=email).first()

    if not user:
        print(f"Usuário não encontrado para o email: {email}")
        return jsonify({'message': 'Credenciais inválidas: usuário não encontrado'}), 401

    if not check_password_hash(user.password, password):
        print(f"Senha incorreta para o usuário: {email}")
        return jsonify({'message': 'Credenciais inválidas: senha incorreta'}), 401

    # Geração do token JWT
    token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, app.config['SECRET_KEY'])

    print(f"Usuário logado com sucesso: {email}")
    return jsonify({'token': token, 'redirect_url': '/dashboard'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
