from flask import Flask, render_template, request, make_response
from numpy import array
from random import randrange, choice


app = Flask(__name__)

cartas = ["1-diamante", "2-diamante", "3-diamante", "4-diamante", "5-diamante", "6-diamante", "7-diamante", "8-diamante", "9-diamante", "10-diamante", "10-Jdiamante", "10-Qdiamante", "10-Kdiamante",
                "1-pica", "2-pica", "3-pica", "4-pica", "5-pica", "6-pica", "7-pica", "8-pica", "9-pica", "10-pica", "10-Jpica", "10-Qpica", "10-Kpica",
                "1-trebol", "2-trebol", "3-trebol", "4-trebol", "5-trebol", "6-trebol", "7-trebol", "8-trebol", "9-trebol", "10-trebol", "10-Jtrebol", "10-Qtrebol", "10-Ktrebol",
                "1-rojo", "2-rojo", "3-rojo", "4-rojo", "5-rojo", "6-rojo", "7-rojo", "8-rojo", "9-rojo", "10-rojo", "10-Jrojo", "10-Qrojo", "10-Krojo"]

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html' , cartas = cartas)

@app.route("/iniciar", methods=['GET', 'POST'])
def iniciar():
    return render_template('index.html')


@app.route("/dame", methods=['GET', 'POST'])
def dame():
    print("entro al dame")
    

    cartaselect = choice(cartas)
    print(cartaselect)
    
    for elegida in cartas:
        if elegida == cartaselect:
            print(elegida)
            cartas.remove(elegida)
            
            

    if request.method == 'POST':
        datafromjs = request.form['mydata']
        result = cartaselect
        resp = make_response(result)
        resp.headers['Content-Type'] = "application/json"

    return result





@app.route("/desicion", methods=['GET', 'POST'])
def desicion():
    print("entro a la desicion")
    cont = 0
    probabilidad = 0
    desicion = "dame"
    

    if request.method == 'POST':
        datafromjs = request.form['mydata']
        print(datafromjs)
        cartasValidas = 21-int(datafromjs)

        for elegida in cartas:
            numeroElegido = elegida.split(sep="-")
            elegida =numeroElegido[0]
            print(str(elegida) +" - "+ str(cartasValidas))

            if int(elegida) < cartasValidas:
                print(str(elegida) +" - "+ str(cartasValidas))
                cont=cont+1
                print(cont)
        if cont == 0:
            desicion = "planto"
            
        else:    
            probabilidad = cont/len(cartas)
            print(probabilidad)

        if probabilidad > 0.4:
            desicion = "dame"
        else:
            desicion="planto"

        result = desicion
        resp = make_response(result)
        resp.headers['Content-Type'] = "application/json"
 
           
    return result



@app.route('/Pruebas', methods=['GET', 'POST'])
def hola():










    return render_template('Pruebas.html')


if __name__ == "__main__":
    app.run(debug=True)
