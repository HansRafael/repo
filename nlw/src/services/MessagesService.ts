import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/message";
import { MessagesRepository } from "../repo/MessagesRepository";

interface IMessageCreate{
    admin_id?: string; //com o ?: ele é opscional
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>; //atributo só p essa classe

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({admin_id,text,user_id}: IMessageCreate){
       
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(user_id: string){
        const list = await this.messagesRepository.find({
            where: {user_id},
            relations:["user"]
        });

        return list;
    }
}

export{MessagesService};