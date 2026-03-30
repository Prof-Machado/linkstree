// 1️⃣ Seleciona o formulário
const form = document.getElementById("contactForm");

// 2️⃣ Adiciona ouvinte para o submit
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // evita recarregar a página

  // 3️⃣ Coleta os dados do formulário
  const name = event.target.name.value;
  const email = event.target.email.value;
  const message = event.target.message.value;

  // 4️⃣ Adiciona timestamp
  const timestamp = new Date().toISOString();

  // 5️⃣ Cria o objeto que será enviado para o GitHub
  const payload = { name, email, message, timestamp };

  try {
    // 6️⃣ Chama a API repository_dispatch do GitHub
    const response = await fetch(
      "https://api.github.com/repos/SEU_USUARIO/SEU_REPO/dispatches",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": "Bearer SEU_TOKEN_GITHUB" // ⚠️ colocar token seguro
        },
        body: JSON.stringify({
          event_type: "new_submission",
          client_payload: payload
        })
      }
    );

    if (response.ok) {
      alert("Formulário enviado com sucesso!");
      form.reset(); // limpa os campos
    } else {
      console.error(await response.text());
      alert("Erro ao enviar o formulário.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar o formulário.");
  }
});
