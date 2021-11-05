import prismaClient from "../prisma";

class GetLast3MessageService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include :{
        user: true
      }
    });

    return messages

    /*
    comunicaão no banco de dados

    ele selecioa as 3 ultimas mensagens ordenando as por ordem decrescente

    SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC
    */
  }
}

export { GetLast3MessageService };