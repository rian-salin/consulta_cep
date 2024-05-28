function consultar() {
    const cep = document.getElementById('cep').value;
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('cep-resultado').textContent = data.cep;
                    document.getElementById('logradouro').textContent = data.logradouro;
                    document.getElementById('bairro').textContent = data.bairro;
                    document.getElementById('cidade').textContent = data.localidade;
                    document.getElementById('estado').textContent = data.uf;
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                console.error('Erro ao consultar o CEP:', error);
                alert('Erro ao consultar o CEP. Tente novamente mais tarde.');
            });
    } else {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
    }
}

function salvar() {
    const cep = document.getElementById('cep-resultado').textContent;
    const logradouro = document.getElementById('logradouro').textContent;
    const bairro = document.getElementById('bairro').textContent;
    const cidade = document.getElementById('cidade').textContent;
    const estado = document.getElementById('estado').textContent;

    if (cep && logradouro && bairro && cidade && estado) {
        const dados = {
            cep,
            logradouro,
            bairro,
            cidade,
            estado
        };
        localStorage.setItem('dadosCep', JSON.stringify(dados));
        alert('Dados salvos com sucesso!');
    } else {
        alert('Nenhum dado para salvar.');
    }
}

function carregarDadosSalvos() {
    const dados = JSON.parse(localStorage.getItem('dadosCep'));
    if (dados) {
        document.getElementById('cep-resultado').textContent = dados.cep;
        document.getElementById('logradouro').textContent = dados.logradouro;
        document.getElementById('bairro').textContent = dados.bairro;
        document.getElementById('cidade').textContent = dados.cidade;
        document.getElementById('estado').textContent = dados.estado;
    }
}

function limpar() {
    localStorage.removeItem('dadosCep');
    document.getElementById('cep-resultado').textContent = '';
    document.getElementById('logradouro').textContent = '';
    document.getElementById('bairro').textContent = '';
    document.getElementById('cidade').textContent = '';
    document.getElementById('estado').textContent = '';
    alert('Dados apagados com sucesso!');
}


window.onload = carregarDadosSalvos;
