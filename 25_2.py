def Jogo(x,y): 
    if ((x==(y+1)%5) or (x==(y+2)%5)):
        return 1
    else:
        return 0
        
cont1 = 0
cont2 = 0
x = int(input())
for i in range(x):
    dario, xeres = map(int, input().split())
    result = Jogo(dario,xeres)
    if (result == 0):
        cont1 +=1
    else:
        cont2 +=1
if (cont1 > cont2):
    print("dario")
else:
    print("xerxes")
