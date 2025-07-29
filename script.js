document.getElementById("entradaCep").addEventListener("blur", (evento) => {
  const elemento = evento.target;
  const cepInformado = elemento.value;

  if (!(cepInformado.length === 8))
    return alert("erro");

  fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(response => response.json())
    .then(data => {
      if (!data.erro) {
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf; 
        document.getElementById('ddd').value = data.ddd;

        const salvando = {
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
          ddd: data.ddd
        };

        localStorage.setItem("enderecoSalvo", JSON.stringify(salvando));
        console.log(salvando);

      } else {
        alert("cep not found");
      }
    })
    .catch(error => alert("erro ao buscar", error))

});
 window.addEventListener("load", () => {
      const resetDados = localStorage.getItem("enderecoSalvo");
      if (resetDados){
        const endereco = JSON.parse(resetDados);
        document.getElementById('logradouro').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('cidade').value = endereco.cidade;
        document.getElementById('estado').value = endereco.estado; 
        document.getElementById('ddd').value = endereco.ddd;
      }
  });
  
