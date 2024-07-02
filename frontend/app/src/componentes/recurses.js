import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recursos() {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true); // Pode iniciar com true para carregar o ID do usuário

    useEffect(() => {
        // Recuperar o ID do usuário armazenado localmente (por exemplo, usando localStorage)
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        setLoading(false); // Finaliza o carregamento após recuperar o ID do usuário
    }, []);

    // Lógica para carregar recursos baseados no ID do usuário, se necessário

    return (
        <div className='recursos-page'>
            <h2>Recursos Disponíveis</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div>
                    <p>Seu ID de usuário: {userId}</p>
                    {/* Aqui você pode adicionar lógica adicional baseada no ID do usuário */}
                </div>
            )}
        </div>
    );
}

export default Recursos;
