import React, { useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

<<<<<<< HEAD
function Cadastro() {
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
=======
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

function Cadastro() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [cpf, setCPF] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfir, setPasswordConfir] = useState('');
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário

<<<<<<< HEAD
    const handleLogin = async (e) => {
=======
    const handleCadastro = async (e) => {
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
        e.preventDefault();
        setLoading(true);
        setError('');

<<<<<<< HEAD
        const hashedPassword = md5(password);

        try {
            const response = await axios.post('http://localhost:3001/Cadastrar', {
=======
        if (password !== passwordConfir) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        const hashedPassword = md5(password);

        try {
            const response = await axios.post('http://localhost:3001/cadastro', {
                nome,
                sobrenome,
                usuario,
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
                cpf,
                password: hashedPassword
            });

<<<<<<< HEAD
            console.log('Login realizado com sucesso');
=======
            console.log('Cadastro realizado com sucesso');
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78

            // Extraindo o ID do usuário da resposta
            const { id } = response.data;
            setUserId(id); // Atualiza o estado com o ID do usuário

<<<<<<< HEAD
            // Você pode adicionar lógica adicional aqui após o login

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Verifique suas credenciais.');
=======
            // Você pode adicionar lógica adicional aqui após o cadastro

        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            setError('Erro ao fazer cadastro. Verifique suas credenciais.');
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
        } finally {
            setLoading(false);
        }
    };

<<<<<<< HEAD
    return (
        <div className='login-form-wrap'>
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleLogin}>
=======
    const handleCPFChange = (e) => {
        const formattedCPF = formatCPF(e.target.value);
        setCPF(formattedCPF);
    };

    return (
        <div className='login-form-wrap'>
            <h2>Cadastro</h2>
            <form className='login-form' onSubmit={handleCadastro}>
                <input
                    type='text'
                    name='nome'
                    placeholder='Nome'
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type='text'
                    name='sobrenome'
                    placeholder='Sobrenome'
                    required
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                />
                <input
                    type='text'
                    name='usuario'
                    placeholder='Usuário'
                    required
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
                <input
                    type='text'
                    name='cpf'
                    placeholder='CPF'
                    required
                    value={cpf}
<<<<<<< HEAD
                    onChange={(e) => setCPF(e.target.value)}
=======
                    onChange={handleCPFChange}
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
                />
                <input
                    type='password'
                    name='senha'
                    placeholder='Senha'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
<<<<<<< HEAD
                <button type='submit' className='btn-login' disabled={loading}>
                    {Cadastrar ? 'Cadastrando...' : 'Cadastrado'}
=======
                <input
                    type='password'
                    name='confirSenha'
                    placeholder='Confirme a Senha'
                    required
                    value={passwordConfir}
                    onChange={(e) => setPasswordConfir(e.target.value)}
                />
                <button type='submit' className='btn-login' disabled={loading}>
                    {loading ? 'Carregando...' : 'Cadastrar'}
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
                </button>
                {error && <p className='error'>{error}</p>}
                {userId && <p>ID do usuário: {userId}</p>}
            </form>
        </div>
    );
}

<<<<<<< HEAD
export default Cadastro;
=======
export default Cadastro;
>>>>>>> d4d4e6c4a644469a7f654b27d7790f6573adda78
