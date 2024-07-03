import React, { useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function formatCPF(value) {
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Adiciona pontos e hífen conforme necessário
    if (value.length > 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{3})/, '$1.$2');
    }

    return value;
}

function Login() {
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
            const response = await axios.post('http://localhost:3001/login', {
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

    const handleCPFChange = (e) => {
        const formattedCPF = formatCPF(e.target.value);
        setCPF(formattedCPF);
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
                    onChange={handleCPFChange}
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
                    {loading ? 'Carregando...' : 'Login'}
                </button>
                {error && <p className='error'>{error}</p>}
                {userId && <p>ID do usuário: {userId}</p>}
            </form>
        </div>
    );
}

export default Login;
