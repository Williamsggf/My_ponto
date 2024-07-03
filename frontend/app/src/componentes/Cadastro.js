import React, { useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function Cadastro() {
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const hashedPassword = md5(password);

        try {
            const response = await axios.post('http://localhost:3001/Cadastrar', {
                cpf,
                password: hashedPassword
            });

            console.log('Login realizado com sucesso');

            // Extraindo o ID do usuário da resposta
            const { id } = response.data;
            setUserId(id); // Atualiza o estado com o ID do usuário

            // Você pode adicionar lógica adicional aqui após o login

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-form-wrap'>
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleLogin}>
                <input
                    type='text'
                    name='cpf'
                    placeholder='CPF'
                    required
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                />
                <input
                    type='password'
                    name='senha'
                    placeholder='Senha'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='btn-login' disabled={loading}>
                    {Cadastrar ? 'Cadastrando...' : 'Cadastrado'}
                </button>
                {error && <p className='error'>{error}</p>}
                {userId && <p>ID do usuário: {userId}</p>}
            </form>
        </div>
    );
}

export default Cadastro;