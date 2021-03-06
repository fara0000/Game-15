import {sendPutRequest, sendGetRequest} from "./REST";

function Controller( model,view ) {
    this._model = model;
    this._view = view;
    this._mtx = null;
}

Controller.prototype.init = function() {
    this._view.init();
    this.waitForData();
    this.getRandom();
    this.getVictory();
    this._view.clickPlay(this.sendMatrixToView.bind(this));
    this._view.gameShuffle(this.shuffle.bind(this));
    this._view.sendValue(this.getFromModel.bind(this));
}

Controller.prototype.waitForData = function() {
    const promise = new Promise(function(res,rej) {
        res(sendGetRequest(this.setArray))
    });
    promise.then(() => this.sendMatrixToView());
};

Controller.prototype.sendMatrixToView = function () {
    const model = this._model.getMatrix();
    console.log('sen to view matrix',model);
    
    model.forEach(array => {
        array.forEach(element => {
            this._view.drawMatrix(element); 
        })
    })
}

Controller.prototype.setArray = function(matrix) {
    this._model.setMatrix(matrix);
    console.log('setArray function ', this._model.getMatrix())
}

Controller.prototype.getFromModel = function(value) {
    const indexEl = this._model.findIndex(value);
    const check = this.checkForZero(indexEl);

    if(check) {
        this._model.swapElems(indexEl, check);
        const matrix = this._model.getMatrix();
        sendPutRequest(matrix);
        console.log(this._model.getMatrix());

        this._view.deleteItems();
        this.sendMatrixToView();
        this.getVictory();
    }
}

Controller.prototype.checkForZero = function(item) {
    const items = this._model.getMatrix();

    try {
        if (items[item.coordinateX + 1][item.coordinateY] === 0) {
            return { coordinateX: item.coordinateX + 1, coordinateY: item.coordinateY };
        }
    } catch (e) {
    }

    try {
        if (items[item.coordinateX - 1][item.coordinateY] === 0) {
            return { coordinateX: item.coordinateX - 1, coordinateY: item.coordinateY };
        }
    } catch (e) {
    }

    try {
        if (items[item.coordinateX][item.coordinateY + 1] === 0) {
            return { coordinateX: item.coordinateX, coordinateY: item.coordinateY + 1 };
        }
    } catch (e) {
    }

    try {
        if (items[item.coordinateX][item.coordinateY - 1] === 0) {
            return { coordinateX: item.coordinateX, coordinateY: item.coordinateY - 1 };
        }
    } catch (e) {
    }

    return false;
}

Controller.prototype.getRandom = function() {
    this._mtx = this._model.getMatrix();
    let arr = this._mtx.flat();
    let temp = 0;
    let j = 0;

    for(let i = arr .length - 1; i > 0; i--){
        
        j = Math.floor(Math.random()* i + 0.5);
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    
    this._mtx = arr.map((_, i, a) => a.slice(i * 4, i * 4 + 4)).filter((el) => el.length);
}

Controller.prototype.shuffle = function() {
    this.getRandom();
    this._model.setMatrix(this._mtx);
    this._view.deleteItems();    
    this.sendMatrixToView();  
}

Controller.prototype.getVictory = function() {
    const testMatrix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    let testArray = this._mtx.flat();
    let test = JSON.stringify(testMatrix);
    let defaultArr = JSON.stringify(testArray);

    if(test === defaultArr) {
        setTimeout(function(){ alert('YOU DID IT BROOO!!!!'); }, 200);
    }
}

export default Controller;

// class Controller{
// 	constructor(model, view) {
// 		this._model = model;
//     	this._view = view;
//     	this._mtx = null;
// 	}

// 	init() {
// 		this._view.init();
// 	    this.sendMatrixToView();
// 	    this.getRandom();
// 	    this.getVictory();
// 	    this._view.gameShuffle(this.shuffle.bind(this));
// 	    this._view.sendValue(this.getFromModel.bind(this));
// 	}

// 	sendMatrixToView() {
// 		const model = this._model.getMatrix();

// 	    model.forEach(array => {
// 	        array.forEach(element => {
// 	            this._view.drawMatrix(element); 
// 	        })
// 	    })
// 	}

// 	getFromModel(value) {
// 		const indexEl = this._model.findIndex(value);
// 	    const check = this.checkForZero(indexEl);
	    
// 	    if(check) {
// 	        this._model.swapElems(indexEl, check);
// 	        console.log(this._model.getMatrix());
	        
// 	        this._view.deleteItems();
// 	        this.sendMatrixToView();
// 	        this.getVictory();
// 	    }
// 	}

// 	checkForZero(item) {
// 		const items = this._model.getMatrix();

// 	    try {
// 	        if (items[item.coordinateX + 1][item.coordinateY] === 0) {
// 	            return { coordinateX: item.coordinateX + 1, coordinateY: item.coordinateY };
// 	        }
// 	    } catch (e) {
// 	    }

// 	    try {
// 	        if (items[item.coordinateX - 1][item.coordinateY] === 0) {
// 	            return { coordinateX: item.coordinateX - 1, coordinateY: item.coordinateY };
// 	        }
// 	    } catch (e) {
// 	    }

// 	    try {
// 	        if (items[item.coordinateX][item.coordinateY + 1] === 0) {
// 	            return { coordinateX: item.coordinateX, coordinateY: item.coordinateY + 1 };
// 	        }
// 	    } catch (e) {
// 	    }

// 	    try {
// 	        if (items[item.coordinateX][item.coordinateY - 1] === 0) {
// 	            return { coordinateX: item.coordinateX, coordinateY: item.coordinateY - 1 };
// 	        }
// 	    } catch (e) {
// 	    }

// 	    return false;
// 	}

// 	getRandom() {
// 		this._mtx = this._model.getMatrix();
// 	    let arr = this._mtx.flat();
// 	    let temp = 0;
// 	    let j = 0;

// 	    for(let i = arr .length - 1; i > 0; i--){
	        
// 	        j = Math.floor(Math.random()* i + 0.5);
// 	        temp = arr[j];
// 	        arr[j] = arr[i];
// 	        arr[i] = temp;
// 	    }
	    
// 	    this._mtx = arr.map((_, i, a) => a.slice(i * 4, i * 4 + 4)).filter((el) => el.length);
// 	}

// 	shuffle() {
// 		this.getRandom();
// 	    this._model.setMatrix(this._mtx);
// 	    this._view.deleteItems();    
// 	    this.sendMatrixToView();
// 	}

// 	win() {
// 		const arr = this._mtx;
// 	    const matrix = this._model.getMatrix();

// 	    for(let i = 0; i < arr.length; i++ ) {
// 	        for(let j = 0; j < arr.length; j++) {
// 	            if(arr[i][j] === matrix[i][j]) {
// 	                alert('You did it bro!!!!');
// 	            }
// 	        }
// 	    }
// 	}

// 	getVictory() {
// 		const testMatrix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
// 	    let testArray = this._mtx.flat();
// 	    let test = JSON.stringify(testMatrix);
// 	    let defaultArr = JSON.stringify(testArray);

// 	    if(test === defaultArr) {
// 	        setTimeout(function(){ alert('YOU DID IT BROOO!!!!'); }, 200);
// 	    }
// 	}
// }


