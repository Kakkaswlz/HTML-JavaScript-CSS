function pesquisacep(valor) {
  // Remove tudo que não for número
  var cep = valor.replace(/\D/g, '');

  // Verifica se o CEP tem valor
  if (cep != "") {

    // Expressão regular para validar o CEP (8 dígitos)
    var validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {

      // Preenche os campos com "..." enquanto busca
      document.getElementById('rua').value = "...";
      document.getElementById('bairro').value = "...";
      document.getElementById('cidade').value = "...";
      document.getElementById('uf').value = "...";

      // Faz a requisição para o ViaCEP
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        })
        .then(conteudo => {
          if (!conteudo.erro) {
            // Preenche os campos com os valores retornados
            document.getElementById('rua').value = conteudo.logradouro;
            document.getElementById('bairro').value = conteudo.bairro;
            document.getElementById('cidade').value = conteudo.localidade;
            document.getElementById('uf').value = conteudo.uf;
          } else {
            // CEP não encontrado
            limpa_formulário_cep();
            alert("CEP não encontrado.");
          }
        })
        .catch(error => {
          limpa_formulário_cep();
          alert("Erro ao buscar o CEP.");
          console.error(error);
        });
    } else {
      // CEP inválido
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    // CEP vazio, limpa formulário
    limpa_formulário_cep();
  }
}

// Função para limpar os campos do formulário
function limpa_formulário_cep() {
  document.getElementById('rua').value = "";
  document.getElementById('bairro').value = "";
  document.getElementById('cidade').value = "";
  document.getElementById('uf').value = "";
}
