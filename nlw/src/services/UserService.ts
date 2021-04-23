import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/user";
import { UsersRepository } from "../repo/UsersRepository"


class UsersService{

    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string){

        //verificar se o user existe
        const userExists = await this.usersRepository.findOne({
            email,
        });

        if(userExists){
            return userExists;
        }

        const user = this.usersRepository.create({
            email,
        });

        await this.usersRepository.save(user);
        //se nao, salvar no BD
        return user;

    }
    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
      
        return user;
    }
}

export {UsersService};