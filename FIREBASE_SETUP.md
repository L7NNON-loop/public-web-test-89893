# Configuração do Firebase Cloud Messaging

Para que as notificações push funcionem, você precisa configurar as chaves do Firebase Cloud Messaging.

## Passos para obter as chaves:

### 1. VAPID Key (Web Push Certificate)

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Selecione seu projeto: `bot-ia-20e75`
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Clique na aba **Cloud Messaging**
5. Role até **Configuração da Web**
6. Copie o **Certificado de chave da Web (VAPID)**

### 2. Server Key (Legacy)

1. Na mesma página de **Cloud Messaging**
2. Role até **API do Cloud Messaging (legada)**
3. Copie a **Chave do servidor**

## Onde adicionar as chaves:

### 1. VAPID Key

Abra o arquivo `src/lib/firebase.ts` e substitua:

```typescript
const token = await getToken(messaging, {
  vapidKey: 'YOUR_VAPID_KEY_HERE'  // <- Substitua aqui
});
```

### 2. Server Key

No mesmo arquivo `src/lib/firebase.ts`, substitua:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'key=YOUR_SERVER_KEY_HERE'  // <- Substitua aqui
}
```

## Testando as notificações:

1. Acesse o site e permita as notificações quando solicitado
2. Vá para `/admin`
3. Preencha o título e mensagem
4. Clique em "Enviar Notificação"
5. As notificações serão enviadas para todos os usuários que permitiram, mesmo se não estiverem no site!

## Notas importantes:

- As notificações só funcionarão em HTTPS (ou localhost para desenvolvimento)
- Os usuários precisam aceitar as permissões de notificação
- Os tokens FCM são salvos automaticamente no Firebase Realtime Database
- As notificações funcionam mesmo quando o site está fechado (se o navegador estiver aberto)
