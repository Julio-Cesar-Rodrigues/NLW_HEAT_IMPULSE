import prismaClient from "../prisma";
import {io} from "../app"

/*
criação de mensagens recebendo os datos da tabela criado com o prisma
*/

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWs = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user:{
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      }
    }

    /* inserir a mensagem no web socket */

    io.emit("new_message", infoWs);
    return message;
  }
}

export { CreateMessageService };