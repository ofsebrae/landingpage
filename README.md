
# Configurator de Stands INDEX / FIEB

Este projeto é uma aplicação full-stack para configuração 3D de stands e captura de leads.

## Funcionalidades
- Visualização 3D procedural do stand (9m², 12m² ou Apenas Piso).
- Cálculo de preço em tempo real (Associada vs Não Associada).
- Capture de leads com persistência em banco e integração com Google Sheets.
- Layout responsivo inspirado na identidade visual FIEB/INDEX.

## Como rodar localmente

### 1. Frontend (React + Vite)
```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

### 2. Backend (Node.js)
```bash
# Navegar até a pasta server (se separada) ou rodar direto
# Certifique-se de configurar o .env com a URL da planilha
node server/server.ts
```

## Configuração da Planilha Google (Método A)

1. Crie uma nova Planilha Google.
2. Vá em **Extensões > Apps Script**.
3. Cole o seguinte código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Adiciona cabeçalho se a planilha estiver vazia
  if (sheet.getLastRow() == 0) {
    sheet.appendRow(["ID", "Data", "Nome", "Empresa", "E-mail", "WhatsApp", "Produto", "Categoria", "Valor"]);
  }
  
  sheet.appendRow([
    data.id,
    data.createdAt,
    data.nome,
    data.empresa,
    data.email,
    data.whatsapp,
    data.produto,
    data.categoria,
    data.precoCalculado
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Clique em **Implantar > Nova implantação**.
5. Selecionar tipo: **App da Web**.
6. Executar como: **Eu**.
7. Quem pode acessar: **Qualquer pessoa**.
8. Copie a URL gerada e cole no `.env` como `GOOGLE_SHEETS_WEBAPP_URL`.

## Testando a API
```bash
curl -X POST http://localhost:3001/api/leads \
     -H "Content-Type: application/json" \
     -d '{"nome":"Teste", "email":"teste@empresa.com", "produto":"CONSTRUIDO_9M2", "categoria":"ASSOCIADA"}'
```
