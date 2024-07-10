import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getDataAtual = () => {
    const hoje = new Date();
    return hoje.toLocaleDateString();
};

const getHoraAtual = () => {
    const agora = new Date();
    return agora.toLocaleTimeString();
};

function RegistroPonto() {
    const [hora, setHora] = useState(getHoraAtual());
    const [userId, setUserId] = useState(null);
    const [nome, setNome] = useState('');
    const [registros, setRegistros] = useState([]);
    const [ctponto, setConsulta] = useState([]);
    const [tpPonto, setTpPonto] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [publicIP, setPublicIP] = useState(null);
    const [localIPv4, setLocalIPv4] = useState(null);

    useEffect(() => {
        const userIdFromStorage = Number(localStorage.getItem('userId'));
        const nomeFromStorage = localStorage.getItem('nome');
        setUserId(userIdFromStorage);
        setNome(nomeFromStorage);

        const intervalo = setInterval(() => {
            setHora(getHoraAtual());
        }, 1000);

        getLocation();
        getLocalIPv4();
        if (userIdFromStorage) {
            consultaPonto(userIdFromStorage);
        }

        return () => clearInterval(intervalo);
    }, []);

    const consultaPonto = async (idUsuario) => {
        const consultapt = { userId: idUsuario, data: getDataAtual() };
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/auth/CTPonto', consultapt);

            const registrosConsultados = response.data.registros.map(registro => ({
                id: registro.id,
                dt_ponto: registro.dt_ponto,
                tp_reg: registro.tp_reg,
                forma: registro.forma,
                hora: registro.hora
            }));

            setConsulta(registrosConsultados);

        } catch (error) {
            setError('Não há pontos registrados hoje');
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocalização não é suportada por este navegador.");
        }
    };

    const showPosition = async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        const ip = await getPublicIP();
        setPublicIP(ip);
    };

    const getPublicIP = async () => {
        try {
            const response = await axios.get('https://api.ipify.org?format=json');
            const ip = response.data.ip;
            return ip;
        } catch (error) {
            console.error("Erro ao obter endereço IP público:", error);
            return null;
        }
    };

    const getLocalIPv4 = () => {
        try {
            const { RTCPeerConnection } = window;
            if (RTCPeerConnection) {
                const connection = new RTCPeerConnection({ iceServers: [] });
                connection.createDataChannel('');
                connection.onicecandidate = async (event) => {
                    try {
                        const candidate = event.candidate;
                        if (candidate) {
                            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                            const match = ipRegex.exec(candidate.candidate);
                            if (match && match.length >= 2) {
                                const localIPv4 = match[1];
                                setLocalIPv4(localIPv4);
                                connection.close();
                            }
                        }
                    } catch (error) {
                        console.error("Erro ao obter IPv4 local:", error);
                    }
                };
                connection.createOffer().then(offer => connection.setLocalDescription(offer));
            } else {
                console.log("RTCPeerConnection não suportado.");
            }
        } catch (error) {
            console.error("Erro ao tentar obter IPv4 local:", error);
        }
    };

    const registrarPonto = async () => {
        const tipoPonto = tpPonto ? 'saída' : 'entrada';
        const novoRegistro = { data: getDataAtual(), hora: getHoraAtual(), tipo: tipoPonto };
        setRegistros([...registros, novoRegistro]);
        setTpPonto(!tpPonto);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/auth/RGPonto', {
                userId: userId,
                data: getDataAtual(),
                tp_reg: parseInt('1'),
                forma: parseInt('1'),
                hora: getHoraAtual(),
                latitude: latitude,
                longitude: longitude,
                ip: publicIP,
                ipv4: localIPv4
            });

            const { tp_reg, hora, forma, status } = response.data;
            localStorage.setItem('tp_reg', tp_reg);
            localStorage.setItem('hora', hora);
            localStorage.setItem('forma', forma);
            localStorage.setItem('status', status);

        } catch (error) {
            setError('Erro ao registrar ponto');
        } finally {
            setLoading(false);
            consultaPonto(userId);
        }

    };

    const descricaoBotao = tpPonto ? 'Saída' : 'Entrada';

    return (
        <div>
            <h2>Registro de ponto</h2>
            <p>Nome: {nome}</p>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Endereço IP público: {publicIP}</p>
            <p>Endereço IPv4 local: {localIPv4}</p>
            <h3>Registros:</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {ctponto.map((registro, index) => (
                    <p className='btn-app' key={index}>
                        {registro.forma === 1 && <span> Registro Automático</span>} - 
                        {registro.tp_reg === 1 && <span> Entrada </span>} 
                        Ás {registro.hora}
                    </p>
                ))}
            </ul>
            <button className={`btn-app-${descricaoBotao.toLowerCase()}`} onClick={registrarPonto} disabled={loading}>
                {loading ? 'Registrando...' : `Registrar ${descricaoBotao} às ${hora}`}
            </button>
        </div>
    );
}

export default RegistroPonto;
