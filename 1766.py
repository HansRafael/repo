#Elas devem ser ordenadas primeiramente de forma decrescente por peso.
#Caso duas ou mais apresentarem o mesmo peso elas devem ser ordenadas de forma ascendente pela idade
# após pela altura e caso ainda persista empate, pelo nome.
class Renas():
    def __init__(self,name,weight,age,height):
        self.name = name
        self.weight = weight
        self.age = age
        self.height = height

    def sorting(self,vector):
        for i in range(len(vector)):
            key = vector[i].age
            j = i-1
            while j >=0 and key < vector[j].age:     
                self.vector[j+1].age = vector[j].age 
                j -= 1
            vector[j+1].age = key
            return vector


while(True):
    try:
        numberTests = int(input())
        for i in range(numberTests):
            total, utilizadas = input().split(" ")
            total = int(total)
            utilizadas = int(utilizadas)
            lista = [None]*total

            for i in range(total):
                name,weight,age,height = input().split(" ")
                name = str(name)
                weight = int(weight)
                age = int(age)
                height = float(height)
                a = Renas(name,weight,age,height)
                lista[i] = a

            #for i in range(len(lista)):
            #    print('{} : {}-{}-{}'.format(lista[i].name,lista[i].weight,lista[i].age,lista[i].height))
            print(a.tamanho)
            ListaAu = a.sorting(lista)

            for i in range(len(ListaAu)):
                print('{} : {}-{}-{}'.format(ListaAu[i].name,ListaAu[i].weight,ListaAu[i].age,ListaAu[i].height))
            
            
            
            
            


        for i in range(numberTests):
            print("CENARIO {%d}" %(i+1))        
            for i in range(utilizadas):
                print('{} - {}'.format(i+1,lista[i].name))
            

        


            



    except EOFError:
        break