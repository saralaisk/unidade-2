
async function criptografar() {
    const mensagem = document.getElementById("mensagem").value;
    const resultado = document.getElementById("resultado");

    if (!mensagem.trim()) {
        resultado.textContent = "🌷 Digite uma mensagem primeiro!";
        return;
    }

    try {
        const dados = new TextEncoder().encode(mensagem);

        const chave = await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));

        const criptografado = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            chave,
            dados
        );

        const chaveExportada = await crypto.subtle.exportKey(
            "raw",
            chave
        );

        const bytes = new Uint8Array(criptografado);
        const chaveBytes = new Uint8Array(chaveExportada);

        const textoSeguro = btoa(
            String.fromCharCode(...iv, ...bytes)
        );

        const chaveTexto = btoa(
            String.fromCharCode(...chaveBytes)
        );

        resultado.textContent =
            "💗 MENSAGEM CRIPTOGRAFADA:\n\n" +
            textoSeguro +
            "\n\n🔑 CHAVE DE DEMONSTRAÇÃO:\n\n" +
            chaveTexto;

    } catch (erro) {
        resultado.textContent =
            "Ops! Ocorreu um erro ao criptografar. 🌸";
    }
}


async function gerarHash() {
    const mensagem = document.getElementById("mensagem").value;
    const resultado = document.getElementById("resultado");

    if (!mensagem.trim()) {
        resultado.textContent = "🌷 Digite uma mensagem primeiro!";
        return;
    }

    try {
        const dados = new TextEncoder().encode(mensagem);

        const hash = await crypto.subtle.digest(
            "SHA-256",
            dados
        );

        const hashArray = Array.from(new Uint8Array(hash));

        const hashHex = hashArray
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");

        resultado.textContent =
            "💌 HASH SHA-256:\n\n" + hashHex;

    } catch (erro) {
        resultado.textContent =
            "Ops! Não foi possível gerar o hash. 🌸";
    }
}


async function copiarResultado() {
    const resultado =
        document.getElementById("resultado").textContent;

    try {
        await navigator.clipboard.writeText(resultado);

        alert("💗 Resultado copiado com sucesso!");

    } catch (erro) {
        alert("Não foi possível copiar o resultado.");
    }
}
