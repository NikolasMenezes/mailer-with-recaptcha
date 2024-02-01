function buildHtmlMessage({ name, phone, email, message }) {
  return `
    <h2>Olá!</h2>
    <p>Nome de quem enviou: ${name} </p>
    <p>Telefone / Celular: ${phone}</p>
    <p>Endereço de email: ${email} </p>
    <p>Mensagem: ${message}</p>
  `;
}

module.exports = buildHtmlMessage;