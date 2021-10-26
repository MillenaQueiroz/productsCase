const fs = require('fs');

fs.readFile('./data.json', 'utf-8', (error, jsonData) => {
    const data = JSON.parse(jsonData);

    var Lanche = [];
    var FastFood = [];
    var Japonesa = [];
    var Chinesa = [];
    var Oriental = [];
    var Bebidas = [];
    var Refeições = [];

    for (i = 0; i < data.products.length; i++) {
        for (c = 0; c < 7; c++) {
            if (data.products[i].categoriesId[c] === 1) {
                Lanche.push(data.products[i]);
            } else {
                if (data.products[i].categoriesId[c] === 2) {
                    FastFood.push(data.products[i]);
                } else {
                    if (data.products[i].categoriesId[c] === 3) {
                        Japonesa.push(data.products[i]);
                    } else {
                        if (data.products[i].categoriesId[c] === 4) {
                            Chinesa.push(data.products[i]);
                        } else {
                            if (data.products[i].categoriesId[c] === 5) {
                                Oriental.push(data.products[i]);
                            } else {
                                if (data.products[i].categoriesId[c] === 6) {
                                    Bebidas.push(data.products[i]);
                                } else {
                                    if (data.products[i].categoriesId[c] === 7) {
                                        Refeições.push(data.products[i]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    
    let establishment = {
        'Restaurante': [],
        'ComidaAsiatica': [],
        'FastLanches': [],
    }


    var categorias = [Lanche, FastFood, Japonesa, Chinesa, Oriental, Bebidas, Refeições];

    var categoriasName = ["Lanche", "FastFood", "Japonesa", "Chinesa", "Oriental", "Bebidas", "Refeições"];

    var changeValue0=false;
    var changeValue1=false;
    var changeValue2=false;
    
        for (p = 0; p < categorias.length; p++) {
            for (let j = 0; j < categorias[p].length; j++) {                                
                const found = data.establishments[0].productsId.find(element => element === categorias[p][j].id);
                if(typeof found !== 'undefined') {                
                    if (!establishment.hasOwnProperty(categorias[p][j])) {
                            establishment.Restaurante.push(categorias[p][j]);
                    }
                }
                
                const found1 = data.establishments[1].productsId.find(element => element === categorias[p][j].id);
                if(categorias[p][j].price % 1 === 0) {  //verifica se é inteiro
                    categorias[p][j].price = (categorias[p][j].price)/100.0;
                }
                if(typeof found1 !== 'undefined') {                
                    if (!establishment.hasOwnProperty(categorias[p][j])) {
                            establishment.ComidaAsiatica.push(categorias[p][j]);
                    }
                }

                const found2 = data.establishments[2].productsId.find(element => element === categorias[p][j].id);
                if(typeof found2 !== 'undefined') {                
                    if (!establishment.hasOwnProperty(categorias[p][j])) {
                            establishment.FastLanches.push(categorias[p][j]);
                    }
                }
            }            
        }

        let newData = {
            'Restaurante': [],
            'ComidaAsiatica': [],
            'FastLanches': [],
        }
        var titleCategory = " ";

        for (p = 0; p < establishment.Restaurante.length; p++) {
            for(i=0;i<establishment.Restaurante[p].categoriesId.length; i++){
                for(j=0;j<categoriasName.length; j++){
                    if(establishment.Restaurante[p].categoriesId[i] === (j+1)){
                        if (!newData.Restaurante.hasOwnProperty(categorias[j])) {
                            titleCategory=categoriasName[j];
                            newData.Restaurante.push({[titleCategory]:categorias[j]});
                            newData.Restaurante[categorias[j]] = establishment.Restaurante[p];
                        }else{
                            newData.Restaurante[categorias[j]] = establishment.Restaurante[p];
                        }
                    }
                }
            }
        }

        for (p = 0; p < establishment.ComidaAsiatica.length; p++) {
            for(i=0;i<establishment.ComidaAsiatica[p].categoriesId.length; i++){
                for(j=0;j<categoriasName.length; j++){
                    if(establishment.ComidaAsiatica[p].categoriesId[i] === (j+1)){
                        if (!newData.ComidaAsiatica.hasOwnProperty(categorias[j])) {
                            titleCategory=categoriasName[j];
                            newData.ComidaAsiatica.push({[titleCategory]:categorias[j]});
                            newData.ComidaAsiatica[categorias[j]] = establishment.ComidaAsiatica[p];
                        }else{
                            newData.ComidaAsiatica[categorias[j]] = establishment.ComidaAsiatica[p];
                        }
                    }
                }
            }
        }

        for (p = 0; p < establishment.FastLanches.length; p++) {
            for(i=0;i<establishment.FastLanches[p].categoriesId.length; i++){
                for(j=0;j<categoriasName.length; j++){
                    if(establishment.FastLanches[p].categoriesId[i] === (j+1)){
                        if (!newData.FastLanches.hasOwnProperty(categorias[j])) {
                            titleCategory=categoriasName[j];
                            newData.FastLanches.push({[titleCategory]:categorias[j]});
                            newData.FastLanches[categorias[j]] = establishment.FastLanches[p];
                        }else{
                            newData.FastLanches[categorias[j]] = establishment.FastLanches[p];
                        }
                    }
                }
            }
        }

        //console.log(newData);
        
    fs.writeFile('./newData.json', JSON.stringify(newData, null, 2), 'utf-8', (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
    });
});
